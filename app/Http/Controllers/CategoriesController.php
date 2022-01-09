<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Images;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Categories/Index' , [
            'categories' => Categories::paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Categories/Add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validating data from Form
        $request->validate([
            'name' => 'required|unique:categories,name',
            'desc' => 'nullable'
        ],[
            'name.required' => 'يجب ادخال عنوان الفئة',
            'name.unique' => 'اسم الفئة المدخلة مستخدم بالفعل',
        ]);

        // saveing data from Form
        Categories::create([
            'name' => $request->name,
            'desc' => $request->desc,
        ]);

        return Redirect::route('categories.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تمت الاضافة بنجاح']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function show(Categories $categories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit($categories)
    {
        return Inertia::render('Categories/Edit', [
            'categories' => Categories::findOrFail($categories)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $categories)
    {
        $categories = Categories::findOrFail($categories);
        // Validating data from Form
        $request->validate([
            'name' => 'required|unique:categories,name',
            'desc' => 'nullable'
        ],[
            'name.required' => 'يجب ادخال عنوان الفئة',
            'name.unique' => 'اسم الفئة المدخلة مستخدم بالفعل',
        ]);

        $categories->save([
            'name' => $request->name,
            'desc' => $request->desc,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categories $categories)
    {
        $categories = Categories::findOrFail($categories);
        $categories->delete();
    }
}
