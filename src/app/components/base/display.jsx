import Link from 'next/link';
import { styled } from 'styled-components';
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PreH1 = forwardRef(({ sx, ...props }, ref) => <h1 ref={ref} {...props} />);
const PreH2 = forwardRef(({ sx, ...props }, ref) => <h2 ref={ref} {...props} />);
const PreH3 = forwardRef(({ sx, ...props }, ref) => <h3 ref={ref} {...props} />);
const PreH4 = forwardRef(({ sx, ...props }, ref) => <h4 ref={ref} {...props} />);

const PreA = forwardRef(({ sx, ...props }, ref) => <Link ref={ref} {...props} />);
const PreSpan = forwardRef(({ sx, ...props }, ref) => <span ref={ref} {...props} />);
const PreIcon = forwardRef(({ sx, ...props }, ref) => <FontAwesomeIcon ref={ref} {...props} />);

export const H1 = styled(PreH1)`
	${props => props.sx}
`;
export const H2 = styled(PreH2)`
	${props => props.sx}
`;
export const H3 = styled(PreH3)`
	${props => props.sx}
`;
export const H4 = styled(PreH4)`
	${props => props.sx}
`;

export const A = styled(PreA)`
	${props => props.sx}
`;
export const Span = styled(PreSpan)`
	${props => props.sx}
`;
export const Icon = styled(PreIcon)`
	${props => props.sx}
`;
