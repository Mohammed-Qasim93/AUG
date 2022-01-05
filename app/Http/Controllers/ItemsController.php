<?php

namespace App\Http\Controllers;

use App\Models\Items;
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
        // request()->validate([
        //     'direction' => Rule::in(['asc', 'desc']),
        //     'field'     => Rule::in(['id', 'categories_id', 'sub_cats_id', 'pd_name', 'pd_stack', 'pd_state', 'created_at']),
        // ]);

        $query = Items::query();

        // if (request('search')) {
        //     $query->where('pd_name', 'LIKE', '%'.request('search').'%');
        //     $query->orWhere('pd_description', 'LIKE', '%'.request('search').'%');
        // }
        // if(request()->has(['field', 'direction'])){
        //     $query->orderBy(request('field'), request('direction'));
        // }
        // if(request('category')){
        //     $query->where('categories_id', request('category'));
        // }
        // if(request('subcat')){
        //     $query->where('sub_cats_id', request('subcat'));
        // }
        // return Inertia::render('Items/Index', [
        //     'items' => Items::paginate(5)->withQueryString(),
        // ]);
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
            'no' => 'required',
        ],[
            'name.required' => 'يجب ادخال الاسم',
            'name.required' => 'الاسم غير صالح',

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
