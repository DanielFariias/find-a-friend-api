import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrganizationUseCase } from '../../../use-cases/organizations/factories/make-authenticate-organization-use-case'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function authenticateOrganizationRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateOrganizationUseCase()

  const { organization } = await authenticateUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
