import { forwardRef } from 'react';
import styled from 'styled-components';
import { Modal as BsModal } from 'react-bootstrap';

const PreModal = forwardRef(({ sx, ...props }, ref) => <BsModal ref={ref} {...props} />);

const PreModalBody = forwardRef(({ sx, ...props }, ref) => <BsModal.Body ref={ref} {...props} />);

export const Modal = styled(PreModal)`
	${props => props.sx}
`;
export const ModalBody = styled(PreModalBody)`
	${props => props.sx}
`;