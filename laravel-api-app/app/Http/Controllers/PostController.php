<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware(){

        return [
            new Middleware('auth:sanctum',except: ['index','show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Post::with('user')->latest()->get();;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       
        
       $fields =  $request->validate([
            'title'=>'required|max:255',
            'body'=>'required'
        ]);

        $post = $request->user()->posts()->create($fields);

        return response()->json([
            'message'=>'post create successfully',
            'post'=>$post,
            'user'=>$post->user
        ],201);
    }

    /**`
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
        return response()->json([
            'data'=>$post,
            'user'=>$post->user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // check it this user update other product that not owned

         Gate::authorize('modify',$post);
        $fields = $request->validate([
            'title'=>'required|max:255',
            'body'=>'required'
        ]);

        $post->update($fields);

        return response()->json([
            'message'=>'post updated successfully',
            'post'=>$post,
             'user'=>$post->user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // check it this user delete other product that not owned
         Gate::authorize('modify',$post);


        $post->delete();

        return response()->json([
            'message'=>'post deleted successfully',
            'deleted_post'=>$post->id
        ]);
    }
}
