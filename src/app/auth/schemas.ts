import { z } from 'zod';

export const loginSchema = z.object({
	code: z
		.string({
			required_error: `Le code est requis`,
			invalid_type_error: `Le code doit être une chaîne de caractères`,
		})
		.min(1, `Le code est requis`)
		.max(4, `4 chiffres maximum`),
	username: z
		.string({
			required_error: `Le nom / email est requis`,
			invalid_type_error: `Le nom / email doit être une chaîne de caractères`,
		})
		.min(1, `Le nom / email est requis`),
});

export const registerSchema = z.object({
	name: z
		.string({
			required_error: `Le nom / pseudo est requis`,
			invalid_type_error: `Le nom / pseudo doit être une chaîne de caractères`,
		})
		.min(1, `Le nom / pseudo est requis`)
		.refine((value: any) => {
			return new RegExp('^[a-zA-Z0-9]+$', 'u').test(value);
		}, 'La chaîne ne doit contenir que des lettres et des chiffres.'),
	email: z
		.string({
			required_error: `L'adresse email est requis`,
			invalid_type_error: `L'adresse email doit être une chaîne de caractères`,
		})
		.min(1, `L'adresse email est requis`)
		.email(`L'adresse email est invalide`),
});
