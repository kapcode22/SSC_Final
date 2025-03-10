import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setValues({
                ...values,
                [name]: files[0]
            });
        } else {
            setValues({
                ...values,
                [name]: value
            });
        }
    };

    return [values, handleChange];
};

export default useForm;
