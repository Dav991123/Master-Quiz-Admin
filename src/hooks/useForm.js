import { useState, useEffect } from 'react';

export const useForm = (initialState, validateData) => {
    const copyInitialState = Object.assign({}, initialState);
    Object.keys(initialState).forEach((key) => {
      copyInitialState[key] = null
    });

    const copyIsValidState = Object.assign({}, validateData);
    Object.keys(validateData).forEach((key) => {
        if(validateData.hasOwnProperty(key)) copyIsValidState[key] = false
    });

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(copyInitialState);
    const [isEnabledData, setIsEnabledData] = useState(copyIsValidState);
    const [isEnable, setIsEnable] = useState(true);

    useEffect(() => {
        const isValidKeys = Object.values(isEnabledData);
        if(isValidKeys.indexOf(false) !== -1) {
            setIsEnable(true)
        }else {
            setIsEnable(false)
        }

    }, [isEnabledData, values]);
    const handleOutsideClick = e => {
        const { name, value } = e.target;
        if(value === '') {
            if(validateData.hasOwnProperty(name)) {
                setErrors({
                    ...errors,
                    [name] : validateData[name].requiredMessage
                })
                setIsEnabledData({
                    ...isEnabledData,
                    [name]: false
                })
            }

            return
        }else {
            setIsEnabledData({
                ...isEnabledData,
                [name]: true
            })
        }
        if(validateData[name].hasOwnProperty('regExp')) {
            if(!validateData[name].regExp.test(value)) {
                setErrors({
                    ...errors,
                    [name] : validateData[name].warningMessage
                })
                setIsEnabledData({
                    ...isEnabledData,
                    [name]: false
                })
            }
            return
        }else {
            setIsEnabledData({
                ...isEnabledData,
                [name]: true
            })
        }
    };
    const onFocus = e => {
        const { name } = e.target;
        setErrors({
            ...errors,
            [name]: ''
        })
    };


    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

        if(value === '') {
            if(validateData.hasOwnProperty(name)) {
                setErrors({
                    ...errors,
                    [name] : validateData[name].requiredMessage
                })
                setIsEnabledData({
                    ...isEnabledData,
                    [name]: false
                })
                return
            }
        }else {
            setIsEnabledData({
                ...isEnabledData,
                [name]: true
            })
            setErrors({
                ...errors,
                [name] : ''
            })
        }
        if(validateData[name]) {
            if(validateData[name].hasOwnProperty('regExp')) {
                if(!validateData[name].regExp.test(value)) {
                    setErrors({
                        ...errors,
                        [name] : validateData[name].warningMessage
                    })
                    setIsEnabledData({
                        ...isEnabledData,
                        [name]: false
                    })
                }else {
                    setErrors({
                        ...errors,
                        [name] : ''
                    })
                }
                return
            }else {
                setIsEnabledData({
                    ...isEnabledData,
                    [name]: true
                })
             
            }
        }
    }

    return {
        errors,
        values,
        onFocus,
        isEnable,
        setValues,
        handleChange,
        handleOutsideClick
    }
}