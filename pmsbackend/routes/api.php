<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

// Public routes
Route::post('/register', [AuthController::class, 'register']); // Route for user registration
Route::post('/login', [AuthController::class, 'login']);       // Route for user login

// Protected routes (requires authentication via Sanctum middleware)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication routes
    Route::post('/logout', [AuthController::class, 'logout']); // Route for user logout

    // Project routes
    Route::apiResource('projects', ProjectController::class); // CRUD operations for projects
    Route::post('projects/{project}/addMember', [ProjectController::class, 'addMember']); // Add a member to a project
    Route::delete('projects/{project}/removeMember', [ProjectController::class, 'removeMember']); // Remove a member from a project
    Route::get('projects/{project}/members', [ProjectController::class, 'getMembers']); // Get all members of a specific project

    // Task routes
    Route::apiResource('tasks', TaskController::class); // CRUD operations for tasks
    Route::post('/tasks/{taskId}/assign', [TaskController::class, 'assignUsers']); // Assign users to a specific task

    // User routes
    Route::get('/team-members', [UserController::class, 'teamMembers']); // Get a list of all team members
});