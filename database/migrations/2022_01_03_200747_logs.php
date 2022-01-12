<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Logs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم المستلم
            $table->string('authname'); // اسم المخول
            $table->datetime('outDate'); // تاريخ اخراج المادة
            $table->datetime('inDate')->nullable(); // تاريخ ادخال المادة
            $table->integer('qty')->default(1); // العدد
            $table->boolean('state'); // الاستهلاكية
            $table->bigInteger('outID'); // ID الخروج
            $table->boolean('outType'); // خارج الشركة\المخزن
            $table->string('note')->nullable(); // ملاحظات
            $table->bigInteger('items_id')->unsigned();
            $table->bigInteger('users_id')->unsigned();
            $table->foreign('items_id')->references('id')->on('items');
            $table->foreign('users_id')->references('id')->on('users');
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
        Schema::dropIfExists('logs');
    }
}
