import cryptoRandomString from 'crypto-random-string';

const API_URL = 'http://127.0.0.1:3030';

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
}

export type CreateClientInput = Omit<Client, 'id'>;
export type UpdateClientInput = Partial<CreateClientInput>;

export async function getClients(): Promise<Client[]> {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) {
        throw new Error('Failed to fetch clients');
    }
    const json = await response.json();
    return json.data || [];
}

export async function createClient(data: CreateClientInput): Promise<void> {
    const id = cryptoRandomString({ length: 10, type: 'numeric' });
    const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id }),
    });
    if (!response.ok) {
        throw new Error('Failed to create client');
    }
}

export async function updateClient(id: string, data: UpdateClientInput): Promise<void> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update client');
    }
}

export async function deleteClient(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete client');
    }
}
