import { forwardRef } from 'react';
import { styled } from 'styled-components';

const PreDiv = forwardRef(({ sx, ...props }, ref) => <div ref={ref} {...props} />);

const PreHeader = forwardRef(({ sx, ...props }, ref) => <header ref={ref} {...props} />);

const PreMain = forwardRef(({ sx, ...props }, ref) => <main ref={ref} {...props} />);

const PreImg = forwardRef(({ sx, ...props }, ref) => <img ref={ref} {...props} />);

const PreSvg = forwardRef(({ sx, ...props }, ref) => <svg ref={ref} {...props} />);

const PreNav = forwardRef(({ sx, ...props }, ref) => <nav ref={ref} {...props} />);

const PreFooter = forwardRef(({ sx, ...props }, ref) => <footer ref={ref} {...props} />);

export const Div = styled(PreDiv)`
	${props => props.sx}
`;
export const Header = styled(PreHeader)`
	${props => props.sx}
`;
export const Main = styled(PreMain)`
	${props => props.sx}
`;
export const Img = styled(PreImg)`
	${props => props.sx}
`;
export const Svg = styled(PreSvg)`
	${props => props.sx}
`;
export const Nav = styled(PreNav)`
	${props => props.sx}
`;
export const Footer = styled(PreFooter)`
	${props => props.sx}
`;
