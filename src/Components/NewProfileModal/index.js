import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Grid, Header, Icon, Image, Tab } from "semantic-ui-react"
// import userImage from '../../assets//Img/NewProfileImage.png';
// import userImage from '../../assets/Img/NewProfileImage.png';
import userImage from '../../assets/img/NewProfileImage.png';
// import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import ProfileOptions from "../CommonComponent/StaticData/ProfileOptions";
import ValidRegex from "../CommonComponent/ValidRegex";
// import { userUpdateProfile } from "../../Store/Action/ProfileAction";
import { userUpdateProfile } from '../../Actions/ProfileAction'
import "../Register/register.scss";
import "./ProfileModal.scss";
import DemographicsSetting from "./DemographicsSetting";
import GeneralSetting from "./GeneralSetting";



const ProfileModal = (props) => {
    const { open, CloseProfileModal } = props
    const { profileReducer } = useSelector(state => state)
    const profileDetail = profileReducer?.profileDetail?.data?.user
    const userName = profileDetail?.first_name ? profileDetail?.first_name + " " + profileDetail?.last_name : ""
    // const userName = profileDetail?.data?.user?.first_name ? profileDetail?.data?.user?.first_name + " " +  profileDetail?.data?.user?.last_name : ""
    const hiddenFileInput = useRef();
    const panes = [
        { menuItem: 'Settings' },
        { menuItem: 'Demographics' },
    ]
    const [profileImage, setProfileImage] = useState("");
    const [openedTab, setOpenedTab] = useState('Settings')
    const [formData, setFormData] = useState(ProfileOptions.FormFieldValue)
    const dispatch = useDispatch()

    // console.log("MOdal:",profileDetail.data.user)
    useEffect(() => {
        if (open) {
            setProfileImage(profileDetail.user_image)
            const UserDetails = {
                ...formData,
                firstName: formData.firstName || profileDetail.first_name,
                lastName: profileDetail.last_name,
                userName: profileDetail.username ? profileDetail.username : "",
                mobile: profileDetail.mobile,
                city: profileDetail.city,
                state: profileDetail.state,
                Race: profileDetail.race,
                Enrollment: profileDetail.enrollment,
                Job: profileDetail.job,
                Own_Business: profileDetail.own_business,
                Mother_Education_Level: profileDetail.mother_education_level,
                Father_Education_Level: profileDetail.father_education_level,
                Zip_Code: profileDetail.zipcode,
                email: profileDetail.email,
                gender: profileDetail.gender,
                age: profileDetail.age,
                born_usa: profileDetail.born_in_usa,
                year_of_birth: profileDetail.year_of_birth,
                Randomized_ID: profileDetail.random_id,
                profileImage: profileDetail.user_image
            }
            setFormData(UserDetails)
        } else {
            setOpenedTab("Settings")
        }
        // eslint-disable-next-line
    }, [open]);

    const CloseandReset = () => {
        CloseProfileModal()
    }

    const handleUploadImage = (event) => {
        // setAvatarPath(event.target.files[0])
        setFormData({
            ...formData,
            avatarPath: event.target.files[0]
        })
        let reader = new FileReader()
        let file = event.target.files[0]
        reader.onloadend = () => {
            setProfileImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleInputChange = (e, validTextBy) => {
        const { name, value, checked } = e.target;
        const Accept_only_Alphabets = ["firstName", "lastName",]
        const Accept_only_Numbers = ["Randomized_ID", "Zip_Code"]
        if (validTextBy === "onlyAlphabets" && Accept_only_Alphabets.includes(e.target.name)) {
            if (ValidRegex.validateAlphabate.test(value) || value === "") {
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        } else if (validTextBy === "onlyNumber" && Accept_only_Numbers.includes(e.target.name)) {
            if (ValidRegex.validdateNumber.test(value) || value === "") {
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        } else if (name === "isChecked") {
            setFormData({
                ...formData,
                [name]: checked
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }



    const doUserProfileUpdate = (e) => {
        e.preventDefault();

        let user = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            username: formData.userName,
            gender: formData.gender,
            avatar: formData.avatarPath || "",
            race: formData.Race,
            enrollment: formData.Enrollment,
            job: formData.Job,
            own_business: formData.Own_Business,
            mother_education_level: formData.Mother_Education_Level,
            father_education_level: formData.Father_Education_Level,
            zipcode: formData.Zip_Code,
            born_in_usa: formData.born_usa,
            year_of_birth: formData.year_of_birth
        };
        var form_data = new FormData();
        for (var key in user) {
            form_data.append(`user[${key}]`, user[key])
        }
        dispatch(userUpdateProfile(form_data, profileDetail.uuid))
    }
    return (
        open &&
        <Card
            size='tiny'
            className='profile-popup'
            style={{ marginRight: `${profileDetail?.udc_user ? "2rem" : ""}` }}
        >
            <Card.Content>
                <div className="">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} mobile={16} className='text-center'>
                                <Image
                                    className="image-user profile-popup-img"
                                    src={profileImage || userImage}
                                />
                            </Grid.Column>
                            <Grid.Column computer={12} mobile={16} >
                                <p>
                                    {userName}
                                </p>
                                <Button type="button" onClick={() => hiddenFileInput.current.click()} className="edit-button"><Icon name='camera' /> Upload Profile Photo</Button>
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    id="file-input"
                                    name="avatarPath"
                                    accept="image/jpeg,image/jpg"
                                    onChange={handleUploadImage}
                                    style={{ display: 'none' }}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Card.Content>
            <Button onClick={() => CloseandReset()} className='profile-popup-close-btn'>
                <Icon name='close' />
            </Button>
            <Card.Description >
                <Header >
                    <Tab panes={panes} renderActiveOnly={false} onClick={(e) => setOpenedTab(e.target.text)} />
                    <div className="" >
                        <Grid className='h-100'>
                            <Grid.Row >
                                <Grid.Column className='modal-padding-align' width={16}>
                                    <div className="main-content h-100">
                                        <div className='h-100'>
                                            <Grid className='h-100 '>
                                                <Grid.Row className='vt-align-center '>
                                                    <Grid.Column className="modal-padding-align" computer={16} mobile={16} tablet={16}>
                                                        <Form className='' onSubmit={(e) => doUserProfileUpdate(e)}>
                                                            <Grid>

                                                                <Grid.Row className='vt-align-center'>

                                                                    <Grid.Column className="modal-padding-align h-100" computer={16} mobile={16} tablet={16} >
                                                                        {
                                                                            openedTab === "Settings" ? <GeneralSetting formData={formData} handleInputChange={handleInputChange} />
                                                                                : <DemographicsSetting className='demographics-header' formData={formData} handleInputChange={handleInputChange} />
                                                                        }

                                                                    </Grid.Column>
                                                                </Grid.Row>

                                                            </Grid>
                                                            <Grid.Column computer={16} mobile={16} tablet={16}>
                                                                <div style={{ width: '100%', textAlign: 'center', padding: '0 0 0px 0' }}>
                                                                    <Button
                                                                        className="next-button profile-btn mt-16"
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                </div>
                                                            </Grid.Column>
                                                        </Form>
                                                    </Grid.Column>

                                                </Grid.Row>
                                            </Grid>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    {/* <ProfilTab formData={formData} setFormData={setFormData} avatarPath={avatarPath} setOpen={setOpen} setUserName={setUserName} getUserDetail={getUserDetail} profileImage={profileImage} /> */}
                </Header>
            </Card.Description>


        </Card>
    )
}

export default ProfileModal