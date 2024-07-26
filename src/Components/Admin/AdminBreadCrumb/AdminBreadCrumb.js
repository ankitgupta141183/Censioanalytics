import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Container, Icon } from "semantic-ui-react"
const AdminBreadCrumb = () => {
    const location = useLocation()
    const [breadTagName, setBreadTagName] = useState('HOME')

    useEffect(() => {
        const { pathname } = location
        if (pathname === '/admin') {
            setBreadTagName('')
        }
        else if (pathname === '/reporting/assessment') {
            setBreadTagName('ASSESSMENT REPORTING')
        }
        else if (pathname === '/admin/game_dashboard') {
            setBreadTagName('GAMES DASHBOARD')
        }
        else if (pathname === '/reporting/games') {
            setBreadTagName('GAMES REPORTING')
        }
        else if (pathname === '/recent_registrations') {
            setBreadTagName('NEW REGISTRATIONS')
        }
        else if (pathname === '/researchers') {
            setBreadTagName('RESEARCHERS')
        }
        else if (pathname === '/survey-data') {
            setBreadTagName('SURVEY DATA')
        }
        else {
            setBreadTagName('GAMES DATA')
        }
        // eslint-disable-next-line
    }, [location.pathname])



    return (
        <div id={"udc-breadcrumb"} className={"bg-breadcrumb"} style={{ top: "24px" }}>
            <Container >
                <div className="ui breadcrumb">
                    <Link to={"/admin"} className="section">
                        <Icon name="home" />Home
                    </Link>
                    {
                        location.pathname !== "/admin" && <>
                            <i className="right angle icon divider"></i>
                            <Link to={"#"} className="section">{breadTagName}</Link>
                        </>
                    }
                </div>
            </Container>
        </div>
    )
}

export default AdminBreadCrumb