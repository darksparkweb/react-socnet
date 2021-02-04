import s from "../ProfileInfo.module.css";
import React from "react";
import {
    FacebookOutlined,
    GithubOutlined, IeOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons'

type PropsType = {
    contactTitle: string
    contactValue: string
}
//
const Contacts: React.FC<PropsType> = ({contactTitle, contactValue}) => {
    let icon
    if(contactTitle === 'facebook') {
         icon = <FacebookOutlined />
    }
    if(contactTitle === 'twitter') {
         icon = <TwitterOutlined />
    }
    if(contactTitle === 'github') {
         icon = <GithubOutlined />
    }
    if(contactTitle === 'youtube') {
         icon = <YoutubeOutlined />
    }
    if(contactTitle === 'vk') {
         icon = <IeOutlined />
    }
    if(contactTitle === 'website') {
         icon = <IeOutlined />
    }
    if(contactTitle === 'instagram') {
         icon = <InstagramOutlined />
    }
    if(contactTitle === 'mainLink') {
         icon = <LinkedinOutlined />
    }
    return <div>
        {(contactValue) &&
        <div className={s.text}>


            <a rel="noopener noreferrer" target="_blank"
                                   href={contactValue}>{icon}</a>
        </div>}
    </div>
}

export default Contacts