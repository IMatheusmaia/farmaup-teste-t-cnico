import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, type ClientFormData } from "../schemas/clientSchema";
import type { Client } from "../types";

interface ClientFormProps {
    client?: Client;
    onSubmit: (data: ClientFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function ClientForm({ client, onSubmit, onCancel, isLoading }: ClientFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: client ? {
            name: client.name,
            email: client.email,
            phone: client.phone,
            city: client.city,
        } : undefined,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                </label>
                <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                </label>
                <input
                    id="phone"
                    type="text"
                    placeholder="11999999999"
                    {...register("phone")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                </label>
                <input
                    id="city"
                    type="text"
                    {...register("city")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
                {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
            </div>

            <div className="flex gap-2 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                    {isLoading ? "Salvando..." : client ? "Atualizar" : "Criar"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:bg-gray-300 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
