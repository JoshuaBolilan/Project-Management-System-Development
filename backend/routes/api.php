<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route for user registration
Route::post('/register', [AuthController::class, 'register']);

// Route for user login
Route::post('/login', [AuthController::class, 'login']);


// Group of routes that require authentication using Sanctum middleware
Route::middleware('auth:sanctum')->group(function () {

     // Route to fetch authenticated user details
    Route::get('/user', [AuthController::class, 'user']);

     // Route to log out the authenticated user
    Route::post('/logout', [AuthController::class, 'logout']);
});

