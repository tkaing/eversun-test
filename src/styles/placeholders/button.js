import { css } from 'styled-components';
import { transition } from '../settings/mixins';
import { colors, fontSize, fontWeight, fonts, letterSpacing } from '../settings/variables';

const sizes = {
	sm: css`
		padding: 3px 12px;
		font-size: 12px;
	`,
};

const variants = {
	bold: css`
		font-weight: ${fontWeight.bold};
	`,
	loading: css`
		cursor: not-allowed;
		opacity: 0.7;
	`,
	outline: css`
		color: ${colors.primary};
		border-color: ${colors.primary};
		background-color: ${colors.white};

		&:hover,
		&:focus {
			color: ${colors.primary};
			border-color: ${colors.primary};
			background-color: ${colors.white};
			text-decoration: underline;
		}
	`,
	neutral: css`
		padding: 5px;
		color: black;
		border: none;
		background-color: transparent;

		&:hover,
		&:focus {
			color: black;
			border: none;
			background-color: transparent;
		}
	`,
};

export const button = css`
	${transition()}

	appearance: none;
	font-family: ${fonts.body};
	background-color: ${colors.primary};
	display: inline-block;
	padding: 10px 22px;
	border: 1px solid ${colors.primary};
	color: ${colors.white};
	font-size: ${fontSize.btn};
	text-decoration: none;
	letter-spacing: ${letterSpacing.button};
	cursor: pointer;

	&:hover {
		color: ${colors.white};
		border-color: ${colors.primary};
		background-color: ${colors.primary};
	}

	&:disabled {
		${variants.loading}
	}

	// sizes
	${props => sizes[props.$size]}

	// variants
    ${props => props.$bold && variants.bold}
    ${props => props.$outline && variants.outline}
    ${props => props.$neutral && variants.neutral}
`;
