<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TakeOutController extends Controller
{
    public function index(){
        return Inertia::render('TakeOut/Index', [
            'items' => Items::orderBy('created_at', 'desc')->paginate(10),
        ]);
    }
}