<?php

namespace App\Http\Controllers;

use App\Models\BotResponse;
use App\Models\Role;
use App\Models\SalesMaterial;
use App\Models\SalesPackage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * لوحة التحكم: إحصائيات متوافقة مع أقسام القائمة الجانبية (بدون تكرار تقارير قديمة).
     */
    public function __invoke(Request $request): Response
    {
        $packagesPerMonth = collect(range(5, 0))->map(function (int $monthsAgo) {
            $start = Carbon::now()->subMonths($monthsAgo)->startOfMonth();
            $end = Carbon::now()->subMonths($monthsAgo)->endOfMonth();

            return [
                'month_label' => $start->copy()->locale('ar')->isoFormat('MMM'),
                'count' => SalesPackage::query()
                    ->whereBetween('created_at', [$start, $end])
                    ->count(),
            ];
        })->values()->all();

        return Inertia::render('dashboard', [
            'stats' => [
                'packages' => SalesPackage::query()->count(),
                'materials' => SalesMaterial::query()->count(),
                'users' => User::query()->count(),
                'roles' => Role::query()->count(),
                'bot_responses' => BotResponse::query()->count(),
            ],
            'packagesPerMonth' => $packagesPerMonth,
        ]);
    }
}
