<?php

namespace App\Exports;

use App\Models\Items;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
class EXCELs implements FromArray, WithHeadings, WithColumnWidths
{
    public function headings(): array
    {
        return [
            'رقم المادة',
            'اسم المادة',
            'العدد',
            'الحالة',
            'الوصف',
        ];
    }
    public function columnWidths(): array
    {
        return [
            'B' => 25,            
            'E' => 30,            
        ];
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        $items = [];
        $query = Items::query();
        // $query->whereBetween('created_at', [request('date_from'), request('date_to')]);
        $query->whereBetween('created_at', ['2022-01-01', '2022-01-23']);
        $data = $query->select('id', 'name', 'qty', 'state', 'desc')->where('inventory', true)->orderBy('created_at', 'asc')->get();
        foreach($data as $i => $d){
            $items[$i]['id'] = $d->id;
            $items[$i]['name'] = $d->name;
            $items[$i]['qty'] = $d->qty;
            if($d->state == 1){
                $items[$i]['state'] = 'جيده'; 
            }elseif($d->state == 2){
                $items[$i]['state'] = 'متوسطة'; 
            }elseif($d->state == 2){
                $items[$i]['state'] = 'ردئية'; 
            }elseif($d->state == 2){
                $items[$i]['state'] = 'يعمل'; 
            }elseif($d->state == 2){
                $items[$i]['state'] = 'لايعمل'; 
            }
            $items[$i]['desc'] = $d->desc;
        }
        return $items;
    }
}
