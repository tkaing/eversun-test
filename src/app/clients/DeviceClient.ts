import HttpClient from './HttpClient';
import { BASE_API } from '@/constants';
import { HistoryRowDb } from '@/types/db.types';

const DEVICE_URL = `${BASE_API}/api/device`;

export default class DeviceClient {
	/** @GET /api/device/history/:deviceName */
	static async fetchDeviceHistory(deviceName: string) {
		return fetch(`${DEVICE_URL}/history/${deviceName}`, { headers: HttpClient.getHeaders() })
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
						data?: HistoryRowDb[];
					})
			);
	}

	/** @POST /api/device/update/:deviceName */
	static async saveDeviceInfo(deviceName: string, payload: any) {
		return fetch(`${DEVICE_URL}/update/${deviceName}`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: HttpClient.getHeaders(),
		})
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
					})
			);
	}

	/** @POST /api/device/topic/:deviceName */
	static async subscribeToDeviceTopic(deviceName: string) {
		return fetch(`${DEVICE_URL}/topic/${deviceName}`, {
			method: 'POST',
			headers: HttpClient.getHeaders(),
		})
			.then(async res => ({ res, json: res.ok && (await res.json()) }))
			.then(
				({ res, json }) =>
					({ ...json, status: res.status } as {
						status: number;
					})
			);
	}
}
