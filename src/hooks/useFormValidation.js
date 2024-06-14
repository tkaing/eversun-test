import _ from 'lodash';

import { useState, useEffect } from 'react';

const useFormValidation = ({ form, schema = null, refreshValidation = true }) => {
    const [errors, setErrors] = useState({});

    const [hasValidatedOnce, setHasValidatedOnce] = useState(false);

    /**
     * if refreshValidation is true:
     * once the form has been submitted once it tries to validate the form on every change
     */
    useEffect(() => {
        if (refreshValidation && hasValidatedOnce) {
            validateSchema(schema, form, () => {
                setErrors({});
            });
        }
    }, [form]);

    /**
     * if no errors the callback function is called (should be the function that submits the form)
     * @param submit {function}
     */
    const handleSubmit = submit => {
        setHasValidatedOnce(true);
        validateSchema(schema, form, () => submit(form));
    };

    /**
     * this is the validation function, it sets errors or execute callback on success
     * @param schema
     * @param form
     * @param onSuccess
     */
    const validateSchema = (schema, form, onSuccess) => {
        try {
            schema.parse(form);
            onSuccess();
        } catch (e) {
            let errorCount = 0;

            const formValidationError = {};

            for (const issue of e.issues) {
                const path = issue.path;
                const field = path.length === 0 ? 'global' : path.join('.');

                if (!formValidationError[field]) {
                    formValidationError[field] = issue.message;

                    if (!hasValidatedOnce && errorCount++ === 0) {
                        document.getElementsByName(field)[0]?.scrollIntoView();
                    }
                }
            }

            setErrors(formValidationError);
        }
    };

    /**
     * add an error to error object, must be key value pair
     * @param key {string}
     * @param value {any}
     */
    const addError = (key, value) => {
        setErrors(errors => ({ ...errors, [key]: value }));
    };

    /**
     * Removes an error from the error object
     * @param key {string}
     */
    const clearError = key => {
        setErrors(errors => _.omit(errors, key));
    };

    /**
     * Resets the initial state of the validation
     */
    const resetValidation = () => {
        setErrors({});
        setHasValidatedOnce(false);
    };

    return { errors, handleSubmit, addError, clearError, resetValidation };
};

export const addBackErrors = (addError, backErrors) => {
    for (const key in backErrors) {
        addError(key, backErrors[key]);
    }
};

export default useFormValidation;
