export async function deleteClient(id: string): Promise<void> {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/clientes/${id}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) {
        throw new Error('Failed to delete client');
    }
}
