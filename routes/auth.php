<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ItemsController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware(['auth'])
                ->middleware(['guest'])
                ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware(['guest']);



Route::get('/login', [AuthenticatedSessionController::class, 'create'])
                ->middleware('guest')
                ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::prefix('dashboard')->middleware('admin')->group(function () {
    Route::get('/user', [Controller::class, 'index'])->name('index');               //Index
    Route::get('/user/create', [Controller::class, 'add'])->name('add');            //Create
    Route::post('/user', [Controller::class, 'insert'])->name('insert');            //Store
    Route::get('/user/{id}/edit', [Controller::class, 'edit'])->name('edit');       //Edit
    Route::put('/user/{update}', [Controller::class, 'update'])->name('update');    //Update
    Route::delete('/user/{id}', [Controller::class, 'delete'])->name('delelte');    //Delete
});

Route::resource('dashboard/items', ItemsController::class)->middleware('auth');
// Route::resource('dashboard/menu', MenuController::class)->middleware('admin');
// Route::resource('dashboard/categories', CategoriesController::class)->middleware('admin');
