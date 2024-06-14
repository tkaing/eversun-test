import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { JWT_ID } from './AuthClient';

export default class HttpClient {
	static getHeaders(): HeadersInit {
		const headers = {
			'Content-Type': 'application/json',
		};

		const token = localStorage.getItem(JWT_ID);

		if (!token) {
			console.log('[getHeaders] token is null');
			return headers;
		}

		// @ts-ignore
		headers.Authorization = `Bearer ${token}`;

		return headers;
	}

	static onComplete(status: number, router: AppRouterInstance, completeCallback?: Function) {
		if (status === 401) {
			router.replace(`/auth`);
			return;
		}

		completeCallback && completeCallback();
	}

	static async call<T>(router: AppRouterInstance, promise: Promise<T & { status: number }>) {
		return promise.then(res => {
			if (res.status === 401) {
				router.replace(`/auth`);
				throw 'expired token';
			}
			return res;
		});
	}
}
