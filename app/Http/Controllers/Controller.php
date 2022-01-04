<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return Inertia::render('User/Index' , [
            'user' => User::with('image')->paginate(10),
        ]);
    }

    public function add()
    {
        return Inertia::render('User/Add');
    }

    public function insert(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|password|confirm',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return Redirect::route('dashboard')->with('success', 'تم الاضافة بنجاح');
    }

    public function edit($user)
    {
        return Inertia::render('User/Edit', [
            'user' => User::findOrFail($user)->with('image')->first()
        ]);
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'isAdmin' => $request->isAdmin,
        ]);

        return Redirect::route('dashboard')->with('success', 'تم التحديث بنجاح');
    }

    public function delete($user){
        $user = User::findOrFail($user);
        $user->delete();
        return Redirect::route('dashboard')->with('success', 'تم الحذف بنجاح');
    }

}
