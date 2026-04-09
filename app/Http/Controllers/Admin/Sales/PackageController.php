<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Sales\StorePackageRequest;
use App\Http\Requests\Admin\Sales\UpdatePackageRequest;
use App\Models\PackageCategory;
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
                    $q->where('grade_level', 'like', "%{$search}%")
                        ->orWhere('details', 'like', "%{$search}%")
                        ->orWhere('offer_number', 'like', "%{$search}%")
                        ->orWhere('brand_name', 'like', "%{$search}%");
                });
            })
            ->when($request->grade_level, fn ($q, $v) => $q->where('grade_level', $v))
            ->when($request->category_id, fn ($q, $v) => $q->where('category_id', $v))
            ->latest()
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        $gradeLevels = SalesPackage::distinct()->pluck('grade_level');
        $categories = PackageCategory::orderBy('name')->get();

        return Inertia::render('sales/packages/index', [
            'packages' => $packages,
            'gradeLevels' => $gradeLevels,
            'categories' => $categories,
            'filters' => $request->only(['search', 'grade_level', 'category_id', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        $categories = PackageCategory::orderBy('name')->get();

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
        $categories = PackageCategory::orderBy('name')->get();

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
