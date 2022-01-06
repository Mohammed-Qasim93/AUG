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
        if($request->data) {
            $items=[];
            for ($i = 0; $i < count($request->data) ; $i++){
                $item = Items::findOrFail($request->data[$i]);
                $items[$i] = $item;
            }
            return Inertia::render('TakeOut/Checkout', [
                'items' => $items,
            ]);
        }else{
            return redirect()->route('takeout.index')->with('success', 'لاتوجد مواد محددة');
        }
    }

    public function removeItem(Request $request){
        if($request->data) {
            $items=[];
            for ($i = 0; $i < count($request->data) ; $i++){
                $item = Items::findOrFail($request->data[$i]);
                $items[$i] = $item;
            }
            return Inertia::render('TakeOut/Checkout', [
                'items' => $items,
            ]);
        }else{
            return redirect()->route('takeout.index')->with('success', 'لاتوجد مواد محددة');
        }
    }

    public function refresh(){
        return redirect()->route('takeout.index');
    }
}
