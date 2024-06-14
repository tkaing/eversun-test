import _ from 'lodash';
import { css } from 'styled-components';

import { Button, Div, Modal, ModalBody } from './base';

import { button } from '@/styles/placeholders/button';
import { heading } from '@/styles/placeholders/heading';
import { fromBreakpoint } from '@/styles/settings/mixins';
import { colors, fonts, rounded } from '@/styles/settings/variables';

const styles = {
    modal: css`
        & .modal-content {
            border-radius: ${rounded.modal};

            & .modal-body,
            & .modal-body:not(.same-as-front) {
                padding: 0 !important;
            }
        }
    `,
    body: css`
        padding: 25px 25px 30px;
        font-family: ${fonts.body};

        ${fromBreakpoint('sm')} {
            padding: 25px 25px 30px;
        }
        ${fromBreakpoint('lg')} {
            padding: 35px 50px 40px;
        }
    `,
    close: css`
        ${button}
        position: absolute;
        top: 15px;
        right: 20px;
        z-index: 1;
        font-size: 25px;
    `,
    heading: css`
        ${heading}
        color: ${colors.primary};
        margin-bottom: 20px;
    `
};

export default function AppModal({ id, open, onClose, heading, children, allowClickAway = true }) {
    return (
        <Modal sx={styles.modal} id={id} size="lg" show={open} onHide={allowClickAway ? onClose : undefined}>
            <Button sx={styles.close} type="button" className="close" data-dismiss="modal" onClick={onClose} $neutral>
                &times;
            </Button>

            <ModalBody>
                <Div sx={styles.body} className="m-0">
                    {/* --- Heading --- */}
                    <div className="row">
                        <div className="col-md-12">
                            <Div sx={styles.heading}>{_.capitalize(heading)}</Div>
                        </div>
                    </div>

                    {children}
                </Div>
            </ModalBody>
        </Modal>
    );
}
