import { Div, Label, Span } from './base';

import { label } from '@/styles/placeholders/label';
import { fieldError } from '@/styles/placeholders/field';

export default function FormGroup({ sx, error, labelText, children }) {
    return (
        <Div className="app-form-group" sx={sx}>
            {labelText && <Label sx={label}>{labelText}</Label>}
            {children}
            {error && <Span sx={fieldError} className='mt-1'>{error}</Span>}
        </Div>
    );
}
