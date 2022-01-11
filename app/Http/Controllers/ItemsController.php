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
        if(request('date_from') > request('date_to')){
            return redirect()->back()->with('success', 'تأكد من التاريخ المحدد');
        }else{
            $query = Items::query()->select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', false)->orWhere('inventory', null);
            $date = request('date_from') . "," . request('date_to');
            $date = explode(',', $date);
            $query->whereBetween('created_at', $date);
        }
        return Inertia::render('Items/Inventory', [
            'items' => request('date_from') && request('date_to') ? $query->select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', false)->orWhere('inventory', null)->orderBy('created_at', 'desc')->paginate(10)->withQueryString() : Items::select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', false)->orWhere('inventory', null)->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
        ]);
    }

    public function inventory(){
        if(request('date_from') > request('date_to')){
            return redirect()->back()->with('success', 'تأكد من التاريخ المحدد');
        }else{
            $query = Items::query()->select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', true);
            $date = request('date_from') . "," . request('date_to');
            $date = explode(',', $date);
            $query->whereBetween('created_at', $date);
        }
        return Inertia::render('Items/Inventory', [
            'items' => request('date_from') && request('date_to') ? $query->select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', true)->orderBy('created_at', 'desc')->paginate(10)->withQueryString() : Items::select('id', 'name', 'qty', 'state', 'constate', 'created_at', 'categories_id')->where('inventory', true)->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
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
            'name' => 'required|string|unique:items,name',
            'qty' => 'required|integer',
            'categories_id' => 'required'
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.string' => 'الاسم غير صالح',
            'name.unique' => 'اسم المادة مستخدم بالفعل',

            'qty.required' => 'يجب ادخال الكمية',
            'qty.integer' => 'يجب ادخال الكمية كعدد',

            'categories_id.required' => 'تحديد الصنف',
        ]);
        
        Items::create([
             'name' => $request->name,
             'qty' => $request->qty,
             'state' => $request->state,
             'inventory' => $request->inventory,
             'constate' => $request->inventory == true ? false : $request->constate,
             'desc' => $request->desc,
             'note' => $request->note,
             'categories_id' => $request->categories_id,
        ]);

        return Redirect::route('items.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تمت الاضافة بنجاح']);
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
            'items' => Items::findOrFail($id),
            'categories' => Categories::all()
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
            'qty' => 'required|integer',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.string' => 'الاسم غير صالح',

            'qty.required' => 'يجب ادخال الكمية',
            'qty.integer' => 'يجب ادخال الكمية كعدد',
        ]);

        if(($request->name <> $item->name) || ($request->qty <> $item->qty) || ($request->state <> $item->state) ||
            ($request->inventory <> $item->inventory) || ($request->desc <> $item->desc) || ($request->categories_id <> $item->categories_id)){

            if($request->name <> $item->name){
                $request->validate([
                    'name' => 'required|string',
                ],[
                    'name.required' => 'يجب ادخال الاسم',
                    'name.string' => 'الاسم غير صالح',
                ]);
            }
            if($request->qty <> $item->qty){
                $request->validate([
                    'qty' => 'required|integer',
                ],[
                    'qty.required' => 'يجب ادخال الكمية',
                    'qty.integer' => 'يجب ادخال الكمية كعدد',
                ]);
            }
            if($request->categories_id <> $item->categories_id){
                $request->validate([
                    'categories_id' => 'required',
                ],[
                    'categories_id.required' => 'تحديد الصنف',
                ]);
            }
            $item->update([
                'name' => $request->name,
                    'qty' => $request->qty,
                    'state' => $request->state,
                    'inventory' => $request->inventory,
                    'constate' => $request->inventory == true ? false : $request->constate,
                    'desc' => $request->desc,
                    'note' => $request->note,
                    'categories_id' => $request->categories_id,
            ]);
            return Redirect::route('items.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تم التعديل بنجاح']);        
        }else{
            return Redirect::route('items.index')->with('success', ['icon' => 'warning' ,'title' => 'لا تعديل', 'message' => 'لم يتم تحديث البيانات']);        
        }
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
        return Redirect::route('items.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تم الحذف بنجاح']);
    }
}
