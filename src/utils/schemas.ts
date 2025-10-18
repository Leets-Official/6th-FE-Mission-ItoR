import { z as zod } from 'zod';
import { validators, VALIDATION_MESSAGES } from '@/utils/validation';

export const signupSchema = zod
  .object({
    email: validators.email(),
    password: validators.password(),
    passwordConfirm: validators.passwordConfirm(),
    name: validators.name(),
    birthDate: validators.birthDate(),
    nickname: validators.nickname(),
    bio: validators.bio(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: VALIDATION_MESSAGES.passwordConfirm.mismatch,
    path: ['passwordConfirm'],
  });

export type SignupFormData = zod.infer<typeof signupSchema>;
