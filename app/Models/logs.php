<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class logs extends Model
{
    use HasFactory;



    protected $fillable =[
        'name', 'authname', 'outDate', 'inDate', 'qty', 'state', 'outID', 'outType', 'note', 'items_id', 'users_id',
    ];

    public function items(){
        return $this->belongsTo(Items::class);
    }
}
