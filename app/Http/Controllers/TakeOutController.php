<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TakeOutController extends Controller
{
    public function index(){
        $query = Items::query();
        if(request('item')){
            $query = Items::where('name', 'LIKE', '%'.request('item').'%')
                            ->orWhere('no', 'LIKE', '%'.request('item').'%')
                            ->orWhere('category', 'LIKE', '%'.request('item').'%');
        }
        return Inertia::render('TakeOut/Index', [
            'items' => $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
        ]);
    }

    public function checkout(Request $request){
        dd($request->all());
        if(!$request) {
            return redirect()->back()->with('success', 'لم يتم تحديد مواد للاخراج');
        }else{
            for ($i = 0; $i > $request; $i++){
                $item = Items::finOrFail($request[$i]);
                $items[$i] = $item;
            }
            return Inertia::render('TakeOut/Checkout', [
                'checkout' => $items,
            ]);
        }
    }
}
