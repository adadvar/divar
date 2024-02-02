<?php

use App\Models\CategoryAnswer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_form_id');
            $table->unsignedBigInteger('city_id')->nullable();
            $table->string('title', 100)->nullable();
            $table->string('slug', 10)->nullable();
            $table->string('slug_url', 100)->nullable();
            $table->text('images')->nullable();
            $table->float('price')->nullable();
            $table->string('lat', 100)->nullable();
            $table->string('long', 100)->nullable();
            $table->text('info')->nullable();
            $table->json('content')->nullable();
            $table->enum('state', CategoryAnswer::STATE)->default(CategoryAnswer::STATE_PENDING);
            $table->timestamp('publish_at')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->softDeletes();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('city_id')
                ->references('id')
                ->on('cities')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('category_form_id')
                ->references('id')
                ->on('category_forms')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advert_answer');
    }
};
