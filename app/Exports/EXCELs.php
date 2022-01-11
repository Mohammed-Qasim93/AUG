<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class EXCELs implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Items::where('inventory', true)->orderBy('created_at', 'desc')->get('id', 'name', 'qty', 'desc');
    }
}
