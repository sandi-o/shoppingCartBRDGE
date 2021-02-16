<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Transaction::all());
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes['user_id']      = $request->user_id;
        $attributes['total_amount'] = $request->total_amount;
        
        $transaction = Transaction::create($attributes);
        
        if(!empty($transaction)) {
            $transactionItems = json_decode($request->transaction_items);

            foreach($transactionItems as $transactionItem) {
                $transaction->addItems([
                    'item_id'=> $transactionItem->id,
                    'amount' => $transactionItem->amount,
                ]);
            }           
        }    

        return response()->json(['result' =>$transaction,'message'=>'Record successfully created with Id #: '. $transaction->id],200);
    }

}
