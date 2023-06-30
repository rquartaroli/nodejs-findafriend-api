## REQUISITOS FUNCIONAIS
[x] Deve ser possível cadastrar um pet <br />
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade <br />
[x] Deve ser possível filtrar pets por suas características <br />
[x] Deve ser possível visualizar detalhes de um pet para adoção <br />
[x] Deve ser possível se cadastrar como uma ORG <br />
[x] Deve ser possível realizar login como uma ORG <br />

## REGRAS DE NEGÓCIO
[x] Para listar os pets, obrigatoriamente precisamos informar a cidade <br />
[x] Uma ORG precisa ter um endereço e um número de WhatsApp <br />
[x] Um pet deve estar ligado a uma ORG <br />
[x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp <br />
[x] Todos os filtros, além da cidade, são opcionais <br />
[x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada <br />

## 💻 Projeto
API para adoção de Pets (animais de estimação), onde é possível registrar as organizações que fazem adoção dos animais, e uma vez feita o registro dessa organização, ela tem acesso a fazer registro de seus Pets disponíveis para adoção.

## ✔ Padrões
- Design Pattern<br />
- Repository Pattern<br />
- Factory Pattern<br />
- SOLID<br />
- Variáveis de ambiente<br />

## ✨ Tecnologias
- [Node JS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Testes Unitários e E2E com Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)

## Executando o projeto

Antes de qualquer coisa, é importante ressaltar que será necessário que tenha o [Docker](https://www.docker.com/) instalado em sua máquina para a execução do container do banco de dados, após ter ele instalado e funcional, siga os passos adiante,

Com o projeto aberto, utilize o **npm install** para instalar as dependências do projeto.

Crie agora um arquivo **.env** e cole o seguinte código nele:
```cl
NODE_ENV=development

JWT_SECRET=criesuajwtsecretaqui

DATABASE_URL="postgresql://docker:docker1234@localhost:5432/findafriend?schema=public"
```
Você também encontrará esse mesmo código no arquivo **.env.example**, mas esse que deixei aqui já tem a URL do postgresql utilizada de acordo com o arquivo **docker-compose.yml** <br />

Com o código inserido no arquivo **.env** recém criado, caso tenha optado por alterar o usuário, senha e o nome do banco de dados, faça também essas mesmas alterações no arquivo **docker-compose.yml**.<br />

**Exemplo de como você poderia alterar sua postgresql URL:** <br />
user: Você colocará o usuário de sua base de dados. Ex: **admin**. <br />
password: Você colocará o password de sua base de dados. Ex: **admin**. <br />
database: Você colocará o nome de sua base de dados. Ex: **base_pets**. <br />
Ficando assim: **DATABASE_URL="postgresql://admin:admin@localhost:5432/base_pets?schema=public"** <br /><br />
**Observação:** Caso você vá utilizar em produção, não é recomendado que utilize usuário e senha como admin. Só foram usados como exemplo aqui.

Com os arquivos **.env** e **docker-compose.yml** com as mesmas configurações e estando com o docker em execução, execute o seguinte comando:
```cl
docker compose up -d
```
Irá subir o container com seu banco de dados<br />

Agora execute o seguinte comando para criar a "typagem" do schema do prisma:
```cl
npx prisma generate
```
<br />

Com tudo configurado de acordo, agora execute o seguinte comando para a criação do schema das tabelas do prisma no banco de dados:
```cl
npx prisma migrate dev
```
Se caso aparecer um comando para você digitar o nome dessa migrate, basta inserir um nome para ela. Ex: create schema
<br />

Em seguida, inicie o projeto.

```cl
npm run dev
```
Lembrando que o container do banco de dados no docker deve estar em execução
<br />

Caso queira visualizar suas tabelas no painel do prisma, abra outro terminal e execute:
```cl
npx prisma studio
```

Com isso você já deverá estar com o ambiente rodando e pronto para a utilização das rotas (Endpoints).


## 🎏 Rotas (Endpoints)

- **baseURL** 
```cl
http://localhost:3333
```

- **rotas POST**
**CREATE ORGANIZATION (registra uma organização)**
`POST`
endpoint: `/organizations`
Content-Type: `application/json`
Body: `JSON`
Exemplo de entrada de dados:
```json
{
	"name_organization": "Pet for developers Salto",
	"name_responsible": "Rafael Quartaroli",
	"email": "rafael@gmail.com",
	"city": "Salto",
	"state": "SP",
	"cep": "13320000",
	"address": "Rua dos programadores",
	"whatsapp_num": "11999999999",
	"password": "123456"
}
```
<br />
<br />

**AUTHENTICATE ORGANIZATION (gera o token de autenticação para a organização)**
`POST`
endpoint: `/session`
Content-Type: `application/json`
Body: `JSON`
Exemplo de entrada de dados:
```json
{
	"email": "rafael@gmail.com",
	"password": "123456"
}
```
<br />
<br />

**CREATE PET (registra um Pet para uma organização, Obs: a organização precisa estar logada/autenticada)**
`POST`
endpoint: `/add_pet`
Content-Type: `multipart/form-data`
Body: `Multipart form`
Authenticate: `bearer token`
Exemplo de entrada de dados:
![cover](.github/example_input_create_pet.png?style=flat)
<br />
<br />

- **rotas PATCH**
**REFRESH TOKEN (atualiza o token)**
`PATCH`
endpoint: `/token/refresh`
Content-Type: `application/json`
Body: `JSON`
Exemplo de entrada de dados:
```json
{
	"email": "rafael@gmail.com",
	"password": "123456"
}
```
<br />
<br />

- **rotas GET**
**ORGANIZATION LOGIN (realiza o login da organização)**
`GET`
endpoint: `/organizationLogin`
Authenticate: `bearer token`
<br />
<br />

**FIND ALL PETS BY CITY (encontra todos os Pets por cidade)**
`GET`
endpoint: `/petsByCity/?city=Salto`
<br />
<br />

**FIND ALL PETS BY CITY WITH FILTERS (encontra todos os Pets por cidade(obrigatório), utilizando filtros(opcionais))**
`GET`
endpoint: `/petsByCity/?city=Salto&age=Filhote&size_carry=Pequenino&energy_level=Elevada&independence_level=Baixo`
<br />
<br />

**Recomendação**: Para executar as rotas, recomendo a utilização do [Insomnia](https://insomnia.rest/).

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito por Rafael Quartaroli. 🐶😺

<br />
