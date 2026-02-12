import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { UserCard } from './UserCard';
import { UserForm } from './UserForm';
import { Modal } from './Modal';
import {
    type Client,
    type CreateClientInput,
    type UpdateClientInput,
    getClients,
    deleteClient,
    updateClient,
    createClient
} from '../services/api';


export function UserList() {
    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
    const [submitLoading, setSubmitLoading] = useState(false);

    const loadClients = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getClients();
            setClients(data);
        } catch (_err) {
            setError('Erro ao carregar clientes. Verifique se a API está rodando.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleCreate = () => {
        setEditingClient(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Deseja excluir este cliente?')) {
            try {
                await deleteClient(id);
                await loadClients(); // Refresh the list
            } catch (err) {
                alert('Erro ao excluir cliente');
            }
        }
    };

    const handleSubmit = async (data: CreateClientInput | UpdateClientInput) => {
        try {
            setSubmitLoading(true);
            if (editingClient) {
                await updateClient(editingClient.id, data);
            } else {
                await createClient(data as CreateClientInput);
            }
            setIsModalOpen(false);
            await loadClients(); // Refresh the list
        } catch (err) {
            alert('Erro ao salvar cliente');
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Clientes</h1>
                    <p className="text-gray-500 mt-1">FarmaUP</p>
                </div>

                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    title="Novo Cliente"
                >
                    <Plus size={24} />
                    <span className="hidden sm:inline font-medium pr-2">Novo Cliente</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            ) : clients.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Nenhum cliente cadastrado.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <UserCard
                            key={client.id}
                            client={client}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingClient ? 'Editar Cliente' : 'Novo Cliente'}
            >
                <UserForm
                    initialData={editingClient}
                    onSubmit={handleSubmit}
                    isLoading={submitLoading}
                />
            </Modal>
        </div>
    );
};
