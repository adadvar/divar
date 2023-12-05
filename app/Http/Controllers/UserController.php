<?php

namespace App\Http\Controllers;


use App\Http\Requests\User\ChangeEmailRequest;
use App\Http\Requests\User\ChangeEmailSubmitRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\UserUnregisterRequest;
use App\Http\Requests\User\UserDeleteRequest;
use App\Http\Requests\User\UserListRequest;
use App\Http\Requests\User\UserMeRequest;
use App\Http\Requests\User\UserResetPasswordRequest;
use App\Http\Requests\User\UserUpdateMeRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Mail\VerificationCodeMail;
use App\Models\Advert;
use App\Models\Category;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
  const CHANGE_EMAIL_CACHE_KEY = 'change.email.for.user.';

  public function homeData(Request $r)
  {
    try {

      $pageData = [];
      $pageData['title'] = 'صفحه اصلی';
      $pageData['description'] = 'اینجا صفحه اصلی برنامه است.';
      $pageData['adverts'] = Advert::all()->load('user', 'category');
      $pageData['categories'] = Category::all()->load('child');

      return response()->json(
        $pageData,
        200
      );
    } catch (Exception $e) {
      Log::error($e);
      return response([
        'message' => 'خطایی رخ داده است.'
      ], 500);
    }
  }

  public function changeEmail(ChangeEmailRequest $request)
  {
    try {
      $email = $request->email;
      $userId = auth()->id();
      $user = auth()->user();
      $code = random_verification_code();
      $expireDate = now()->addMinutes(config('auth.change_email_cache_expiration', 1440));
      Cache::put(self::CHANGE_EMAIL_CACHE_KEY . $userId, compact('email', 'code'), $expireDate);
      if (!env('APP_DEBUG', true)) {
        Mail::to($user)->send(new VerificationCodeMail($code));
      }
      Log::info('SEND_CHANGE_EMAIL_CODE', compact('code'));
      return response([
        'message' => 'یک ایمیل برای شما ارسال شده است لطفا آن را بررسی نمایید'
      ], 200);
    } catch (Exception $e) {
      Log::error($e);
      return response([
        'message' => 'یک خطایی رخ داده است و سرور قادر به ارسال کد فعال سازی نمی باشد'
      ], 500);
    }
  }

  public function changeEmailSubmit(ChangeEmailSubmitRequest $request)
  {
    $userId = auth()->id();
    $cacheKey = self::CHANGE_EMAIL_CACHE_KEY . $userId;
    $cache = Cache::get($cacheKey);

    if (empty($cache) || $cache['code'] != $request->code) {
      return response([
        'message' => 'درخواست نامعتبر'
      ], 400);
    }

    $user = auth()->user();
    $user->email = $cache['email'];
    $user->save();
    Cache::forget($cacheKey);
    return response([
      'email' => $user->email,
      'message' => 'ایمیل با موفقیت تغییر یافت'
    ], 200);
  }

  public function changePassword(ChangePasswordRequest $request)
  {
    try {
      $user = auth()->user();

      if (!Hash::check($request->old_password, $user->password)) {
        return response(['message' => 'رمز وارد شده مطابقت ندارد'], 400);
      }

      $user->password = bcrypt(($request->new_password));
      $user->save();

      return response([
        'message' => 'پسورد با موفقیت تغییر یافت!'
      ], 200);
    } catch (Exception $e) {
      Log::error($e);
      return response(['message' => 'خطایی رخ داده است !'], 500);
    }
  }

  public function logout(Request $request)
  {
    try {
      $request->user()->currentAccessToken()->revoke();

      return response(['message' => 'باموفقیت خارج شدید'], Response::HTTP_OK);
    } catch (Exception $e) {
      Log::error($e);
    }

    return response(['message' => 'خروج ناموفق بود'], Response::HTTP_BAD_REQUEST);
  }

  public function unregister(UserUnregisterRequest $request)
  {
    try {
      DB::beginTransaction();
      $request->user()->delete();
      DB::commit();
      return response(['message' => 'با موفقیت لغو ثبت نام شد!'], 200);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error($e);
      return response(['message' => 'خطایی رخ داده است !'], 500);
    }
  }

  public function delete(UserDeleteRequest $request)
  {
    try {
      DB::beginTransaction();
      $request->user->delete();
      DB::table('oauth_access_tokens')
        ->where('user_id', $request->user->id)
        ->delete();
      DB::commit();
      return response(['message' => 'کاربر با موفقیت حذف شد!'], 200);
    } catch (Exception $e) {
      DB::rollBack();
      Log::error($e);
      return response(['message' => 'خطایی رخ داده است !'], 500);
    }
  }

  public function me(UserMeRequest $request)
  {
    $user = auth('api')->user();

    return $user;
  }

  public function list(UserListRequest $request)
  {
    return User::paginate($request->per_page ?? 10);
  }

  public function update(UserUpdateRequest $request)
  {
    $request->user->update($request->validated());
    return $request->user;
  }

  public function resetPassword(UserResetPasswordRequest $request)
  {
    $request->user->update(['password' => env('REQUEST_PASSWORD_DEFAULT', bcrypt('123456'))]);
    // return response(null, Response::HTTP_ACCEPTED);
    return response([
      'message' => 'پسورد با موفقیت بازنشانی شد!'
    ], 200);
  }
}
