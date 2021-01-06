import React from 'react'
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/formsControls";
import {required} from "../../Utils/Validators/validators";
import s from "./login.module.css";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "../common/FormsControls/formsControls.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (

        <form onSubmit={handleSubmit}>

            {createField('eEmail', "email", [required], Input, "email")}
            {createField('Password', "password", [required], Input, "password")}
            {createField(null, "rememberMe", [], Input, "checkbox", "Remember Me")}

            {captchaUrl && <img alt={"captcha"} src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input)}
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
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div className={s.body}>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)