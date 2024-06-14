import { css } from 'styled-components';
import { useRouter } from 'next/navigation';

import { Button, Div, Header, Img, Span } from './base';

import PageTitle from './PageTitle';
import { button } from '@/styles/placeholders/button';
import { useApp } from '@/contexts/AppContext';
import { JWT_ID } from '../clients/AuthClient';
import { fromBreakpoint } from '@/styles/settings/mixins';
import { colors, componentSize, containerSize, fontSize } from '@/styles/settings/variables';

const styles = {
	container: css`
		${containerSize.xl};
		position: relative;
	`,
	header: css`
		width: -webkit-fill-available;
		padding: 20px 10px 40px;
		position: fixed;
		z-index: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		background-image: linear-gradient(${colors.primaryShades[6]}, ${colors.primaryShades[6]}, transparent);

		${fromBreakpoint('sm')} {
			padding-right: 20px;
			flex-direction: row;
		}
	`,
	body: css`
		padding-top: ${componentSize.header.heightComputed.mobile};

		${fromBreakpoint('sm')} {
			padding-top: ${componentSize.header.heightComputed.desktop};
		}
	`,
	children: css`
		flex: 1;
		font-size: ${fontSize.base};

		${fromBreakpoint('sm')} {
			font-size: ${fontSize.desktop.base};
		}
	`,
	logoutBtn: css`
		${button}
		color: white;
		align-items: center;

		&:hover,
		&:focus {
			color: white;
			text-decoration: underline;
		}
	`,
	logoutImg: css`
		width: 20px;
		margin-left: 10px;
	`,
};

export default function Layout({ children }) {
	const router = useRouter();

	const {
		states: { user },
	} = useApp();

	const handleSignOut = () => {
		localStorage.removeItem(JWT_ID);
		router.replace(`/auth`);
	};

	return (
		<Div sx={styles.container} className="container-fluid g-0">
			<Header sx={styles.header}>
				<PageTitle>Eversun Test</PageTitle>
				<Button sx={styles.logoutBtn} $neutral onClick={() => handleSignOut()} className="d-flex mt-3 mt-sm-0">
					<Span className="text-end">Se déconnecter<br />({user?.name})</Span>
					<Img src="/log-out.png" sx={styles.logoutImg} />
				</Button>
			</Header>
			<Div sx={styles.body} className="d-flex flex-row">
				<Div sx={styles.children}>{children}</Div>
			</Div>
		</Div>
	);
}
