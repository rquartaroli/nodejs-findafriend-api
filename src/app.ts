import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import { findAFriendRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyStatic from '@fastify/static'
import path from 'path'

export const app = fastify()

export const pathSaveImages = `${__dirname}/images`

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(fastifyMultipart)

app.register(fastifyStatic, {
  root: path.join(__dirname, 'images'),
  prefix: '/images',
})

app.register(findAFriendRoutes)

app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})