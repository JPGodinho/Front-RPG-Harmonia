import { z } from 'zod';

// Schema do Login (Já existia)
export const LoginFormSchema = z.object({
  nomeUsuario: z.string().min(1, { message: 'Digite seu usuário.' }).trim(),
  senha: z.string().min(1, { message: 'Digite sua senha.' }),
});

// NOVO: Schema do Cadastro
export const SignupFormSchema = z.object({
  nomeUsuario: z.string().min(1, { message: 'Escolha um nome de usuário.' }).trim(),
  senha: z.string().min(4, { message: 'A senha deve ter pelo menos 4 caracteres.' }),
  tipoUsuario: z.enum(['JOGADOR', 'MESTRE'], { message: 'Selecione um tipo válido.' }),
});

export type FormState =
  | {
      errors?: {
        nomeUsuario?: string[];
        senha?: string[];
        tipoUsuario?: string[];
      };
      message?: string;
    }
  | undefined;