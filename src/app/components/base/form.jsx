import { forwardRef } from 'react';
import { styled } from 'styled-components';

const PreForm = forwardRef(({ sx, ...props }, ref) => <form ref={ref} {...props} />);

const PreLabel = forwardRef(({ sx, ...props }, ref) => <label ref={ref} {...props} />);

const PreInput = forwardRef(({ sx, ...props }, ref) => <input ref={ref} {...props} />);

const PreButton = forwardRef(({ sx, ...props }, ref) => <button ref={ref} {...props} />);

const PreTextArea = forwardRef(({ sx, ...props }, ref) => <textarea ref={ref} {...props} />);

const PreSelect = forwardRef(({ sx, ...props }, ref) => <select ref={ref} {...props} />);

export const Form = styled(PreForm)`
	${props => props.sx}
`;
export const Label = styled(PreLabel)`
	${props => props.sx}
`;
export const Input = styled(PreInput)`
	${props => props.sx}
`;
export const Button = styled(PreButton)`
	${props => props.sx}
`;
export const TextArea = styled(PreTextArea)`
	${props => props.sx}
`;
export const Select = styled(PreSelect)`
	${props => props.sx}
`;
