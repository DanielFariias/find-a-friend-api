# App

Find a Friend.

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)

- [x] A senha da Organização precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] A Organização deve ser identificada por um JWT (JSON Web Token);

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