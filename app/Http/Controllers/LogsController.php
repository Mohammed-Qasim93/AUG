<?php

namespace App\Http\Controllers;

use App\Models\logs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Logs/Index', [
            'logs' => logs::paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Logs/Add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dd($request->all());
        if((count($request->data['items']) <= 0) || !$request->data['name']){
            return Redirect::back()->withInput()->with('success', 'لم يتم ادخال جميع المدخلات');
        }else{
            for ($i = 0 ; $i < count($request->data['items']);$i++){
                logs::create([
                    'name' => $request->name,
                    'note' => $request->note,
                    'outDate' => now(),
                    'qty' => $request->data['items'][$i]['qty'],
                    'state' => $request->data['items'][$i]['state'],
                    'items_id' => $request->data['items'][$i]['itemId'],
                    'user_id' => Auth::user()->id
                ]);
            }
            return Redirect::route('takeout.index')->with('success', 'تم اخراج المواد بنجاح');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function show($logs)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function edit($logs)
    {
        return Inertia::render('Logs/Edit', [
            'logs' => logs::findOrFail($logs)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $logs)
    {
        $logs = logs::findOrFail($logs);
        if(($logs->name !== $request->name) && ($logs->qty !== $request->qty) && ($logs->note !== $request->note))

        $logs->update([

        ]);
        return Redirect::route('logs.index')->with('success', 'تم التعديل بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function destroy($logs)
    {

    }
}
