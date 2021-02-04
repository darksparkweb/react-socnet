import React from 'react'
import {Form, Input, SubmitButton} from 'formik-antd'
import {Formik} from 'formik'

// const maxLength300 = maxLength(300)
type PropsType = {
    onSubmit: (values: any) => void
}

export const SendMessageForm: React.FC<PropsType> = (props) => {
    const submit: any = (values: any, actions:any) => {
        props.onSubmit(values)
        actions.setSubmitting(false)
        actions.resetForm({values: ''})
    }
    return (
        <Formik
            onSubmit={submit}
            initialValues={{ newMessageText: '' }}>
            {({isSubmitting}) => (
                <Form style={{display: 'flex'}}>
                    <Input.TextArea rows={4} name='newMessageText' placeholder='Message' style={{background: 'none', resize: 'none', marginBottom: 10}}/>
                    <SubmitButton disabled={isSubmitting} style={{height: 98,  wordWrap: 'break-word'}}>
                        Send Message
                    </SubmitButton>
                </Form>
            )}
        </Formik>

        // <form onSubmit={props.handleSubmit} className={s.input}>
        //     {createField<NewMessageFormKeysType>('enter your message here...', "newMessageText", [required, maxLength300], Textarea, "")}
        //
        //     <button className={s.button}>
        //         Send
        //     </button>
        // </form>
    )
}
