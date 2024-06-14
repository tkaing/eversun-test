import { css } from 'styled-components';
import { fromBreakpoint } from '../settings/mixins';
import { fontSize, fontWeight, fonts, letterSpacing } from '../settings/variables';

export const heading = css`
	margin: 0;
	font-size: ${fontSize.display};
	font-family: ${fonts.heading};
	font-weight: ${fontWeight.bold};
	line-height: 29px;
	letter-spacing: ${letterSpacing.heading};

	${fromBreakpoint('sm')} {
		font-size: ${fontSize.desktop.display};
	}
`;

export const headingH1 = css`
	${heading}
	font-size: 18px;

	${fromBreakpoint('sm')} {
		font-size: 25px;
	}

	${fromBreakpoint('md')} {
		font-size: 30px;
	}
`;
