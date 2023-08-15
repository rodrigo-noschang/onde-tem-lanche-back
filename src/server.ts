import { app } from "./app.js";
import { env } from "./env";

app.listen({
    port: env.PORT,
}, () => console.log(`Server running on PORT ${env.PORT}`));