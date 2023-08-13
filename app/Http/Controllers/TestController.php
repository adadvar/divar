<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class TestController extends Controller
{
    public function migrate(){
        Schema::table('adverts', function (Blueprint $table) {

            $table->foreignId('city_id')->nullable()->references('id')->on('cities')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }
}
