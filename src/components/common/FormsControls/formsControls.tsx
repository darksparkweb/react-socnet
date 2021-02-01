import React from "react";
import s from "./formsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../Utils/Validators/validators";

//TypeScript
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    //const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} className={s.textArea}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    //const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} className={s.input}/></FormControl>
}


export function createField<FormKeysType extends string> (placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            type: string,
                            text = ""
){
    return <div>
        <Field
            placeholder={placeholder}
            component={component}
            name={name}
            validate={validators}
            type={type}
        />{text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>