<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'project_id', 'done'];
    protected $casts = ['done' => 'boolean', 'project_id' => 'int'];
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
