import type { Client } from "../types";


export type CreateClientType = Omit<Client, 'id'>;
export type UpdateClientType = Partial<CreateClientType>;

export async function createClient(data: CreateClientType): Promise<void> {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status !== 201) {
        throw new Error('Failed to create client');
    }
}

export async function updateClient(id: string, data: UpdateClientType): Promise<void> {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        throw new Error('Failed to update client');
    }
}