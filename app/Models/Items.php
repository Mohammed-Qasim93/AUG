<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    use HasFactory;



    protected $fillable =[
        'name', 'category', 'qty', 'no', 'state', 'desc', 'note'
    ];

    public function logs(){
        return $this->hasMany(logs::class);
    }
}
