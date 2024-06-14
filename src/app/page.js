'use client';

import { css } from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Div, Img, Span } from './components/base';

import Layout from './components/Layout';
import { JWT_ID } from './clients/AuthClient';
import { headingH1 } from '@/styles/placeholders/heading';
import { colors, fonts } from '@/styles/settings/variables';
import { fromBreakpoint } from '@/styles/settings/mixins';

const styles = {
	title: css`
		${headingH1}
		margin-bottom: 50px;
	`,
	deviceBtn: css`
		display: block;
		width: 100%;
		margin: 0 auto 20px;
		padding: 15px 0;
		border: none;
		border-radius: 0;
		box-shadow: 7px 6px 0px ${colors.primaryShades[2]};
		background-color: ${colors.primaryTints[1]};

		${fromBreakpoint('md')} {
			width: 250px;
		}
	`,
	deviceImg: css`
		display: block;
		height: 120px;
		margin: 20px auto 0;
	`,
	deviceName: css`
		padding: 0 10px;
		font-family: ${fonts.heading};
		background-color: white;
	`,
};

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem(JWT_ID)) {
			router.replace(`/auth`);
			return;
		}
	}, []);

	return (
		<Layout>
			<Div className="px-2 px-sm-4">
				<Div sx={styles.title} className="text-center">
					Mes Devices
				</Div>
				<Div className="row">
					<Div className="col">
						<Button onClick={() => router.replace('/device?name=plug')} sx={styles.deviceBtn}>
							<Span sx={styles.deviceName}>Plug</Span>
							<Img src="/plug.png" sx={styles.deviceImg} />
						</Button>
					</Div>
					<Div className="col">
						<Button onClick={() => router.replace('/device?name=camera')} sx={styles.deviceBtn}>
							<Span sx={styles.deviceName}>Camera</Span>
							<Img src="/camera.png" sx={styles.deviceImg} />
						</Button>
					</Div>
				</Div>
			</Div>
		</Layout>
	);
}
