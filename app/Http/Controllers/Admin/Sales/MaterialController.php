<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Sales\StoreMaterialRequest;
use App\Http\Requests\Admin\Sales\UpdateMaterialRequest;
use App\Models\MaterialCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MaterialController extends Controller
{
    public function index(): Response
    {
        $materials = MaterialCategory::query()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('sales/materials/index', [
            'materials' => $materials,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('sales/materials/create');
    }

    public function store(StoreMaterialRequest $request): RedirectResponse
    {
        MaterialCategory::create($request->validated());

        return redirect()
            ->route('admin.sales.materials.index')
            ->with('success', 'تم إضافة التصنيف بنجاح');
    }

    public function edit(MaterialCategory $material): Response
    {
        return Inertia::render('sales/materials/edit', [
            'material' => $material,
        ]);
    }

    public function update(UpdateMaterialRequest $request, MaterialCategory $material): RedirectResponse
    {
        $material->update($request->validated());

        return redirect()
            ->route('admin.sales.materials.index')
            ->with('success', 'تم تحديث التصنيف بنجاح');
    }

    public function destroy(MaterialCategory $material): RedirectResponse
    {
        $material->delete();

        return redirect()
            ->route('admin.sales.materials.index')
            ->with('success', 'تم حذف التصنيف بنجاح');
    }
}
