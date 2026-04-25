<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Sales\StorePackageRequest;
use App\Http\Requests\Admin\Sales\UpdatePackageRequest;
use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    private function isAdmin(): bool
    {
        $user = Auth::user();
        if (! $user || ! $user->role) {
            return false;
        }

        // Admin is determined by role name or having all permissions
        return $user->role->name === 'admin' ||
               $user->role->name === 'مدير النظام' ||
               ($user->role->permissions->count() >= 20); // All CRUD permissions
    }

    public function index(Request $request): Response
    {
        $user = Auth::user();
        $isAdmin = $this->isAdmin();

        $packages = SalesPackage::query()
            ->with(['category', 'user'])
            // Filter by user unless admin
            ->when(! $isAdmin, fn ($q) => $q->where('user_id', $user->id))
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('details', 'like', "%{$search}%")
                        ->orWhere('offer_number', 'like', "%{$search}%")
                        ->orWhere('brand_name', 'like', "%{$search}%");
                });
            })
            ->when($request->category_id, fn ($q, $v) => $q->where('category_id', $v))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $categories = MaterialCategory::orderBy('name')->get();

        return Inertia::render('sales/packages/index', [
            'packages' => $packages,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    public function create(): Response
    {
        $categories = MaterialCategory::orderBy('name')->get();

        return Inertia::render('sales/packages/create', [
            'categories' => $categories,
        ]);
    }

    public function show(SalesPackage $package): Response
    {
        if (! $this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بعرض هذه الباقة');
        }

        $package->load(['category', 'user']);

        return Inertia::render('sales/packages/show', [
            'package' => $package,
        ]);
    }

    public function store(StorePackageRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        unset($data['images']);

        $package = SalesPackage::create($data);

        $paths = [];
        /** @var array<int, UploadedFile> $images */
        $images = $request->file('images', []);
        foreach ($images as $image) {
            $paths[] = $image->storeAs(
                "private/admin/sales/packages/{$package->id}",
                Str::uuid()->toString().'.'.$image->getClientOriginalExtension(),
                ['disk' => 'local']
            );
        }

        if (count($paths) > 0) {
            $package->update([
                'image_paths' => $paths,
                'images_base64' => null,
            ]);
        }

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم إضافة الباقة بنجاح');
    }

    public function edit(SalesPackage $package): Response
    {
        // Check ownership unless admin
        if (! $this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بتعديل هذه الباقة');
        }

        $categories = MaterialCategory::orderBy('name')->get();

        return Inertia::render('sales/packages/edit', [
            'package' => $package,
            'categories' => $categories,
        ]);
    }

    public function update(UpdatePackageRequest $request, SalesPackage $package): RedirectResponse
    {
        // Check ownership unless admin
        if (! $this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بتعديل هذه الباقة');
        }

        $data = $request->validated();

        $retained = array_values(array_filter(
            $data['retained_image_paths'] ?? [],
            static fn ($v): bool => is_string($v) && $v !== ''
        ));

        unset($data['images'], $data['retained_image_paths']);

        $existing = array_values(array_filter(
            $package->image_paths ?? [],
            static fn ($v): bool => is_string($v) && $v !== ''
        ));

        $retained = array_values(array_intersect($existing, $retained));
        $toDelete = array_values(array_diff($existing, $retained));

        foreach ($toDelete as $path) {
            Storage::disk('local')->delete($path);
        }

        $paths = $retained;

        /** @var array<int, UploadedFile> $images */
        $images = $request->file('images', []);
        foreach ($images as $image) {
            $paths[] = $image->storeAs(
                "private/admin/sales/packages/{$package->id}",
                Str::uuid()->toString().'.'.$image->getClientOriginalExtension(),
                ['disk' => 'local']
            );
        }

        $data['image_paths'] = $paths;
        $data['images_base64'] = null;

        $package->update($data);

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم تحديث الباقة بنجاح');
    }

    public function image(SalesPackage $package, string $image)
    {
        if (! $this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403);
        }

        $paths = array_values(array_filter(
            $package->image_paths ?? [],
            static fn ($v): bool => is_string($v) && $v !== ''
        ));

        $match = collect($paths)->first(function (string $path) use ($image) {
            return basename($path) === $image;
        });

        if (! $match) {
            abort(404);
        }

        if (! Storage::disk('local')->exists($match)) {
            abort(404);
        }

        return Storage::disk('local')->response($match);
    }

    public function destroy(SalesPackage $package): RedirectResponse
    {
        // Check ownership unless admin
        if (! $this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بحذف هذه الباقة');
        }

        foreach (array_values($package->image_paths ?? []) as $path) {
            if (is_string($path) && $path !== '') {
                Storage::disk('local')->delete($path);
            }
        }

        $package->delete();

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم حذف الباقة بنجاح');
    }
}
