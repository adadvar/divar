<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Session;

class TestController extends Controller
{
    public function migrate(){
        Schema::create('users', function (Blueprint $table) {
            $table->string('slug', 50)->nullable()->after('name');
        });

    }

    public function index(){
        Session::put('keydadvar', 'test2');
    }

    public function getSession(){
        $session =Session::get('keydadvar');
        dd($session);
    }
}
