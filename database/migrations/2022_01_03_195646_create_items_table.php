<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('qty')->default(0); // العدد
            $table->string('state')->default(false); // جيدة متوسطة رديئة يعمل لايعمل
            $table->boolean('constate')->nullable(); // قابل للاستهلاك
            $table->boolean('inventory')->nullable(); // جرد\بدون
            $table->string('desc')->nullable(); // الوصف
            $table->string('note')->nullable(); // الملاحظات
            $table->bigInteger('categories_id')->unsigned(); // القسم
            $table->foreign('categories_id')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
