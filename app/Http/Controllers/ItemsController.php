<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Items/Index', [
            'items' => Items::paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Items/Add');
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
            'category' => 'required|string',
            'qty' => 'required|integer',
            'no' => 'required|integer',
            'state' => 'required|boolean',
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

            'state.required' => 'يجب تحديد الحالة',

            'desc.string' => 'صيغة الوصف غير صحيحة',
            'note.string' => 'صيغة الملاحظات غير صحيحة',
        ]);

        Items::create([
             'name' => $request['name'],
             'category' => $request['category'],
             'qty' => $request['qty'],
             'no' => $request['no'],
             'desc' => $request['desc'],
             'note' => $request['name'],
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function show(Items $items)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function edit($items)
    {
        return Inertia::render('Items/Edit', [
            'items' => Items::findOrFail($items)->first()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $items)
    {
        $item = Items::findOrFail($items);
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'qty' => 'required|integer',
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

        $item->update([
            'name' => $request->name,
            'category' => $request->category,
            'qty' => $request->qty,
            'no' => $request->no,
            'desc' => $request->desc,
            'note' => $request->note,
        ]);
        return Redirect::route('dashboard')->with('success', 'تم التعديل بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function destroy($items)
    {
        $item = Items::findOrFail($items);
        $item->delete();
        return Redirect::route('dashboard')->with('success', 'تم الحذف بنجاح');
    }
}
