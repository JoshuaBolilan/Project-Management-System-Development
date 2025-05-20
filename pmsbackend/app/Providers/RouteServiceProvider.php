<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home'; // Default route after user authentication

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        // Define rate limiting for API routes
        RateLimiter::for('api', function (Request $request) {
            // Limit API requests to 60 per minute per user or IP address
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        // Define the application's route groups
        $this->routes(function () {
            // Group API routes with 'api' middleware and 'api' prefix
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Group web routes with 'web' middleware
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}