import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import fs from "fs"
import { makeCreatePetUseCase } from "../../use-cases/factories/make-create-pet-use-case"
import { pathSaveImages } from "../../app"
import { CreatePetUseCaseRequest } from "../../use-cases/create-pet"

export async function createPet (request: FastifyRequest, reply: FastifyReply) {

  const parts = request.parts()

  const uploadedImages: string[] = []
  const pathImages: string[] = []

  let namePet= undefined
  let aboutPet= undefined
  let agePet= undefined
  let size_carryPet= undefined
  let energy_levelPet= undefined
  let independence_levelPet= undefined
  let environmentPet= undefined
  let photosPet= undefined
  let requirements_adoptionPet= undefined
  let organization_IdPet= undefined

  for await (const part of parts) {
    if (part.type === 'file') {
      const today = new Date().getTime()
      const nameImage = today+'_'+part.filename
      let path = ''
      if(part.filename === 'image_for_use_of_test_e2e.jpg') {
        path = `${pathSaveImages}/test_e2e/${nameImage}`
      } else {
        path = `${pathSaveImages}/${nameImage}`
      }

      uploadedImages.push(nameImage)
      pathImages.push(path)

      await fs.promises.writeFile(path, part.file);
    } else {
      switch (part.fieldname) {
        case 'name':
          namePet = part.value as string
          break;
        case 'about':
          aboutPet = part.value as string
          break;
        case 'age':
          agePet = part.value as string
          break;
        case 'size_carry':
          size_carryPet = part.value as string
          break;
        case 'energy_level':
          energy_levelPet = part.value as string
          break;
        case 'independence_level':
          independence_levelPet = part.value as string
          break;
        case 'environment':
          environmentPet = part.value as string
          break;
        case 'requirements_adoption':
          requirements_adoptionPet = JSON.parse(part.value as string) as string[]
          break;
        case 'organization_Id':
          organization_IdPet = part.value as string
          break;
        default:
          break;
      }
    }
  }
  
  photosPet = uploadedImages

  const bodyData = {
    name: namePet,
    about: aboutPet,
    age: agePet,
    size_carry: size_carryPet,
    energy_level: energy_levelPet,
    independence_level: independence_levelPet,
    environment: environmentPet,
    photos: photosPet,
    requirements_adoption: requirements_adoptionPet,
    organization_Id: organization_IdPet,
  } as CreatePetUseCaseRequest

  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(["Filhote", "Adolescente", "Idoso"]),
    size_carry: z.enum(["Pequenino", "Medio", "Grande"]),
    energy_level: z.enum(["Baixa", "Pouca", "Consideravel", "Muita", "Elevada"]),
    independence_level: z.enum(["Baixo", "Mediano", "Alto"]),
    environment: z.enum(["reduzido", "medio", "amplo"]),
    photos: z.array(z.string()),
    requirements_adoption: z.array(z.string()),
    organization_Id: z.string(),
  })

  if(!registerBodySchema.safeParse(bodyData).success) {
    pathImages.forEach((pathImage) => {
      fs.unlink(pathImage, (err) => {
        if (err) {
          console.error(`Erro ao excluir o arquivo ${pathImage}: ${err.message}`);
          return;
        }
      })
    })
  }

  const {
    name,
    about,
    age,
    size_carry,
    energy_level,
    independence_level,
    environment,
    photos,
    requirements_adoption,
    organization_Id,
  } = registerBodySchema.parse(bodyData)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about,
      age,
      size_carry,
      energy_level,
      independence_level,
      environment,
      photos,
      requirements_adoption,
      organization_Id,
    })
    
  } catch (err) {
    throw err
  }

  return reply.status(201).send()
}