<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class logs extends Model
{
    use HasFactory;

   

    protected $fillable =[
        'name', 'items_id', 'users_id', 'qty', 'state', 'active', 'note'
    ];

    public function items(){
        return $this->belongsTo(logs::class);
    }
}
