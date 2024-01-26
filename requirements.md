# App

Find a Friend.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] A org deve ser identificada por um JWT (JSON Web Token);

### Pet
{
  id: string
  name: string
  age: Filhote | Adulto | Idoso
  EnergyLevel: 1, 2, 3, 4, 5
  size: small | medium | large
  independenceLevel: small | medium | large
  <!-- imgUrl: string -->
  type: Dog | Cat | Other
  description: string
  environment: Pequeno | médio | amplo
  adoptionRequirements: string[]
  adoption_date: string | null
  org_id: Foreign key
} 

### Org
{
  id: string
  responsible_name: string
  name: string
  email: string
  cep: string
  address: string
  phone: number
  password_hash: string
}