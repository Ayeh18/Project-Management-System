<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->longText('description')->nullable();
    $table->date('due_date')->nullable();
    $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
    $table->string('image_path')->nullable();

    $table->foreignId('created_by')
          ->constrained('users')
          ->cascadeOnDelete();

    $table->foreignId('updated_by')
          ->nullable()
          ->constrained('users')
          ->nullOnDelete();

    $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

