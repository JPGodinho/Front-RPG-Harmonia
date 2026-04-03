import { z } from 'zod';

// Schema do Login (Já existia)
export const LoginFormSchema = z.object({
  nomeUsuario: z.string().min(1, { message: 'Digite seu usuário.' }).trim(),
  senha: z.string().min(1, { message: 'Digite sua senha.' }),
});

// Schema do Cadastro
export const SignupFormSchema = z.object({
  nomeUsuario: z.string().min(1, { message: 'Escolha um nome de usuário.' }).trim(),
  senha: z.string().min(4, { message: 'A senha deve ter pelo menos 4 caracteres.' }),
  tipoUsuario: z.enum(['JOGADOR', 'MESTRE'], { message: 'Selecione um tipo válido.' }),
});

// Schema do Perfil — todos os campos são opcionais,
// mas quando preenchidos seguem as regras de validação.
// O refine garante que confirmSenha bate com senha (apenas quando senha foi informada).
export const PerfilFormSchema = z
  .object({
    nomeUsuario: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      }),
    senha: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 3, {
        message: 'A senha deve ter pelo menos 3 caracteres.',
      }),
    confirmSenha: z.string().optional(),
  })
  .refine(
    (data) => {
      // Só valida confirmação quando senha foi preenchida
      if (data.senha) return data.senha === data.confirmSenha;
      return true;
    },
    {
      message: 'As senhas não coincidem.',
      path: ['confirmSenha'],
    }
  )
  .refine((data) => data.nomeUsuario || data.senha, {
    message: 'Preencha ao menos um campo para salvar.',
    path: ['_form'],
  });

export type FormState =
  | {
      errors?: {
        nomeUsuario?: string[];
        senha?: string[];
        confirmSenha?: string[];
        tipoUsuario?: string[];
        _form?: string[];
      };
      message?: string;
    }
  | undefined;