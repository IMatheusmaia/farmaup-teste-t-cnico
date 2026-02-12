import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Client, CreateClientInput } from '../services/api';
import { useEffect } from 'react';

const clientSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(11, 'Telefone inválido').regex(/^\d{11}$/, 'Telefone deve conter apenas números (11 dígitos)'),
    city: z.string().min(3, 'A cidade deve ter pelo menos 3 caracteres'),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface UserFormProps {
    initialData?: Client;
    onSubmit: (data: ClientFormData) => void;
    isLoading?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading = false }: UserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            city: '',
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                        }`}
                    placeholder="Nome completo"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                        }`}
                    placeholder="seu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                </label>
                <input
                    id="phone"
                    type="text"
                    {...register('phone')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                        }`}
                    placeholder="11999999999"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                </label>
                <input
                    id="city"
                    type="text"
                    {...register('city')}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'
                        }`}
                    placeholder="Sua cidade"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        initialData ? 'Atualizar Cliente' : 'Criar Cliente'
                    )}
                </button>
            </div>
        </form>
    );
}
