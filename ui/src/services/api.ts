
const API_URL = 'http://localhost:3030';

export type Client = {
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
        throw new Error(`Failed to get clients: ${response.statusText}`);
    }

    return await response.json();
}

export async function createClient(data: CreateClientInput): Promise<void> {
    const response = await fetch(`${API_URL}/clientes`, {
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

export async function updateClient(id: string, data: UpdateClientInput): Promise<void> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
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

export async function deleteClient(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) {
        throw new Error('Failed to delete client');
    }
}
