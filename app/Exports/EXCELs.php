<?php

namespace App\Exports;

use App\Models\Categories;
use Maatwebsite\Excel\Concerns\FromCollection;

class EXCELs implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Categories::all();
    }
}
