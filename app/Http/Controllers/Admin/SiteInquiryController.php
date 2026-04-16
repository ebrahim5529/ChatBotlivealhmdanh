<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSiteInquiryRequest;
use App\Http\Requests\Admin\UpdateSiteInquiryRequest;
use App\Models\SiteInquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SiteInquiryController extends Controller
{
    public function index(): Response
    {
        $inquiries = SiteInquiry::query()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('site-inquiries/index', [
            'inquiries' => $inquiries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('site-inquiries/create');
    }

    public function store(StoreSiteInquiryRequest $request): RedirectResponse
    {
        SiteInquiry::create($request->validated());

        return redirect()
            ->route('admin.site-inquiries.index')
            ->with('success', 'تم إضافة الموقع بنجاح');
    }

    public function edit(SiteInquiry $siteInquiry): Response
    {
        return Inertia::render('site-inquiries/edit', [
            'inquiry' => $siteInquiry,
        ]);
    }

    public function update(UpdateSiteInquiryRequest $request, SiteInquiry $siteInquiry): RedirectResponse
    {
        $siteInquiry->update($request->validated());

        return redirect()
            ->route('admin.site-inquiries.index')
            ->with('success', 'تم تحديث الموقع بنجاح');
    }

    public function destroy(SiteInquiry $siteInquiry): RedirectResponse
    {
        $siteInquiry->delete();

        return redirect()
            ->route('admin.site-inquiries.index')
            ->with('success', 'تم حذف الموقع بنجاح');
    }
}
