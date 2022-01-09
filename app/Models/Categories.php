<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $fillable =['name', 'desc'];

    public function items(){
        return $this->hasMany(Items::class);
    }
}
