<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Sales\StorePackageRequest;
use App\Http\Requests\Admin\Sales\UpdatePackageRequest;
use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(Request $request): Response
    {
        $packages = SalesPackage::query()
            ->with('category')
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
        SalesPackage::create($request->validated());

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم إضافة الباقة بنجاح');
    }

    public function edit(SalesPackage $package): Response
    {
        $categories = MaterialCategory::orderBy('name')->get();

        return Inertia::render('sales/packages/edit', [
            'package' => $package,
            'categories' => $categories,
        ]);
    }

    public function update(UpdatePackageRequest $request, SalesPackage $package): RedirectResponse
    {
        $package->update($request->validated());

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم تحديث الباقة بنجاح');
    }

    public function destroy(SalesPackage $package): RedirectResponse
    {
        $package->delete();

        return redirect()
            ->route('admin.sales.packages.index')
            ->with('success', 'تم حذف الباقة بنجاح');
    }
}
