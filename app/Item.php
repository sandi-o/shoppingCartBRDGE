<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'name', 'description','amount'
    ];

    /**
    * relationships
    */

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }
}
