import React from 'react'
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/formsControls";
import {required} from "../../Utils/Validators/validators";
import s from "./login.module.css";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../common/FormsControls/formsControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (

        <form onSubmit={handleSubmit} >

                {createField('eEmail', "email", [required],Input, "email" )}
                {createField('Password', "password", [required],Input, "password" )}
                {createField(null, "rememberMe", [],Input, "checkbox", "Remember Me" )}

            {error &&
            <div className={style.formError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
)
}
const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div className={s.body}>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)