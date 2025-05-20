<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // Specifies the attributes that can be mass-assigned
    protected $fillable = [
        'name',         // Name of the project
        'description',  // Description of the project
        'start_date',   // Start date of the project
        'end_date',     // End date of the project
        'user_id',      // ID of the user who created or manages the project
        'status',       // Current status of the project (e.g., active, completed)
        'budget',       // Budget allocated for the project
    ];
}