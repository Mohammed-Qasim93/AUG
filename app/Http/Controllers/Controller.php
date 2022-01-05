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
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        return Inertia::render('User/Index' , [
            'user' => User::paginate(10),
        ]);
    }

    public function edit($user)
    {
        return Inertia::render('User/Edit', [
            'user' => User::findOrFail($user)->first()
        ]);
    }

    public function update(Request $request, $user){
        $user = User::findOrFail($user);
        if($request->password !== $user->password && $request->password !== null){
            $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::min(8)],
                ],[
                'password.required'  => 'يجب ادخال كلمة المرور',
                'password.confirmed' => 'كلمة المرور غير متطابقة',
            ]);
        }
        $request->validate([
            'name' => 'required|unique:users,name|string',
            'email' => 'required|unique:users,email|email',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.unique' => 'الاسم موجود فعلاً',
            'name.string' => 'الاسم غير صالح',

            'email.required' => 'يجب ادخال البريد الالكتروني',
            'email.unique' => 'البريد الالكتروني موجود فعلاً',
            'email.string' => 'البريد الالكتروني غير صالح',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'isAdmin' => $request->isAdmin,
        ]);

        return Redirect::route('/user')->with('success', 'تمت الاضافة بنجاح');
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
