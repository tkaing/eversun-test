import HttpClient from './HttpClient';
import { BASE_API } from '@/constants';
import { LoginInput, LoginOutput, RegisterInput, RegisterOutput, UserInfoOutput } from '@/types/auth.types';

const AUTH_URL = `${BASE_API}/api`;

export const JWT_ID = 'eversun-test-jwt';

export default class AuthClient {
	/** @POST /api/login */
	static async signIn(payload: LoginInput) {
		return fetch(`${AUTH_URL}/login`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
						data?: LoginOutput;
					})
			);
	}

	/** @POST /api/register */
	static async signUp(payload: RegisterInput) {
		return fetch(`${AUTH_URL}/register`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
						data?: RegisterOutput;
					})
			);
	}

	/** @GET /api/userinfo */
	static async fetchUserInfo() {
		return fetch(`${AUTH_URL}/userinfo`, {
			headers: HttpClient.getHeaders(),
		})
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
						data?: UserInfoOutput;
					})
			);
	}

	static getErrorMapping(input: string) {
		switch (input) {
			case 'user not found':
				return 'Oups ! Utilisateur introuvable...';
			case 'bad password':
				return 'Oups ! Mot de passe incorrect...';
			default:
				return 'Oups ! Erreur inconnue...';
		}
	}
}
