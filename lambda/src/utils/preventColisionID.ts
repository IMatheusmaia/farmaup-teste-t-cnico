import { getClientById } from "../service/getClientById.service";
import cryptoRandomString from "crypto-random-string";

export async function preventCollisionID() {
    const id = cryptoRandomString({ length: 10, type: 'numeric' });
    const client = await getClientById(id);
    if (client) {
        return preventCollisionID();
    }
    return id;
};