<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'/test'],function($r){
    $r->get('/migrate',[TestController::class,'migrate']);
    $r->get('/',[TestController::class,'index']);
    $r->get('/get',[TestController::class,'getSession']);
});