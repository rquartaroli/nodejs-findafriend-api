import { FastifyInstance } from "fastify"
import { register } from "./controllers/register"
import { authenticate } from "./controllers/authenticate"
import { createPet } from "./controllers/createPet"
import { petsByCity } from "./controllers/petsByCity"
import { organizationLogin } from "./controllers/organizationLogin"
import { verifyJWT } from "./middlewares/verify-jwt"
import { refresh } from "./controllers/refresh"

export async function findAFriendRoutes(app: FastifyInstance) {
  app.get('/organizationLogin', { onRequest: [verifyJWT] }, organizationLogin)
  app.post('/session', authenticate)
  app.post('/organizations', register)

  app.patch('/token/refresh', refresh)

  app.get('/petsByCity/:city', petsByCity)
  app.post('/add_pet', { onRequest: [verifyJWT] }, createPet)

}