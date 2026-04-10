<?php

use Illuminate\Foundation\Vite;

it('does not use the Vite dev server when a public hot file exists outside the local environment', function () {
    file_put_contents(public_path('hot'), 'https://chatbotlivealhmdanh.test:5173');

    expect(app(Vite::class)->isRunningHot())->toBeFalse();
});

afterEach(function () {
    if (is_file(public_path('hot'))) {
        unlink(public_path('hot'));
    }
});
