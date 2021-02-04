import React from 'react'
import {Form, Input, SubmitButton} from 'formik-antd'
import {Formik} from 'formik'


// @ts-ignore
export const AddPostForm: any = (props): any => {
    const submit: any = (values: any, actions: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.onSubmit(values)
        actions.setSubmitting(false)
        actions.resetForm({values: ''})
    }


    //
    return (
        <Formik
            onSubmit={submit}
            initialValues={{post: ''}}>
            {({isSubmitting}) => (
                <Form style={{display: 'flex'}}>
                    <Input.TextArea rows={4} name='newPostText' placeholder='Post'
                                    style={{background: 'none', resize: 'none', marginBottom: 10}}/>
                    {/*@ts-ignore*/}
                    <SubmitButton disabled={isSubmitting} style={{height: 98, wordWrap: 'break-word'}}>
                        Add Post
                    </SubmitButton>
                </Form>
            )}
        </Formik>


        // <form onSubmit={props.handleSubmit} className={s.input}>
        //     {createField<AddPostFormValuesKeysType>('Enter your post', "newPostText", [required, maxLength100], Textarea, "")}
        //     <button className={s.button}>
        //         Add post
        //     </button>
        // </form>
    )
}
// export const AddPostReduxForm = reduxForm<AddPostValuesType, PropsType>({form: 'AddPost'})(AddPostForm)