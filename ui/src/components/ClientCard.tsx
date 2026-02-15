import type { Client } from "../types";

interface ClientCardProps {
    client: Client;
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export default function ClientCard({ client, onEdit, onDelete, isDeleting }: ClientCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{client.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {client.email}
                    </p>
                    <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {client.phone}
                    </p>
                    <p className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {client.city}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                    onClick={() => onEdit(client)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(client.id)}
                    disabled={isDeleting}
                    className="flex-1 px-3 py-2 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                >
                    {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
            </div>
        </div>
    );
}