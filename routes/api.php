<?php

use App\Http\Controllers\AdvertController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryAnswerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryFormController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => '/test'], function ($r) {
    $r->get('/migrate', [TestController::class, 'migrate']);
    $r->get('/', [TestController::class, 'index']);
    $r->get('/get', [TestController::class, 'getSession']);
});

Route::group(['prefix' => '/home'], function ($r) {
    $r->get('/home-data', [HomeController::class, 'homeData'])->name('home.home.data');
    $r->get('/cities', [HomeController::class, 'cities'])->name('home.cities');
});


Route::group([], function ($router) {

    // Route::group(['namespace' => '\Laravel\Passport\Http\Controllers'], function ($router) {
    //     $router->post('login', [
    //         'middleware' => ['throttle'],
    //         AccessTokenController::class, 'issueToken',
    //     ])->name('auth.login');
    // });


    $router->post('login', [
        AuthController::class, 'login'
    ])->name('auth.login');

    $router->post('register', [
        AuthController::class, 'register'
    ])->name('auth.register');

    $router->post('register-verify', [
        AuthController::class, 'registerVerify'
    ])->name('auth.register.verify');

    $router->post('resend-verification-code', [
        AuthController::class, 'resendVerificationCode'
    ])->name('auth.register.resend.verification.code');

    $router->get('home-data', [
        UserController::class, 'homeData'
    ])->name('user.home.data');
});

Route::group(['middleware' => ['auth:sanctum']], function ($router) {

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
    Route::group(['middleware' => ['auth:sanctum']], function ($router) {

        $router->delete('/me', [
            UserController::class, 'unregister'
        ])->name('user.unregister');

        $router->delete('/{user}', [
            UserController::class, 'delete'
        ])->name('user.delete');

        $router->get('/me', [
            UserController::class, 'me'
        ])->name('user.me');

        $router->get('/get/{user}', [
            UserController::class, 'get'
        ])->name('user.get');

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

    Route::group(['middleware' => ['auth:sanctum']], function ($router) {

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

Route::group(['prefix' => 'answer'], function ($router) {
    $router->get('/list/{param1?}/{param2?}', [
        CategoryAnswerController::class, 'list'
    ])->name('answer.list');

    $router->get('/show/{id_slug}', [
        CategoryAnswerController::class, 'show'
    ])->name('answer.show');

    $router->match(['get', 'post'], '/{categoryAnswer}/like', [
        CategoryAnswerController::class, 'like'
    ])->name('answer.like');

    $router->match(['get', 'post'], '/{categoryAnswer}/unlike', [
        CategoryAnswerController::class, 'unlike'
    ])->name('answer.unlike');

    Route::group(['middleware' => ['auth:sanctum']], function ($router) {
        $router->get('/admin/{category}', [
            CategoryAnswerController::class, 'listAdmin'
        ])->name('answer.admin.list');

        $router->get('/user', [
            CategoryAnswerController::class, 'listUser'
        ])->name('answer.user.list');


        $router->post('/{category}', [
            CategoryAnswerController::class, 'create'
        ])->name('answer.create');

        $router->post('/update/{categoryAnswer}', [
            CategoryAnswerController::class, 'update'
        ])->name('answer.update');

        $router->put('/{categoryAnswer}/state', [
            CategoryAnswerController::class, 'changeState'
        ])->name('answer.change.state');

        $router->delete('/{categoryAnswer}', [
            CategoryAnswerController::class, 'delete'
        ])->name('answer.delete');

        $router->get('/favourites', [
            CategoryAnswerController::class, 'favourites'
        ])->name('answer.favourites');

        $router->delete('/{categoryAnswer}/delete-favourite', [
            CategoryAnswerController::class, 'deleteFavourite'
        ])->name('answer.deleteFavourite');

        $router->get('/recents', [
            CategoryAnswerController::class, 'recents'
        ])->name('answer.recents');

        $router->delete('/{categoryAnswer}/delete-recent', [
            CategoryAnswerController::class, 'deleteRecent'
        ])->name('answer.deleteRecent');

        $router->get('/my', [
            CategoryAnswerController::class, 'my'
        ])->name('answer.my');
    });
});


Route::group(['prefix' => 'form'], function ($router) {

    Route::group(['middleware' => ['auth:sanctum']], function ($router) {
        $router->get('/{category}', [
            CategoryFormController::class, 'show'
        ])->name('form.show');

        $router->post('/{category?}', [
            CategoryFormController::class, 'create'
        ])->name('form.create');
    });
});


Route::group(['prefix' => 'advert'], function ($router) {

    $router->get('/list/{param1?}/{param2?}', [
        AdvertController::class, 'list'
    ])->name('advert.list');

    $router->get('/show/{id_slug}', [
        AdvertController::class, 'show'
    ])->name('advert.show');

    $router->match(['get', 'post'], '/{advert}/like', [
        AdvertController::class, 'like'
    ])->name('advert.like');

    $router->match(['get', 'post'], '/{advert}/unlike', [
        AdvertController::class, 'unlike'
    ])->name('advert.unlike');

    Route::group(['middleware' => ['auth:sanctum']], function ($router) {

        $router->get('/admin/{category?}', [
            AdvertController::class, 'listAdmin'
        ])->name('advert.admin.list');

        $router->get('/admin/show/{id_slug}', [
            AdvertController::class, 'showAdmin'
        ])->name('advert.admin.show');


        $router->post('/{category}', [
            AdvertController::class, 'create'
        ])->name('advert.create');

        $router->post('/update/{advert}', [
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
