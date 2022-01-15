<?php

use App\Http\Controllers\ItemsController;
use App\Models\Categories;
use App\Models\Items;
use App\Models\logs;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'allItems' => Items::count(),
        'storage'  => Items::where('inventory', false)->count(),
        'inventory'  => Items::where('inventory', true)->count(),
        'categories' => Categories::count(),
        'in' => logs::whereNotNull('inDate')->count(),
        'outComp' => logs::whereNull('inDate')->where('outType', true)->count(),
        'outStorage' => logs::whereNull('inDate')->where('outType', false)->count(),
    ]);
})->middleware(['auth'])->name('dashboard');

Route::get('/items/inventory', [ItemsController::class, 'inventory'])->middleware('auth')->name('items.inventory');

require __DIR__.'/auth.php';
