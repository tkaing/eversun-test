import { css } from 'styled-components';
import { colors, fontSize, fontWeight, fonts } from '../settings/variables';

export const whiteField = css`
    height: 32px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid ${colors.grey.whiteField.border};
    background-color: ${colors.white};
    box-sizing: border-box;
    text-align: left;
    color: rgba(0,0,0,0.8);
    font-family: ${fonts.body};

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const fieldError = css`
    display: block;
    color: ${colors.red};
    font-size: ${fontSize.display};
    font-weight: ${fontWeight.bold};
`;