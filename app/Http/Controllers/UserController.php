<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
        return Inertia::render('User/Form',[
            'form' => 'Create'
        ]);
    }

    public function store (Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:8',
            'passwordConfirm' => 'required|same:password',
            'role' => 'required|in:admin,student',
        ]);
        $new_user= User::create([
            'name' => $validated['name'], 
            'email' => $validated['email'], 
            'password' => Hash::make($validated['password']), 
        ]);

        $new_user->assignRole($validated['role']);
        return redirect()->route('users');
    }

    public function edit (User $user){
        return Inertia::render('User/Form',[
            'form' => 'Edit',
            'user' => $user,
            'role' => $user->roles->first()->name
        ]);
    }

    public function update (Request $request, User $user){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role' => 'required|in:admin,student'
        ]);

        $user->update([
            'name' => $validated['name'], 
            'email' => $validated['email'], 
        ]);
        
        $user->assignRole($request->role);

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
