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
            $table->string('name');
            $table->bigInteger('items_id')->unsigned();
            $table->bigInteger('users_id')->unsigned();
            $table->integer('qty');
            $table->boolean('state');
            $table->boolean('active');
            $table->string('note');
            $table->timestamps();
            $table->foreign('items_id')->references('id')->on('items');
            $table->foreign('users_id')->references('id')->on('users');
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