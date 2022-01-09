<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\logs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = logs::query();
        if(request('logs')) {
            if(request('logs') === 'yesterday'){
                $query->whereDate('created_at', Carbon::yesterday())->orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString();

            }elseif(request('logs') === 'today'){
                $date = Carbon::now()->subDay() . "," . now();
                $date = explode(',', $date);
                $query->whereBetween('created_at', $date)->orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString();

            }elseif(request('logs') === 'week'){
                $date = Carbon::now()->subWeek() . "," . now();
                $date = explode(',', $date);
                $query->whereBetween('created_at', $date)->orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString();

            }elseif(request('logs') === 'month'){
                $date = Carbon::now()->subMonthsNoOverflow() . "," . now();
                $date = explode(',', $date);
                $query->whereBetween('created_at', $date)->orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString();

            }
        }
        
        return Inertia::render('Logs/Index', [
            'logs' => $query ? $query->orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString() : logs::orderBy('created_at', 'desc')->with('items')->paginate(10)->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Logs/Add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if((count($request['items']) <= 0) || !$request['name']){
            return Redirect::route('takeout.index')->with('success', ['icon' => 'error' ,'title' => 'خطا', 'message' => 'لم يتم ملئ كل المدخلات']);
        }else{
            $items = [];
            $outID = logs::all()->count();
            for ($i = 0 ; $i < count($request['items']);$i++){
                $logs = logs::create([
                    'name' => $request->name,
                    'note' => $request->note,
                    'outID' => $outID,
                    'outDate' => now(),
                    'qty' => $request['items'][$i]['qty'],
                    'state' => $request['items'][$i]['state'],
                    'items_id' => $request['items'][$i]['itemId'],
                    'users_id' => Auth::user()->id,
                ]);
                $items[$i] = Items::find($request['items'][$i]['itemId']);
            }
            return Inertia::render('Print', [
                'items' => $items,
                'logs' => $logs
            ]);
            // return Redirect::route('takeout.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تم اخراج المواد بنجاح']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function show($logs)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function edit($logs)
    {
        return Inertia::render('Logs/Edit', [
            'logs' => logs::findOrFail($logs)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $logs)
    {
        $logs = logs::findOrFail($logs);
        $logs->update([
            'inDate' => now()
        ]);
        return Redirect::route('logs.index')->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تم ادخال للمخزن']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function destroy($logs)
    {

    }
}
