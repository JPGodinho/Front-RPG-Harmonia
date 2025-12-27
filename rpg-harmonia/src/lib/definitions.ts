import { z } from 'zod';

export const LoginFormSchema = z.object({
  nomeUsuario: z.string().min(1, { message: 'Por favor, insira seu usuário.' }).trim(),
  senha: z.string().min(1, { message: 'Por favor, insira sua senha.' }),
});

export type FormState =
  | {
      errors?: {
        nomeUsuario?: string[];
        senha?: string[];
      };
      message?: string;
    }
  | undefined;