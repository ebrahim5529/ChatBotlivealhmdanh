<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBotResponseRequest;
use App\Http\Requests\Admin\UpdateBotResponseRequest;
use App\Models\BotResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BotResponseController extends Controller
{
    public function index(): Response
    {
        $responses = BotResponse::query()
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('bot-responses/index', [
            'responses' => $responses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('bot-responses/create');
    }

    public function store(StoreBotResponseRequest $request): RedirectResponse
    {
        BotResponse::create($request->validated());

        return redirect()
            ->route('admin.bot-responses.index')
            ->with('success', 'تم إضافة الرد بنجاح');
    }

    public function edit(BotResponse $botResponse): Response
    {
        return Inertia::render('bot-responses/edit', [
            'response' => $botResponse,
        ]);
    }

    public function update(UpdateBotResponseRequest $request, BotResponse $botResponse): RedirectResponse
    {
        $botResponse->update($request->validated());

        return redirect()
            ->route('admin.bot-responses.index')
            ->with('success', 'تم تحديث الرد بنجاح');
    }

    public function destroy(BotResponse $botResponse): RedirectResponse
    {
        $botResponse->delete();

        return redirect()
            ->route('admin.bot-responses.index')
            ->with('success', 'تم حذف الرد بنجاح');
    }
}
