import loader from "../../img/load.svg";
import s from './preloader.module.css'

let Loader = (props) => {
    return <div className={s.loader}><img alt="loader" src={loader}/></div>
}


export default Loader;