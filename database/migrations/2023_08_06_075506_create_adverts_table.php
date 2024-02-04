<?php

use App\Models\Advert;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adverts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('category_form_id');
            $table->unsignedBigInteger('city_id')->nullable();
            $table->string('title', 100)->nullable();
            $table->string('slug', 10)->nullable();
            $table->string('slug_url', 100)->nullable();
            $table->text('images')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->string('lat', 100)->nullable();
            $table->string('long', 100)->nullable();
            $table->text('info')->nullable();
            $table->json('content')->nullable();
            $table->timestamp('publish_at')->nullable();
            $table->enum('state', Advert::STATE)->default(Advert::STATE_PENDING);
            // $table->foreignId('city_id')->nullable()->references('id')->on('cities')->cascadeOnUpdate()->cascadeOnDelete();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade')
                ->onUpdate('cascade');

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
        Schema::dropIfExists('adverts');
    }
};
