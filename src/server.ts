import { app } from "./app.js";
import { env } from "./env";

app.listen({
    port: env.PORT,
    host: '127.0.0.1'
}, () => console.log(`Server running on PORT ${env.PORT}`));