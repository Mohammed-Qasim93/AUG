<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return Inertia::render('User/Index' , [
            'user' => User::paginate(5),
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('User/Edit', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);

        if(($request->name !== $user->name) || ($request->email !== $user->email) || ($request->password !== $user->password) || ($request->isAdmin !== $user->isAdmin)){
            if($request->name !== $user->name){
                $request->validate([
                    'name' => 'required|unique:users,name'
                    ],[
                    'name.required'        => 'يجب ادخال الاسم',
                    'name.unique'        => 'الاسم مستخدم بالفعل',
                ]);
            }
            if($request->email !== $user->email){
                $request->validate([
                    'email' => 'required|unique:users,email|email'
                    ],[
                    'email.required'        => 'يجب ادخال البريد الالكتروني',
                    'email.unique'        => 'البريد الالكتروني مستخدم',
                    'email.email'        => 'البريد الالكتروني المدخل غير صالح',
                ]);
            }
            if($request->password !== $user->password && $request->password !== null){
                $request->validate([
                    'password' => ['required', 'confirmed', Rules\Password::min(8)],
                    ],[
                    'password.required'  => 'يجب ادخال كلمة المرور',
                    'password.confirmed' => 'كلمة المرور غير متطابقة',
                ]);
            }
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'isAdmin' => $request->isAdmin,
                'password' => !isset($request->password) ? $user->password : Hash::make($request->password),
            ]);
            return Redirect::route('user.index')->with('success', 'تم التعديل بنجاح');
        }else{
            return Redirect::route('user.index');
        }


        if($request->password !== $user->password && $request->password !== null){
            $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::min(8)],
                ],[
                'password.required'  => 'يجب ادخال كلمة المرور',
                'password.confirmed' => 'كلمة المرور غير متطابقة',
            ]);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $user = User::findOrFail($id);
        if($user == Auth::user()){
            return Redirect::back()->with('success', 'الحساب مستخدم حالياً');
        }else{
            $user->delete();
            return Redirect::back()->with('success', 'تم الحذف بنجاح');
        }
    }
}
