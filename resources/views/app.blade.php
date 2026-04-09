<!DOCTYPE html>
<html lang="ar" dir="rtl" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @php
            $viteManifestPath = public_path('build/manifest.json');
        @endphp
        @if (file_exists($viteManifestPath))
            @viteReactRefresh
            @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @endif
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @if (file_exists($viteManifestPath))
            @inertia
        @else
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:2rem;text-align:center;font-family:system-ui,sans-serif">
                <p style="font-size:1.25rem;font-weight:500;margin-bottom:1rem">جاري تجهيز التطبيق</p>
                <p style="max-width:28rem;font-size:0.875rem;color:#4b5563;margin-bottom:0.5rem">يرجى تشغيل <code style="background:#f3f4f6;padding:0.125rem 0.375rem;border-radius:4px">npm run build</code> ثم رفع مجلد <code style="background:#f3f4f6;padding:0.125rem 0.375rem;border-radius:4px">public/build</code> إلى السيرفر.</p>
                <p style="font-size:0.875rem;color:#6b7280">سيتم إعادة المحاولة تلقائياً خلال 30 ثانية.</p>
                <meta http-equiv="refresh" content="30;url={{ url()->current() }}">
            </div>
        @endif
    </body>
</html>
