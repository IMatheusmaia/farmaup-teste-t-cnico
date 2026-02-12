import { Pencil, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import type { Client } from '../services/api';

interface UserCardProps {
    client: Client;
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
}

export function UserCard({ client, onEdit, onDelete }: UserCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(client)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Editar"
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={() => onDelete(client.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Excluir"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="pr-16">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{client.name}</h3>

                <div className="space-y-2 mt-4">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Mail size={16} className="mr-2 text-blue-500" />
                        <span className="truncate">{client.email}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <Phone size={16} className="mr-2 text-blue-500" />
                        <span>{client.phone}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-2 text-blue-500" />
                        <span>{client.city}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
