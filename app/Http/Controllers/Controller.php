<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
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

    public function create()
    {
        return Inertia::render('User/Add');
    }

    public function edit($user)
    {
        return Inertia::render('User/Edit', [
            'user' => User::findOrFail($user)->first()
        ]);
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
        $user->delete();
        return Redirect::route('dashboard')->with('success', 'تم الحذف بنجاح');
    }
}
