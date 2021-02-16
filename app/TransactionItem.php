<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_id', 'item_id','amount'
    ];

    protected $with = ['item'];

    /**
    * relationships
    */

    public function transaction() {
        return $this->belongsTo(Transaction::class);
    }

    public function item() {
        return $this->belongsTo(Item::class);
    }
}
