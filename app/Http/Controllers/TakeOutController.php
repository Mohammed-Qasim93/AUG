<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TakeOutController extends Controller
{
    public function index(){
        return Inertia::render('TakeOut/Index', [
            'items' => Items::orderBy('created_at', 'desc')->paginate(10),
        ]);
    }

    public function checkout($id){
        if(!$id) {
            return redirect()->back()->with('success', 'لم يتم تحديد مواد للاخراج');
        }else{
            for ($i = 0; $i > $id; $i++){
                $item = Items::finOrFail($id[$i]);
                return Inertia::render('TakeOut/Checkout', [
                    'checkout' => $item,
                ]);
            }
        }
    }
}
