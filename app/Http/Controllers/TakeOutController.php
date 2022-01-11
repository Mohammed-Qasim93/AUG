<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\EXCELs;
use Carbon\Carbon;
use Carbon\CarbonImmutable;

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

    public function print(){
        $out = logs::with('items')->where('OutID', '1')->get();
        $Time = Carbon::parse($out[0]->outDate)->format('h:m:s A');
        $Date = Carbon::parse($out[0]->outDate)->format('Y-m-d');
        $data = [];
        for ($i=0 ; $i < count($out); $i++){
            $data[$i] = $out[$i]->items->name;
        }
        $html = '
        <style>
            html, body{
                height: 100%
            }
            body{
                background: url("h.jpg");
                /* The image used */
                background-image-resize: 6;
                /* Full height */
                height: 100%;
                direction: rtl;
            }
            .x{
                text-align: center;
                padding-top: 100px;
                font-size: 30px;
            }
        </style>
        <body>
            <h1 class="x">موضوع / ادخال معدات</h1>
            <div>
                <p>في تمام الساعة <span>(' . $Time . ')</span> وبتاريخ <span>( ' . $Date . ' )</span> تم اخراج المواد ادناه بواسطة <span>( ' . $out[0]->name . ' )</span> </span></p>
                <p> -  </p>
            </div>
        </body>
        ';
        // return Excel::download(new EXCELs, 'uuu.xlsx', \Maatwebsite\Excel\Excel::MPDF);
        $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;
        $mpdf->WriteHTML($html);
        $mpdf->Output('ddd.pdf', 'I');
    }
}
