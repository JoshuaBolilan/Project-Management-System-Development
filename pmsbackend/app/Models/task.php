<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory; // Enables the use of Laravel's factory feature for testing and seeding

    // Specifies the attributes that can be mass-assigned
    protected $fillable = [
        'title',        // Title of the task
        'description',  // Description of the task
        'project_id',   // ID of the associated project
        'assigned_to',  // ID of the user the task is assigned to
        'status',       // Current status of the task (e.g., pending, completed)
        'priority',     // Priority level of the task (e.g., high, medium, low)
        'user_id',      // ID of the user who created the task
    ];
}