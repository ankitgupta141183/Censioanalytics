import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import SettingProfile from "../../Profile/SettingProfile"
import Demographics from '../../Profile/Demographics'
const ProfilTab = ({ formData, setFormData, avatarPath, setName,setOpen ,setUserName , getUserDetail , profileImage}) => {
    const [openedTab, setOpenedTab] = useState('Settings')
    const panes = [
        { menuItem: 'Settings' },
        { menuItem: 'Demographics' },
    ]
    const opentab = (e) => {
        setOpenedTab(e.target.text)
    }
    return (<>
        <Tab panes={panes} renderActiveOnly={false} onClick={(e) => opentab(e)}
        />
        {openedTab === 'Settings' ?
            <SettingProfile formData={formData} setFormData={setFormData} avatarPath={avatarPath} setName={setName} setOpen={setOpen} setUserName={setUserName} getUserDetail={getUserDetail}/>
            :
            <Demographics formData={formData} setFormData={setFormData} avatarPath={avatarPath} setOpen={setOpen} setUserName={setUserName}/>
        }
    </>)
}
export default ProfilTab
