import React from 'react'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Input} from '../common/FormsControls/formsControls'
import {required} from '../../Utils/Validators/validators'
import s from './login.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../Redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import style from '../common/FormsControls/formsControls.module.css'
import {AppStateType} from '../../Redux/redux-store'

//TypeScript
type OwnProps = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    email: string
    password: string
}

type LoginFormValuesKeys = GetStringKeys<LoginFormValuesType>


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnProps> & OwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (

        <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesKeys>('eEmail', "email", [required], Input, "email")}
            {createField<LoginFormValuesKeys>('Password', "password", [required], Input, "password")}
            {createField<LoginFormValuesKeys>(undefined, "rememberMe", [], Input, "checkbox", "Remember Me")}

            {captchaUrl && <img alt={"captcha"} src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormValuesKeys>("Symbols from image", "captcha", [required], Input, "")}
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
const LoginReduxForm = reduxForm<LoginFormValuesType, OwnProps>({form: 'login'})(LoginForm)

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div className={s.body}>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

