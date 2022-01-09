<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
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
        // if(request('date_from') > request('date_to')){
        //     return redirect()->back()->with('success', 'تأكد من التاريخ المحدد');
        // }else{
        //     $query = Items::query();
        //     $date = request('date_from') . "," . request('date_to');
        //     $date = explode(',', $date);
        //     $query->whereBetween('created_at', $date);
        // }
        // return Inertia::render('Items/Index', [
        //     'items' => request('date_from') && request('date_to') ? $query->orderBy('created_at', 'desc')->paginate(5)->withQueryString() : Items::orderBy('created_at', 'desc')->paginate(5),
        // ]);
        return Inertia::render('Items/Index', [
            'items' => Items::with('category')->orderBy('created_at', 'desc')->paginate(5),
        ]); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Items/Add', [
            'categories' => Categories::all()
        ]);
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
            'no' => 'required',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.string' => 'الاسم غير صالح',

            'category.required' => 'يجب ادخال الفئة',
            'category.string' => 'الفئة المدخلة غير صالحة',

            'qty.required' => 'يجب ادخال الكمية',
            'qty.integer' => 'يجب ادخال الكمية كعدد',

            'no.required' => 'يجب ادخال الرقم التسلسلي',
        ]);

        Items::create([
             'name' => $request->name,
             'category' => $request->category,
             'qty' => $request->qty,
             'no' => $request->no,
             'desc' => $request->desc,
             'note' => $request->name,
        ]);

        return Redirect::route('items.index')->with('success', 'تمت الاضافة بنجاح');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Items/Edit', [
            'items' => Items::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Items::findOrFail($id);
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'qty' => 'required|integer',
            'no' => 'required',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.string' => 'الاسم غير صالح',

            'category.required' => 'يجب ادخال الفئة',
            'category.string' => 'الفئة المدخلة غير صالحة',

            'qty.required' => 'يجب ادخال الكمية',
            'qty.integer' => 'يجب ادخال الكمية كعدد',

            'no.required' => 'يجب ادخال الرقم التسلسلي',
        ]);

        $item->update([
            'name' => $request->name,
            'category' => $request->category,
            'qty' => $request->qty,
            'no' => $request->no,
            'state' => $request->state,
            'desc' => $request->desc,
            'note' => $request->note,
        ]);
        return Redirect::route('items.index')->with('success', 'تم التعديل بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Items::findOrFail($id);
        $item->delete();
        return Redirect::route('items.index')->with('success', 'تم الحذف بنجاح');
    }
}
