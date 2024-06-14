'use client';

import { colors, fonts } from './settings/variables';
import { createGlobalStyle, css } from 'styled-components';

const styles = css`
	body {
		color: ${colors.white};
		margin: 0;
		font-family: ${fonts.body};
		background-color: ${colors.primaryShades[6]};

		& *, & *::before, & *::after {
			box-sizing: border-box;
		}
	}
`;

const GlobalStyles = createGlobalStyle`
	${styles}
`;

export default GlobalStyles;
