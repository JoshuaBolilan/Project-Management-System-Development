<?php

namespace App\Http\Controllers;

// Import foundational traits for authorization and validation
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * Base controller class that other controllers extend.
 * Provides shared functionality like authorization and validation.
 */
class Controller extends BaseController
{
    // Enables authorization methods (e.g., using policies and gates)
    use AuthorizesRequests;

    // Enables validation methods for incoming requests
    use ValidatesRequests;
}
