<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Sales\StorePackageRequest;
use App\Http\Requests\Admin\Sales\UpdatePackageRequest;
use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    private function isAdmin(): bool
    {
        $user = Auth::user();
        if (!$user || !$user->role) {
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
            ->when(!$isAdmin, fn ($q) => $q->where('user_id', $user->id))
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

    public function store(StorePackageRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        SalesPackage::create($data);

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم إضافة الباقة بنجاح');
    }

    public function edit(SalesPackage $package): Response
    {
        // Check ownership unless admin
        if (!$this->isAdmin() && $package->user_id !== Auth::id()) {
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
        if (!$this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بتعديل هذه الباقة');
        }

        $package->update($request->validated());

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم تحديث الباقة بنجاح');
    }

    public function destroy(SalesPackage $package): RedirectResponse
    {
        // Check ownership unless admin
        if (!$this->isAdmin() && $package->user_id !== Auth::id()) {
            abort(403, 'غير مصرح لك بحذف هذه الباقة');
        }

        $package->delete();

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم حذف الباقة بنجاح');
    }
}
