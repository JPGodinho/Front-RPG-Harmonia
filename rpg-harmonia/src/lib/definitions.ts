import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Informe um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres.' }),
  email: z
    .string()
    .email({ message: 'Informe um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  telefone: z
    .string()
    .regex(/^\+?[0-9]{13}$/, { message: 'Telefone inválido. Use o formato +5511999999999.' })
    .optional()
    .or(z.literal('')),
});

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

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
} | undefined;