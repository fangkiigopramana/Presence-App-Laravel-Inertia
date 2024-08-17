<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index (){
        $users = User::with('roles')->paginate(10);
        return Inertia::render('User/Index',[
            'users' => $users,
        ]);
    }

    public function create (){
        return Inertia::render('User/Create');
    }

    public function store (Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:8',
            'passwordConfirm' => 'required|same:password',
            'role' => 'required',
        ]);
        $new_user= User::create([
            'name' => $validated['name'], 
            'email' => $validated['email'], 
            'password' => $validated['password'], 
        ]);

        $new_user->assignRole($validated['role']);
        return redirect()->route('users');
    }

    public function delete(Request $id){
        $user = User::find($id);
        if ($user) {
            $user->delete();
        }

        return redirect()->route('users');
    }
}
