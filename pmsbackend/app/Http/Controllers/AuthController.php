<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user or create a default admin if no users exist.
     */
    public function register(Request $request)
    {
        // Check if there are no users in the database
        if (User::count() === 0) {
            // Create a default admin user
            $admin = User::create([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin123'), // Securely hash the password
                'role' => 'Admin',
            ]);

            // Generate an authentication token for the admin user
            $adminToken = $admin->createToken('authToken')->plainTextToken;

            // Return response with admin user and token
            return response()->json([
                'message' => 'Default admin account created!',
                'user' => $admin,
                'token' => $adminToken
            ], 201);
        }

        // Validate the incoming registration request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed', // Ensures password_confirmation matches
                'regex:/^[A-Za-z\d@$!%*?&]+$/', // Alphanumeric + special characters
            ],
            'role' => 'required|in:project_manager,team_member,client', // Only allow specific roles
        ]);

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password before storing
            'role' => $request->role,
        ]);

        // Generate an authentication token for the user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return response with user details and token
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Log in an existing user and return an auth token.
     */
    public function login(Request $request)
    {
        // Validate login request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt login using credentials
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Retrieve the authenticated user
        $user = Auth::user();

        // Generate a new token for the user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return response with user details and token
        return response()->json([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Log out the authenticated user by revoking all tokens.
     */
    public function logout(Request $request)
    {
        // Delete all tokens for the authenticated user
        $request->user()->tokens()->delete();

        // Return success message
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
