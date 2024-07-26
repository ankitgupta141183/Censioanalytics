import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Container,Icon, Menu, Sidebar, } from "semantic-ui-react";
import './register.scss';
import { useHistory } from "react-router-dom";
import censioLogo from '../../assets/img/censio_logo.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { useSelector } from "react-redux";

export default function HeaderRegister({ handleRegisterTrue = () => { } }, isSetOpenSignupPage) {
    const history = useHistory();
    const [visible, setVisible] = React.useState(false)
  

    // const SIGNATURE_EXPIRED = useSelector((state) => state.authReducer.SIGNATURE_EXPIRED)
    useEffect(() => {
        let email = sessionStorage.getItem("email");
        let isLogin = sessionStorage.getItem("isLogin");
        if (email && isLogin) {
            // history.push(Paths.Dashboard);
        }
    }, []) /* eslint-disable-line*/

    const handleLogin = (type) => {
        history.push({ pathname: '/login', state: { login_type: type } })
    }

    const handleRegister = (type) => {
        history.push({ pathname: "/register", state: { udc_user: type === "UDC" } })
        handleRegisterTrue(!isSetOpenSignupPage)
    }

   
    
    return (
        <div className="login-header-seperate">
            <Container>
                <div className="header-logobefore-login">
                    <Grid>
                        <Grid.Row >
                            <Grid.Column computer={3} tablet={3} mobile={8} className="vt-center">
                                <div>
                                    <LazyLoadImage src={censioLogo} onClick={() => history.push("/")} className="image-logo-censio-before-login w-100" />
                                </div>
                            </Grid.Column>
                            {/* <Grid.Column computer={5} tablet={2} mobile={2} className="menus-header-login vt-center">
                                <List horizontal className="nav-login-header">
                                </List>
                            </Grid.Column> */}

                            <Grid.Column computer={0} tablet={6} mobile={6} className="mobile-nav desktop-hide" >
                            
                            {
                                 !visible &&  <Icon name='list icon' className="toggle-icon" onClick={(e, data) => setVisible(!visible)} size='large' />
                              
                            }
                        
                              
                                <Grid.Column>
                                <Sidebar
                                onHide={() => setVisible(false)}
                                            as={Menu}
                                            animation='overlay'
                                            direction='left'
                                            inverted
                                            vertical
                                            visible={visible}
                                        >
                                            <Menu.Item as='a' onClick={(e, data) => setVisible(false)}>
                                            <i  
                                            class="close icon"></i>
                                            </Menu.Item>
                                            <Menu.Item onClick={() => handleLogin("Assessment")}><Icon name="home" className="float-none" />Login</Menu.Item>
                                            <Menu.Item onClick={() => handleRegister("Assessment")}><Icon name="signup" className="float-none" />Create New Account</Menu.Item>
                                           
                                        </Sidebar>
                                   
                                </Grid.Column>

                            </Grid.Column>
                            <Grid.Column computer={13} tablet={13} mobile={10} className="align-verticle__center text-right sm-hide" style={{ display: 'flex', justifyContent: 'right' }}>
                                {/* <Button className="login-account-btn UDC_btn" onClick={() => handleLogin("UDC")}>
                                    UDC Login
                                </Button> */}
                                {/* <Button className="login-account-btn UDC_btn" onClick={()=>handleRegister("UDC")}>
                                    Create New UDC Account
                                </Button> */}
                                <Button className="login-account-btn" onClick={() => handleLogin("Assessment")}>
                                    Login
                                </Button>

                                <Button className="login-account-btn" onClick={() => handleRegister("Assessment")}>
                                    Create New Account
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
                   
        </div>
    );
}
