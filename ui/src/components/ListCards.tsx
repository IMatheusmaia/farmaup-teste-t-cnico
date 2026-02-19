import { useState, useEffect } from "react";
import { fetchClients } from "../services/fetchData";
import { createClient, updateClient } from "../services/sendData";
import { deleteClient } from "../services/deleteData";
import type { Client } from "../types";
import ClientCard from "./ClientCard";
import ClientForm from "./ClientForm";
import type { ClientFormData } from "../schemas/clientSchema";

type FormMode = "create" | "edit" | null;

export default function ListCards() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [formMode, setFormMode] = useState<FormMode>(null);
    const [selectedClient, setSelectedClient] = useState<Client | undefined>();
    const [error, setError] = useState<string | null>(null);

    const loadClients = async () => {
        setIsLoading(true);
        try {
            const clients = await fetchClients();
            setClients(clients);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Erro ao carregar clientes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleCreate = async (data: ClientFormData) => {
        setIsSubmitting(true);
        try {
            await createClient(data);
            await loadClients();
            handleCloseModal();
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Erro ao criar cliente");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (data: ClientFormData) => {
        if (!selectedClient?.id) return;

        setIsSubmitting(true);
        try {
            await updateClient(selectedClient.id, data);
            await loadClients();
            handleCloseModal();
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Erro ao atualizar cliente");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este cliente?")) return;

        setIsDeleting(id);
        try {
            await deleteClient(id);
            await loadClients();
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Erro ao excluir cliente");
        } finally {
            setIsDeleting(null);
        }
    };

    const handleEdit = (client: Client) => {
        setSelectedClient(client);
        setFormMode("edit");
    };

    const handleCloseModal = () => {
        setFormMode(null);
        setSelectedClient(undefined);
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
                <button
                    onClick={() => setFormMode("create")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Novo Cliente
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="text-center py-8 text-gray-600">Carregando...</div>
            ) : clients.length === 0 ? (
                <div className="text-center py-8 text-gray-600">Nenhum cliente encontrado</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {clients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isDeleting={isDeleting === client.id}
                        />
                    ))}
                </div>
            )}

            {formMode && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {formMode === "create" ? "Novo Cliente" : "Editar Cliente"}
                        </h2>
                        <ClientForm
                            client={selectedClient}
                            onSubmit={formMode === "create" ? handleCreate : handleUpdate}
                            onCancel={handleCloseModal}
                            isLoading={isSubmitting}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}