import { css } from 'styled-components';
import { colors, fontSize, fontWeight } from '../settings/variables';

export const label = css`
    color: ${colors.grey.text.main};
    font-size: ${fontSize.sm};
    font-style: normal;
    font-weight: ${fontWeight.normal};
    line-height: 12px;
`;
