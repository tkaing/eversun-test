import { css } from 'styled-components';

import { Div, H1 } from './base';
import { heading } from '@/styles/placeholders/heading';
import { fromBreakpoint } from '@/styles/settings/mixins';

const styles = {
	root: css`
		flex: 1;
		display: flex;
		align-items: center;
	`,
	heading: css`
		${heading};
		flex: 1;
		overflow: auto;
		font-size: 18px;
		line-height: 30px;

		${fromBreakpoint('sm')} {
			font-size: 25px;
			line-height: 40px;
		}

		${fromBreakpoint('md')} {
			font-size: 30px;
		}
	`,
};

export default function PageTitle({ children }) {
	return (
		<Div sx={styles.root}>
			<H1 sx={styles.heading}>{children}</H1>
		</Div>
	);
}
