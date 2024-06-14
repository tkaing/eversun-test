'use client';

import _ from 'lodash';
import { css } from 'styled-components';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Layout from '../components/Layout';
import HttpClient from '../clients/HttpClient';
import { JWT_ID } from '../clients/AuthClient';
import { useApp } from '@/contexts/AppContext';
import { colors } from '@/styles/settings/variables';
import DeviceClient from '../clients/DeviceClient';
import { A, Div, Img, Span } from '../components/base';
import { heading, headingH1 } from '@/styles/placeholders/heading';

const styles = {
	backBtn: css`
		color: ${colors.secondary};
		display: block;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 35px;
	`,
	deviceImgContainer: css`
		width: 150px;
		position: relative;

		& > img {
			max-width: 100%;
		}
	`,
	deviceImgAvatar: css`
		opacity: ${props => (props.$powerOn ? 1 : 0.5)};
	`,
	deviceImgPowerOff: css`
		width: 70px;
		padding: 10px;
		border-radius: 50%;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: ${props => (props.$powerOn ? 'none' : 'block')};
	`,
	deviceOverview: css`
		line-height: 30px;
		font-weight: bold;

		& span {
			color: ${colors.secondary};
		}
	`,
	powerImg: css`
		width: 60px;
	`,
	powerText: css`
		font-size: 20px;
		font-weight: bold;
		margin-left: 20px;
	`,
	switchContainer: css`
		& input {
			transform: scale(2);
			margin-left: -22px !important;

			&:checked {
				border-color: ${colors.secondary};
				background-color: ${colors.secondary};
			}
		}

		& label {
			transform: scale(2);
			margin-left: 50px;
			font-weight: bold;
		}
	`,
	rowDate: css`
		color: ${colors.pink};
		font-weight: bold;
	`,
};

export default function Device() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const deviceName = searchParams.get('name');

	const [errors, setErrors] = useState(null);
	const [powerState, setPowerState] = useState('OFF');
	const [historyRows, setHistoryRows] = useState([]);
	const [isLoadingPower, setIsLoadingPower] = useState(false);
	const [isDataFullyLoaded, setIsDataFullyLoaded] = useState(false);
	const [isSubscribedToTopic, setIsSubscribedToTopic] = useState(false);

	const upToDateDeviceInfo = historyRows.at(0);

	const {
		states: { user },
	} = useApp();

	useEffect(() => {
		if (!localStorage.getItem(JWT_ID)) {
			router.replace(`/auth`);
			return;
		}

		if (deviceName !== 'plug' && deviceName !== 'camera') {
			setErrors(`scope=device_name, msg=unknown device`);
			return;
		}

		HttpClient.call(router, DeviceClient.fetchDeviceHistory(deviceName))
			.then(res => {
				if (res.status !== 200) {
					setErrors(`scope=device_history, code=${res.status}`);
					throw 'cannot fetch device history';
				}

				setHistoryRows(res.data);
				setIsDataFullyLoaded(true);

				return HttpClient.call(router, DeviceClient.subscribeToDeviceTopic(deviceName));
			})
			.then(res => {
				if (res.status !== 200 && res.status !== 208) {
					setErrors(`scope=device_topic_sub, code=${res.status}`);
					throw 'cannot subscribe to device topic';
				}

				setIsSubscribedToTopic(true);
			});
	}, []);

	useEffect(() => {
		if (upToDateDeviceInfo) {
			setPowerState(upToDateDeviceInfo.state);
		}
	}, [upToDateDeviceInfo]);

	useEffect(() => {
		if (!isSubscribedToTopic) {
			return;
		}

		const socket = new WebSocket('ws://localhost:3009/ws');

		socket.onopen = () => {
			console.log('WebSocket connection established');
		};

		socket.onmessage = event => {
			setHistoryRows(prev => [JSON.parse(event.data), ...prev]);
		};

		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};

		socket.onerror = error => {
			console.error('WebSocket error:', error);
		};

		return () => {
			socket.close();
		};
	}, [isSubscribedToTopic]);

	const handleToggleSwitch = checked => {
		setIsLoadingPower(true);

		HttpClient.call(router, DeviceClient.saveDeviceInfo(deviceName, { state: checked ? 'ON' : 'OFF' })).then(
			res => {
				if (res.status !== 200) {
					setErrors(`scope=device_update, code=${res.status}`);
					throw 'cannot update device';
				}

				setIsLoadingPower(false);
			}
		);
	};

	if (errors) {
		return `❗️Error (${errors})`;
	}

	if (!isDataFullyLoaded) {
		return 'Loading data...';
	}

	const isPowerOn = powerState === 'ON';
	const isDataAvailable = historyRows.length > 0;

	return (
		<Layout>
			<Div className="px-2 px-sm-4">
				<A href="/" sx={styles.backBtn}>
					← Liste des devices
				</A>

				<Div sx={headingH1} className="mt-4">
					{_.capitalize(deviceName)} de {user?.name}
				</Div>

				<Div className="d-flex mt-4">
					<Div sx={styles.deviceImgContainer}>
						<Img src={`/${deviceName}.png`} sx={styles.deviceImgAvatar} $powerOn={isPowerOn} />
						<Img src={`/power-off.png`} sx={styles.deviceImgPowerOff} $powerOn={isPowerOn} />
					</Div>

					<Div className="flex-fill ps-3">
						{isDataAvailable && (
							<Div className="mt-2 mb-4">
								<Div sx={styles.switchContainer}>
									<Form.Check
										id="power"
										type="switch"
										label={powerState}
										checked={isPowerOn}
										onChange={evt => handleToggleSwitch(evt.target.checked)}
										disabled={isLoadingPower}
									/>
								</Div>
							</Div>
						)}

						<Div sx={styles.deviceOverview}>
							{isDataAvailable && (
								<>
									<Div>
										<Span>Énergie actuelle :</Span> {upToDateDeviceInfo?.currentPower}
									</Div>
									<Div>
										<Span>Consommation totale :</Span> {upToDateDeviceInfo?.totalPowerConsumption}
									</Div>
								</>
							)}
							{!isDataAvailable && (
								<Div>
									<Span>Aucune donnée disponible</Span>
								</Div>
							)}
						</Div>
					</Div>
				</Div>

				{isDataAvailable && (
					<>
						<Div sx={heading} className="mt-5">
							Historique
						</Div>
						<Div className="mt-4">
							{historyRows.map((row, index) => (
								<Div key={index} className="mb-3">
									<Span sx={styles.rowDate}>
										{new Date(row.createdAt).toLocaleDateString('fr-FR', {
											month: 'short',
											day: 'numeric',
										})}
									</Span>{' '}
									—{' '}
									<Span sx={styles.rowDate}>
										{new Date(row.createdAt).toLocaleTimeString('fr-FR', {
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										})}
									</Span>
									<br />
									<Span>
										<b>{row.state}</b>
									</Span>{' '}
									/ <Span>Énergie : {row.currentPower}</Span> /{' '}
									<Span>Consommation totale : {row.totalPowerConsumption}</Span>
								</Div>
							))}
						</Div>
					</>
				)}
			</Div>
		</Layout>
	);
}
