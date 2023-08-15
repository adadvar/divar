<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class TestController extends Controller
{
    public function migrate(){
        Schema::create('cities', function (Blueprint $table) {
            $table->string('slug', 50)->nullable()->after('name');
        });

    }
}
