<?php

namespace App\Http\Controllers;

use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TakeOutController extends Controller
{
    public function index(){
        return Inertia::render('TakeOut/Index', [
            'items' => logs::orderBy('created_at', 'desc')->pagainte(10),
        ]);
    }
}
