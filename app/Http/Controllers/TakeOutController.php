<?php

namespace App\Http\Controllers;

use App\Exports\EXCELs;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Items;
use App\Models\logs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TakeOutController extends Controller
{
    public function index(){
        $query = Items::query();
        if(request('item')){
            $query = Items::where('name', 'LIKE', '%'.request('item').'%')
                            ->orWhere('id', 'LIKE', '%'.request('item').'%');
        }
        return Inertia::render('TakeOut/Index', [
            'items' => $query->with('categories')->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
        ]);
    }

    public function checkout(Request $request){
        if($request->data) {
            $items=[];
            for ($i = 0; $i < count($request->data) ; $i++){
                $item = Items::findOrFail($request->data[$i])->with('categories');
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
        // return redirect()->route('takeout.index');
        return Inertia::render('TakeOut/Checkout', [
            'items' => Items::all(),
        ]);
    }

    public function print(){
        if(request('p')){
            if(request('p') == 'excel'){
                return Excel::download(new EXCELs, 'excel_file.xlsx');
            }
            elseif(request('p') == 'outpdf'){
                $out = logs::with('items')->where('OutID', '1')->get();
                $Time = Carbon::parse($out[0]->outDate)->format('A h:m:s');
                $Date = Carbon::parse($out[0]->outDate)->format('d-m-Y');
                $outType = [];
                foreach($out as $i => $d){
                    $d->outType === 0 ? $outType[$i] = "خارج الشركة" : $outType[$i] = "خارج المخزن";
                }
                $html = '
                <style>
                    body{
                        background: url("h.jpg");
                        background-image-resize: 6;
                        direction: rtl;
                        font-size: 18px;
                    }
                    .x{
                        text-align: center;
                        padding-top: 100px;
                    }
                    .lead{
                        line-height: 20px;
                        font-weight:: 70px;
                        font-size: 20px
                    }
                    .textsize{
                        font-size: 20px
                    }
                    .posDel{
                        position: absolute;
                        top: 1100px;
                        left: 75px;
                        font-size: 18px
                    }
                    .posRes{
                        position: absolute;
                        top: 1100px;
                        left: 655px;
                        font-size: 18px
                    }
                    .dataDel{
                        position: absolute;
                        top: 1130px;
                        left: 70px;
                        font-size: 22px
                    }
                    .dataRes{
                        position: absolute;
                        top: 1130px;
                        left: 650px;
                        font-size: 22px
                    }
                </style>
                <body>
                    <h2 class="x">موضوع / اخراج مواد</h2>
                    <div>
                        <p>في تمام الساعة <span>(' . $Time . ')</span> وبتاريخ <span>( ' . $Date . ' )</span> تم اخراج المواد ادناه بواسطة <span>( ' . $out[0]->name . ' )</span> </span></p>
                    </div>
                </body>
                ';
                
                $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
                $mpdf->autoScriptToLang = true;
                $mpdf->autoLangToFont = true;
                $mpdf->WriteHTML($html);
                foreach ($out as $i => $data) {
                    $mpdf->WriteHTML('
                        <p class="lead">&bull; ' . $data->items->name . ' - ' . $outType[$i] . ' </p>
                    ');
                }
                $mpdf->WriteHTML('
                    <p class="posRes">اسم المخول</p>
                    <p class="dataRes">' . $out[0]->authname . '</p>
                    <p class="posDel">اسم المستلم</p>
                    <p class="dataDel">' . $out[0]->name . '</p>
                    
                ');
                $mpdf->Output('' . $out[0]->name . $Date . '.pdf', 'I');
            }
            elseif(request('p') == 'inpdf'){
                $out = logs::findOrFail(request('id'))->with('items')->first();
                $Time = Carbon::parse($out->inDate)->format('A h:m:s');
                $Date = Carbon::parse($out->inDate)->format('d-m-Y');
                $outType = '';
                $out->outType === 0 ? $outType = "خارج الشركة" : $outType = "خارج المخزن";
                $html = '
                <style>
                    body{
                        background: url("h.jpg");
                        background-image-resize: 6;
                        direction: rtl;
                        font-size: 18px;
                    }
                    .x{
                        text-align: center;
                        padding-top: 100px;
                    }
                    .lead{
                        line-height: 20px;
                        font-weight:: 70px;
                        font-size: 20px
                    }
                    .textsize{
                        font-size: 20px
                    }
                    .posDel{
                        position: absolute;
                        top: 1100px;
                        left: 75px;
                        font-size: 18px
                    }
                    .posRes{
                        position: absolute;
                        top: 1100px;
                        left: 655px;
                        font-size: 18px
                    }
                    .dataDel{
                        position: absolute;
                        top: 1130px;
                        left: 70px;
                        font-size: 22px
                    }
                    .dataRes{
                        position: absolute;
                        top: 1130px;
                        left: 650px;
                        font-size: 22px
                    }
                </style>
                <body>
                    <h2 class="x">موضوع / ادخال مادة</h2>
                    <div>
                        <p>في تمام الساعة <span>(' . $Time . ')</span> وبتاريخ <span>( ' . $Date . ' )</span> تم ادخال المادة ادناه بواسطة <span>( ' . $out->name . ' )</span> </span></p>
                    </div>
                </body>
                ';
                
                $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
                $mpdf->autoScriptToLang = true;
                $mpdf->autoLangToFont = true;
                $mpdf->WriteHTML($html);
                $mpdf->WriteHTML('
                    <p class="lead">&bull; ' . $out->items->name . ' - ' . $outType . ' </p>
                ');
                $mpdf->WriteHTML('
                    <p class="posRes">اسم المخول</p>
                    <p class="dataRes">' . $out->authname . '</p>
                    <p class="posDel">اسم المسلم</p>
                    <p class="dataDel">' . $out->name . '</p>
                    
                ');
                $mpdf->Output('' . $out->name . $Date . '.pdf', 'I');
            }else{
                return abort(404);
            }
        }else{
            return abort(404);
        }
    }

}
