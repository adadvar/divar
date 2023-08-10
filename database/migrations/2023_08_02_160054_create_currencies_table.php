<?php

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
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('sign',50);
            $table->string('rate',50);
            $table->string('payment',50);
            $table->string('delimeter',1);
            $table->string('seperator',1);
            $table->string('number-decimal',50);
            $table->boolean('default')->default(false);
            $table->timestamps();

            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
