import { router, useForm } from '@inertiajs/react';
import React from 'react';

export default function ButtonAction({ id, label, className, ...props }) {
    const { delete: destroy } = useForm({ 
        id: id
     })

    const handleDelete = (e) => {
        e.preventDefault();
        delete(route('users.delete', [id]));
    };

    return (
        <a
            {...props}
            href="#"
            onClick={handleDelete}
            className={className + 'text-sm text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline'}
        >
            {label}
        </a>
    );
}

