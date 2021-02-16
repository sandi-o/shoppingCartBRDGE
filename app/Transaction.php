<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'total_amount'
    ];

    protected $with = ['transactionItems','user'];

    /**
    * relationships
    */

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function transactionItems() {
        return $this->hasMany(TransactionItem::class);
    }

    /**
     * methods
     */

    public function addItems($data) {
        return $this->transactionItems()->create($data);
    }

}
