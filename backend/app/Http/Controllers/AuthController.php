<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Check if there's no user in the database
        if (User::count() === 0) {
            // Create a default admin account if no users exist
            $admin = User::create([
                'name' => 'Admin',
                'email' => 'admin',
                'password' => Hash::make('admin'),
                'role' => 'Admin',
            ]);

            // Generate authentication token for the admin account
            $adminToken = $admin->createToken('authToken')->plainTextToken;

            // Return a response with the admin details and token
            return response()->json([
                'message' => 'Default admin account created!',
                'user' => $admin,
                'token' => $adminToken
            ], 201);
        }

        // Proceed with normal user registration
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3|confirmed',
            'role' => 'required|in:manager,member,client',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new user with the provided details
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Generate authentication token for the new user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return a response with user details and token
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate login credentials
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Check if credentials are valid
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Retrieve authenticated user
        $user = Auth::user();

        // Generate authentication token for the user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return a response with user details and token
        return response()->json([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens of the authenticated user
        $request->user()->tokens()->delete();

        // Return a response indicating successful logout
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        // Return the authenticated user's details
        return response()->json($request->user());
    }
}
