<?php

use App\Http\Controllers\AdvertController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([], function($router){ 

    Route::group(['namespace' => '\Laravel\Passport\Http\Controllers'], function($router){
        $router->post('login', [
            'middleware' => ['throttle'],
            AccessTokenController::class,'issueToken',
        ])->name('auth.login');
    });
    
    $router->post('register', [
        AuthController::class, 'register'
    ])->name('auth.register');

    $router->post('register-verify', [
        AuthController::class, 'registerVerify'
    ])->name('auth.register.verify');

    $router->post('resend-verification-code', [
        AuthController::class, 'resendVerificationCode'
    ])->name('auth.register.resend.verification.code');
});

Route::group(['middleware' => ['auth:api']], function ($router) {
    
    $router->post('change-email', [
        UserController::class, 'changeEmail'
    ])->name('change.email');

    $router->post('change-email-submit', [
        UserController::class, 'changeEmailSubmit'
    ])->name('change.email.submit');

    $router->match(['post', 'put'], 'change-password', [
        UserController::class, 'changePassword'
    ])->name('change.password');

    $router->post('logout', [
        UserController::class, 'logout'
    ])->name('auth.logout ');
});


Route::group(['prefix' => 'user'], function ($router) {
    Route::group(['middleware' => ['auth:api']], function ($router) {

        $router->delete('/me', [
            UserController::class, 'unregister'
        ])->name('user.unregister');

        $router->delete('/{user}', [
            UserController::class, 'delete'
        ])->name('user.delete');

        $router->get('/me', [
            UserController::class, 'me'
        ])->name('user.me');

        $router->get('/list', [
            UserController::class, 'list'
        ])->name('user.list');

        $router->put('/{user}', [
            UserController::class, 'update'
        ])->name('user.update');

        $router->put('/{user}/reset-password', [
            UserController::class, 'resetPassword'
        ])->name('user.reset-password');
    });
});

Route::group(['prefix' => 'category'], function ($router) {

    $router->get('/', [
        CategoryController::class, 'list'
    ])->name('category.list');

    $router->get('/show/{category}', [
        CategoryController::class, 'show'
    ])->name('category.show');

    $router->get('/menu', [
        CategoryController::class, 'menu'
    ])->name('category.menu');


    Route::group(['middleware' => ['auth:api']], function ($router) {

        $router->post('/', [
            CategoryController::class, 'create'
            ])->name('category.create');
            
        $router->put('/{id}', [
            CategoryController::class, 'update'
            ])->name('category.update');
                
        $router->delete('/{id}', [
            CategoryController::class, 'delete'
            ])->name('category.delete');
    });
    
});

Route::group(['prefix' => 'advert'], function ($router) {

    $router->get('/', [
        AdvertController::class, 'list'
    ])->name('advert.list');

    $router->get('/show/{advert}/{slug_url?}', [
        AdvertController::class, 'show'
    ])->name('advert.show');

    $router->match(['get', 'post'],'/{advert}/like', [
        AdvertController::class, 'like'
    ])->name('advert.like');

    $router->match(['get', 'post'],'/{advert}/unlike', [
        AdvertController::class, 'unlike'
    ])->name('advert.unlike');

    Route::group(['middleware' => ['auth:api']], function ($router) {

        $router->post('/upload-photo', [
            AdvertController::class, 'uploadPhoto'
        ])->name('advert.uploadPhoto');

        $router->post('/', [
            AdvertController::class, 'create'
        ])->name('advert.create');

        $router->put('/{advert}', [
            AdvertController::class, 'update'
        ])->name('advert.update');

        $router->put('/{advert}/state', [
            AdvertController::class, 'changeState'
        ])->name('advert.change.state');

        $router->delete('/{advert}', [
            AdvertController::class, 'delete'
        ])->name('advert.delete');

        $router->get('/favourites', [
            AdvertController::class, 'favourites'
        ])->name('advert.favourites');

        $router->delete('/{advert}/delete-favourite', [
            AdvertController::class, 'deleteFavourite'
        ])->name('advert.deleteFavourite');

        $router->get('/recents', [
            AdvertController::class, 'recents'
        ])->name('advert.recents');

        $router->delete('/{advert}/delete-recent', [
            AdvertController::class, 'deleteRecent'
        ])->name('advert.deleteRecent');

        $router->get('/my', [
            AdvertController::class, 'my'
        ])->name('advert.my');
        
    });
});
