import { Endereco } from "../endereco";

export interface CreateClienteDto {
  cpf: string;
  nome: string;
  data_nascimento: Date;
  celular: string;
  email: string;
  endereco: Endereco;
}
