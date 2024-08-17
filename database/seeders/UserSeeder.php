<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'guard_name' => 'web'
            ],
            [
                'name' => 'student',
                'guard_name' => 'web'
            ],
        ];
    
        DB::table('roles')->insert($roles);


        $permissions = DB::table('permissions')->get();

        $admin = DB::table('roles')->where('name', 'admin')->first();

        foreach ($permissions as $permission) {
            DB::table('role_has_permissions')->insert([
                'permission_id' => $permission->id,
                'role_id' => $admin->id,
            ]);
        }


    
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password')
        ]);
    
        $admin->assignRole('admin');

        $users = User::factory(300)->create();

        foreach ($users as $user) {
            $user->assignRole('student');
        }
    }
}
