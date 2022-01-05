<?php

namespace App\Http\Controllers;

use App\Models\logs;
use Illuminate\Http\Request;
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
        $request->validate([
            'name' => 'required|string',
            'qty' => 'required|integer',
            'state' => 'required|boolean',
            'category' => 'required|string',
            'no' => 'required|integer',
            'desc' => 'string',
            'note' => 'string',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.required' => 'الاسم غير صالح',

            'category.required' => 'يجب ادخال الفئة',
            'category.string' => 'الفئة المدخلة غير صالحة',

            'qty.required' => 'يجب ادخال الكمية',
            'qty.integer' => 'يجب ادخال الكمية كعدد',

            'no.required' => 'يجب ادخال العدد',
            'no.integer' => 'صيغة العدد غير صحيحة',

            'desc.string' => 'صيغة الوصف غير صحيحة',
            'note.string' => 'صيغة الملاحظات غير صحيحة',
        ]);
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
            'logs' => logs::findOrFail($logs)->first()
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function destroy($logs)
    {
        //
    }
}
