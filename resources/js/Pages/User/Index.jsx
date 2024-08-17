import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import ButtonAction from '@/Components/ButtonAction';

export default function User({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 bg-gray-200">
                            <div className="p-4">
                                <h1 className="text-3xl mb-3">
                                    Users
                                </h1>
                                <div className="h-full flex justify-between items-center">
                                    <p className='font-semibold'>Total: {(users.total)} Users</p>
                                    <form className="max-w-sm mx-auto">
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                Search
                                            </span>
                                            <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green"/>
                                        </div>
                                    </form>

                                    <Link
                                        href={route('users.create')}
                                        className="inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none hover:bg-blue-500">
                                            Create User
                                    </Link>                            
                                </div>
                            </div>
                            <div className="px-5 py-4 flex justify-left">
                                <table className="text-md bg-white shadow-md rounded mb-4 min-w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-3 px-5">No</th>
                                            <th className="text-left p-3 px-5">Name</th>
                                            <th className="text-left p-3 px-5">Email</th>
                                            <th className="text-left p-3 px-5">Role</th>
                                            <th className="text-left p-3 px-5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map(({id, name, email, roles}, index) => {
                                            return (
                                                <tr className="border-b bg-white hover:bg-gray-100" key={index}>
                                                    <td className="p-3 px-5">
                                                        <p>{id}.</p>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <p>{name}</p>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <p>{email}</p>
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        <p>{roles.map((role) => role.name).join(', ')}</p>
                                                    </td>
                                                    <td className="p-3 px-5 flex justify-left space-x-2">
                                                        <Link
                                                            href={route('users.edit',id)}
                                                            className="inline-block rounded bg-yellow-600 px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none hover:bg-yellow-500">
                                                                Edit
                                                        </Link>  
                                                        <Link
                                                            href={route('users.edit',id)}
                                                            className="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none hover:bg-red-500">
                                                                Delete
                                                        </Link>  
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="p-4">
                                                <Pagination links={users.links} />
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
