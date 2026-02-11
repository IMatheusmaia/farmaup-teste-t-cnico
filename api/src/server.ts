import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});

fastify.listen({ port: 3030 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
});

export default fastify;