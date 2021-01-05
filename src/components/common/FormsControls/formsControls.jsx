import React from "react";
import s from "./formsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            {children}
            {/*{hasError && <span>{error}</span>}*/}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} className={s.textArea}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} className={s.input}/></FormControl>
}

export const createField = (placeholder, name, validators, component, type, text = "") =>
    <div>
        <Field
            placeholder={placeholder}
            component={component}
            name={name}
            validate={validators}
            type={type}
        />{text}
    </div>
