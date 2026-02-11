import cryptoRandom from "crypto-random-string";
import { getClientById } from "../service/getClientById.service.js";

async function preventCollisionID() {
    const id = cryptoRandom({ length: 10, type: 'numeric' });
    const client = await getClientById(id);
    if (client) {
        return preventCollisionID();
    }
    return id;
};

export { preventCollisionID };