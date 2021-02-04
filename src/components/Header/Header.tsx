import React from 'react'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Layout, Menu, Popover, Row, Space, Tooltip} from 'antd/lib/'
import {HomeOutlined, MessageOutlined, UsergroupAddOutlined, UserOutlined, WechatOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {selectIsAuth, selectUserLogin} from '../../Redux/Selectors/auth-selectors'
import {logout} from '../../Redux/auth-reducer'
import logo from '../../img/logo_hooks.png'
import Title from 'antd/lib/typography/Title';

export type PropsType = {
}

export const AppHeader: React.FC<PropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectUserLogin)
    // const id = useSelector(selectCurrentUserId)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }
    const {Header} = Layout
    const content = (
    <div>
        <p>New Messages(10)</p>
        <p>New Posts(2)</p>
    </div>
    )
    return (
        <Header className='header'>
            <Row justify="space-between">
                <Col span={8}>
                    <Space><img style={{width: 40}} src={logo} alt="Logo"/>
                        <Title level={3} style={{color: "white", margin: 10}}>FriendHook</Title>
                    </Space>
                </Col>
                <Col span={8}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Tooltip title="Profile"><Link to="/profile"><HomeOutlined
                            style={{fontSize: 24, margin: 0}}/></Link></Tooltip></Menu.Item>
                        <Menu.Item key="2"><Tooltip title="Messages"><Link to="/dialogs"><MessageOutlined
                            style={{fontSize: 26, margin: 0}}/></Link></Tooltip></Menu.Item>
                        <Menu.Item key="3"><Tooltip title="Users"><Link to="/users"><UsergroupAddOutlined
                            style={{fontSize: 24, margin: 0}}/></Link></Tooltip></Menu.Item>
                        <Menu.Item key="4"><Tooltip title="General Chat"><Link to="/chat"><WechatOutlined
                            style={{fontSize: 28, margin: 0}}/></Link></Tooltip></Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    {isAuth
                        ? <Space><Popover content={content} title={login}>
                            <Avatar style={{backgroundColor: '#41b4e9', }} icon={<UserOutlined/>}/>
                        </Popover>
                            <Button onClick={logoutCallback} type="primary" danger>Logout</Button></Space>
                        : <Button><Link to={'/login'}>Login</Link></Button>
                    }
                </Col>
            </Row>
        </Header>
    )
}