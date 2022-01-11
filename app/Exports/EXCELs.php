<?php

namespace App\Exports;

use App\Models\Items;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
class EXCELs implements FromCollection, WithHeadings, WithColumnWidths
{
    public function headings(): array
    {
        return [
            'رقم المادة',
            'اسم المادة',
            'العدد',
            'الوصف',
        ];
    }
    public function columnWidths(): array
    {
        return [
            'B' => 25,            
            'D' => 30,            
        ];
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Items::select('id', 'name', 'qty', 'desc')->where('inventory', true)->orderBy('created_at', 'desc')->get();
    }
}
