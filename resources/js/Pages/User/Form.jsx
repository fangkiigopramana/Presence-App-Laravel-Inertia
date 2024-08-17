import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import SelectBox from '@/Components/SelectBox';

export default function Form({auth, user, role, form}) {
    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        role: role || "",
        password: "",
        passwordConfirm: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (form === 'Create') {   
            post(route('users.store', {
                preserveScroll: true,
                onSuccess: () => {
                    alert("user Created");
                },
                onErrror: (errors) => {
                    console.log(errors);
                },
            }));
        } else if (form === 'Edit') {
            patch(route('users.update', user.id), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("user Updated");
                },
                onErrror: (errors) => {
                    console.log(errors);
                },
            });
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{form} User</h2>}
        >
            <Head title={form + ' User'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Isi dengan lengkap
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <SelectBox
                                        id={"role"}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("role", e.target.value)}
                                        currentValue={data.role}
                                        required
                                        options={[
                                            {
                                                value: 'admin',
                                                label: 'Admin'
                                            },
                                            {
                                                value: 'student',
                                                label: 'Student'
                                            }
                                        ]}
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                                
                                {form !== 'Edit' && (
                                    <>
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            autoComplete="password"
                                        />

                                        <InputError className="mt-2" message={errors.email} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="passwordConfirm" value="Password Confirm" />

                                        <TextInput
                                            id="passwordConfirm"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.passwordConfirm}
                                            onChange={(e) => setData('passwordConfirm', e.target.value)}
                                            required
                                            autoComplete="password"
                                        />

                                        <InputError className="mt-2" message={errors.email} />
                                    </div>
                                    </>
                                )}

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        {form !== 'Create' ? 'Update' : 'Create'}
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
