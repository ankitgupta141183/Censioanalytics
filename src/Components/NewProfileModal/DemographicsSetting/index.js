import { Form } from "semantic-ui-react"

import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions"
const DemographicsSetting = (props) => {
    const { formData, handleInputChange } = props
    return (
        <div>
         
            <div className="profile-popup-page-form h-100 demographics-header">
                <div style={{ width: "100%", margin: "auto" }}>

                    <Form.Group widths='equal'>

                    </Form.Group>
                    <Form.Group widths="equal">
                        <div className='field'>
                            <label >Gender <span style={{ color: "red" }}>*</span></label>
                            <select
                                name="gender"
                                id="gender"
                                required
                                placeholder="Select Gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                style={{ marginBottom: 8 }}
                                >
                                {ProfileOptions.genderOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}

                            </select>
                        </div>

                        <div className='field'>
                            <label>Year of birth<span style={{ color: "red" }}>*</span></label>
                            <select
                                name="year_of_birth"
                                id="age"
                                required placeholder="Select year"
                                value={formData.year_of_birth}
                                onChange={handleInputChange}
                                style={{ marginBottom: 8 }}
                            >
                                <option value={""}>Select</option>
                                {ProfileOptions.Yearofbirthoption.map(year => {
                                    return <option key={year} value={year}>{year}</option>
                                })}

                            </select>

                        </div>
                        <div className='field'>
                            <label htmlFor="">Race <span style={{ color: "red" }}>*</span></label>
                            <select
                                name="Race"
                                id="Race"
                                required
                                placeholder="Select Race"
                                value={formData.Race}
                                onChange={handleInputChange}
                                style={{ marginBottom: 8 }}
                            >
                                {ProfileOptions.raceOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Zip Code <span style={{ color: "red" }}>*</span></label>
                            <input placeholder='Zip Code'
                                onChange={(e) => handleInputChange(e, "onlyNumber")}
                                value={formData.Zip_Code}
                                name="Zip_Code"
                                selection={"true"}
                                style={{ marginBottom: 8 }}
                                required />

                        </div>
                        <div className='field'>
                            <label htmlFor=""  >Were you born in the US?
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                name="born_usa"
                                id="born_usa" placeholder=""
                                onChange={handleInputChange}
                                value={formData.born_usa}
                                style={{ marginBottom: 8 }}
                                required
                            >
                                {ProfileOptions.bornOption.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="">Enrollment Status <span style={{ color: "red" }}>*</span></label>
                            <select
                                name="Enrollment"
                                id="Enrollment"
                                placeholder="Select Enrolment"
                                onChange={handleInputChange}
                                value={formData.Enrollment}
                                style={{ marginBottom: 8 }}
                                required
                            >
                                {ProfileOptions.enrolmentOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Work Status<span style={{ color: "red" }}>*</span></label>
                            <select
                                placeholder='Select Job'
                                // fluid
                                // search
                                onChange={handleInputChange}
                                value={formData.Job}
                                name="Job"
                                selection={"true"}
                                style={{ marginBottom: 8 }}
                                options={ProfileOptions.jobOptions}
                                required
                            >
                                {ProfileOptions.jobOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>

                        <div className='field'>
                            <label htmlFor="">Business Ownership <span style={{ color: "red" }}>*</span></label>
                            <select placeholder='Business Ownership'
                                // fluid
                                // search
                                onChange={handleInputChange}
                                value={formData.Own_Business}
                                name="Own_Business"
                                selection={"true"}
                                style={{ marginBottom: 8 }}
                                options={ProfileOptions.isBusiness}
                                required
                            >
                                {ProfileOptions.isBusiness.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="">Mother's Education <span style={{ color: "red" }}>*</span></label>
                            <select placeholder="Mother's Education"
                                // fluid
                                // search

                                onChange={handleInputChange}
                                value={formData.Mother_Education_Level}
                                name="Mother_Education_Level"
                                selection={"true"}
                                style={{ marginBottom: 8 }}
                                required>

                                {ProfileOptions.eduOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>

                        </div>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className='field'>
                            <label htmlFor="">Father's Education <span style={{ color: "red" }}>*</span></label>
                            <select placeholder="Father's Education"
                                // fluid
                                // search
                                onChange={handleInputChange}
                                value={formData.Father_Education_Level}
                                name="Father_Education_Level"
                                selection={"true"}
                                style={{ marginBottom: 8 }}
                                options={ProfileOptions.eduOptions}
                                required>

                                {ProfileOptions.eduOptions.map((option) => {
                                    return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                })}
                            </select>
                        </div>
                        <div className='field'></div>
                        <div className='field'></div>
                    </Form.Group >
                </div>
                <div style={{ width: '70%', margin: '0 auto 0 auto', textAlign: 'center' }}>

                </div>

            </div>

        </div>
    )
}

export default DemographicsSetting