import { css } from 'styled-components';
import { breakpoints } from './variables';

export const alpha = (hex = '#000000', opacity = 1) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const transition = (prop = 'all', duration = '500ms', type = 'ease', delay = '0ms') => {
    const value = `${prop} ${duration} ${type} ${delay}`;

    return css`
        -webkit-transition: ${value};
        -moz-transition: ${value};
        -o-transition: ${value};
        transition: ${value};
    `;
};

export const fromBreakpoint = (size: keyof typeof breakpoints) => {
    return `@media (min-width: ${breakpoints[size]})`;
};