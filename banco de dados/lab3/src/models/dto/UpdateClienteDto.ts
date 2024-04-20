import { Endereco } from "../endereco";

export interface UpdateClienteDto {
  cpf: string;
  nome: string;
  data_nascimento: Date;
  celular: string;
  email: string;
  endereco: Endereco;
}
