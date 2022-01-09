<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\TakeOutController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
                ->middleware('guest')
                ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/user', [Controller::class, 'index'])->name('user.index');               // Index
    Route::get('/user/{id}/edit', [Controller::class, 'edit'])->name('user.edit');        // Edit
    Route::put('/user/{id}', [Controller::class, 'update'])->name('user.update');        // Update
    Route::delete('/user/{id}', [Controller::class, 'delete'])->name('user.delelte');    // Delete
});

Route::resource('items', ItemsController::class)->middleware('auth');
Route::resource('logs', LogsController::class)->middleware('auth');
Route::resource('categories', CategoriesController::class)->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/takeout', [TakeOutController::class, 'index'])->name('takeout.index');               // Index
    Route::post('/checkout', [TakeOutController::class, 'checkout'])->name('takeout.checkout');               // Index
    Route::get('/checkout', [TakeOutController::class, 'refresh'])->name('takeout.refresh');               // Index
    Route::post('/removeItem', [TakeOutController::class, 'removeItem'])->name('takeout.removeItem');               // Index
});
