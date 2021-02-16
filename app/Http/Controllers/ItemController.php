<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Item::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes['name']         = $request->name;
        $attributes['code']         = $request->code;
        $attributes['amount']       = $request->amount;
        $attributes['description']  = $request->description;        
        
        $item = Item::create($attributes);

        return response()->json(['result' =>$item,'message'=>'Record successfully created with Id #: '. $item->id],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        
        $attributes['name']         = $request->name;
        $attributes['code']         = $request->code;
        $attributes['description']  = $request->description;
        $attributes['amount']       = $request->amount;                
        
        $result = $item->update($attributes);

        return response()->json(['result' =>$result,'message'=>'Record successfully Updated with Id #: '. $item->id],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $result = $item->delete();
        return response()->json(['result'=> $result, 'message'=>'Record successfully Deleted with Id #: '.$item->id], 200);
    }
}
