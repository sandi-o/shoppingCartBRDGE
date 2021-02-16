<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->unsignedTinyInteger('force_password')->default(1);
            $table->text('photo')->nullable();            
            $table->unsignedTinyInteger('is_admin')->default(0);
            $table->ipAddress('ip')->nullable();
            $table->text('device')->nullable();
            $table->decimal('lat',10,8)->nullable();
            $table->decimal('lng',11,8)->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->unsignedTinyInteger('is_active')->default(1);
            $table->unsignedBigInteger('created_by')->default(0);
            $table->unsignedBigInteger('updated_by')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
