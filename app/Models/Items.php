<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    use HasFactory;

    protected $fillable =[
        'name', 'items_id', 'users_id', 'qty', 'state', 'active', 'note'
    ];

    public function logs(){
        return $this->hasMany(Items::class);
    }
}
