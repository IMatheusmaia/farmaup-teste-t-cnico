import type { Client } from "../types";

export async function fetchClients(): Promise<Client[]> {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/clientes`);

    if (response.status !== 200) {
        return [];
    }

    const { data }: { data: Client[] } = await response.json();

    return data;
}

export async function getClientById(id: string): Promise<Client | null> {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/clientes/${id}`);

    if (response.status !== 200) {
        return null;
    }

    const { data }: { data: Client } = await response.json();

    return data;
}