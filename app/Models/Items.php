<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    use HasFactory;



    protected $fillable =[
        'name', 'qty', 'state', 'constate', 'inventory', 'desc', 'note', 'categories_id'
    ];

    public function logs(){
        return $this->hasMany(logs::class);
    }

    public function category(){
        return $this->belongsTo(Categories::class);
    }
}
