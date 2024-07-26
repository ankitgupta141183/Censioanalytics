import React, { useEffect, useState } from "react"
import './_UpgradeDemographicsQuestions.scss'
import Arrow from '../../../assets/upgrade-images/Arrow.svg'
import { useSelector, useDispatch } from "react-redux"
import { Paths } from "../../routes/routePaths";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllDemographicsQuestions, submitDemographicsQuestions } from '../../../Services/UpgradeSurveyQuestionsServices/UpgradeSurveyQuestionsServices'
import { showNotification } from "../../../Actions/componentActions";
import Loader from "../../CommonComponent/Loader/Loader";

const UpgradeDemographicsQuestions = () => {
  const { profileReducer } = useSelector(state => state)
  const profileDetail = profileReducer?.profileDetail?.data?.user
  const [demograpgicsQuestions, setDemograpgicsQuestions] = useState([])
  const [formData, setFormData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    getDemoGraphicsQuestions()
    // eslint-disable-next-line
  }, [])

  const getDemoGraphicsQuestions = async () => {
    setIsLoading(true)
    const questionsOptions = await fetchAllDemographicsQuestions()
    if (questionsOptions.status === 200 && questionsOptions.data.status !== 422) {

      if (questionsOptions?.data?.filled_demographic) {
        history.push(Paths.upgradeSurveyQuestions)
      }

      setDemograpgicsQuestions(questionsOptions?.data?.questions)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      dispatch(showNotification(true, questionsOptions?.data ? questionsOptions?.data?.message : questionsOptions.error.response.data.error ? questionsOptions?.error?.response?.data.error : "Somthing went wrong."))
    }

  }


  const handleInputChange = (e, questions) => {
    const { value, id } = e.target;
    // findUpdateOnchange(questions?.que_id)
    let optionId = questions.options.filter((items) => items.label === value)
    console.log("id", typeof id)
    let submitObj = {
      survey_question_id: questions.que_id,
      question_label: questions.question_label,
      selected_response: [value],
      user_id: profileDetail?.id ? profileDetail?.id : "",
      selected_option_number: optionId[0].id
    }
    if (formData.length === 0) {
      setFormData([...formData, submitObj])
    } else {
      let inInclude = formData.filter(data => data.survey_question_id === parseInt(id))
      if (inInclude.length > 0) {
        let editData = formData.map(data => data.survey_question_id === parseInt(id) ? { ...submitObj } : data)
        setFormData(editData)
      } else {
        setFormData([...formData, submitObj])
      }
    }

  }


  const handleOnSubmitData = async (e) => {
    e.preventDefault()

    let submitResponse = await submitDemographicsQuestions(formData)
    if (submitResponse.status === 200 && submitResponse.data.status !== 422) {
      history.push(Paths.upgradeSurveyQuestions)

    } else {
      dispatch(showNotification(true, submitResponse?.data ? submitResponse?.data?.message : submitResponse.error.response.data.error ? submitResponse?.error?.response?.data.error : "Somthing went wrong."))
    }
  }


  return (
    <>
      <main
        className="max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
      >
        <div
          id="main_section"
          className="flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"
        >

          <div className="pt-2">
            <span className="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]">Select the following options listed below.</span>
          </div>
          <div
            className="bg-white px-4 py-7 rounded-2xl dark:bg-[#212121] transition-all duration-300"
          >
            <form
              className="flex flex-col gap-6"
              action=""
              id="settingForm"
              name="settingForm"
              onSubmit={(e) => { handleOnSubmitData(e) }}

            >
              <div
                className="input_group grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2"
              >


                {
                  demograpgicsQuestions.length > 0 && demograpgicsQuestions instanceof Array && !isLoading ?
                    demograpgicsQuestions.map((questions, index) => {

                      return (
                        <>
                          <div className="relative z-0 w-full group">
                            <label
                              for="student"
                              className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5] line-clamp-1"
                            >
                              {questions?.question_label}
                            </label>
                            <select
                              // name={questions.que_id}
                              id={questions?.que_id}
                              required
                              placeholder="Select cummunity"
                              // value={questions.que_id}
                              onChange={(e) => { handleInputChange(e, questions) }}
                              className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                            >
                              <option value="">Select</option>
                              {questions?.options && questions.options.map((option, optionsIndex) => {
                                return <option key={optionsIndex} value={option.label === 'Select' ? '' : option?.label}>{option.label}</option>
                              })}
                            </select>
                            <div className="downArrow absolute top-[30%] right-3">
                              <img
                                className="dark:invert"
                                src={Arrow}
                                alt="Arrow"
                              />
                            </div>
                          </div>
                        </>
                      )
                    })
                    :
                    <>
                      {isLoading && <Loader />}
                    </>

                }


                {/* --------------------------------------------------------------------------------------- */}
                {/* <div className="relative z-0 w-full group">
                                    <label
                                        for="student"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5] whitespace-nowrap"
                                    >
                                        Are you a Community College or Van Ness student?
                                    </label>
                                    <select
                                        name="cummunity"
                                        id="cummunity"
                                        required
                                        placeholder="Select cummunity"
                                        value={formData.cummunity}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.cummunityOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="yearOfBirth"
                                        className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5] whitespace-nowrap"
                                    >
                                        Are you a part-time or full-time student?
                                    </label>
                                    <select
                                        name="fullTime"
                                        id="fullTime"
                                        required
                                        placeholder="Select fullTime part time."
                                        value={formData.fullTime}
                                        onChange={handleInputChange}
                                        className=" bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.fullTimeOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}

                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="race"
                                        className="whitespace-nowrap text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Are you an undergraduate or graduate student?
                                    </label>
                                    <select
                                        name="underGraduate"
                                        id="underGraduate"
                                        required
                                        placeholder="Select underGraduate or not."
                                        value={formData.underGraduate}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.underGraduateOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>



                                <div className="relative z-0 w-full group">
                                    <label
                                        for="born"
                                        className="whitespace-nowrap text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-4 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Are you an international student?
                                    </label>
                                    <select
                                        name="interational"
                                        id="interational"
                                        required
                                        placeholder="Select interational options."
                                        value={formData.interational}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.interationalOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="enrollmentStatus"
                                        className="whitespace-nowrap text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Are you the first person in your immediate family to attend college?
                                    </label>
                                    <select
                                        name="immediateFamily"
                                        id="immediateFamily"
                                        required
                                        placeholder="Select interational options."
                                        value={formData.immediateFamily}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.immediateFamilyOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="workStatus"
                                        className="whitespace-nowrap text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        Are you an honors student?
                                    </label>
                                    <select
                                        name="honors"
                                        id="honors"
                                        required
                                        placeholder="Select honors student."
                                        value={formData.honors}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"

                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.honorsOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <label
                                        for="businessOwnership"
                                        className="whitespace-nowrap text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5]"
                                    >
                                        What do you expect your GPA to be at the end of this semester?
                                    </label>
                                    <select
                                        name="Gpa"
                                        id="Gpa"
                                        required
                                        placeholder="Select semester Gpa."
                                        value={formData.Gpa}
                                        onChange={handleInputChange}
                                        className="bg-white text-black border py-4 px-3 border-[#0000003B] text-[#92929D] rounded-lg appearance-none block w-full transition-all duration-300 dark:bg-[#212121] dark:border-[#F5F5F5] dark:text-white outline-none disabled:bg-[#F5F5F5] disabled:bg-[#F5F5F5]"
                                    >
                                        <option value="">Select</option>
                                        {DemographicOptions.GpaOptions.map((option) => {
                                            return <option key={option} value={option === 'Select' ? '' : option}>{option}</option>
                                        })}
                                    </select>
                                    <div className="downArrow absolute top-[30%] right-3">
                                        <img
                                            className="dark:invert"
                                            src={Arrow}
                                            alt="Arrow"
                                        />
                                    </div>
                                </div> */}

                {/* ------------------------------------------------------------------------------------- */}

              </div>

              {
                demograpgicsQuestions.length > 0 && demograpgicsQuestions instanceof Array && !isLoading &&
                <div
                  className="form_submit grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  <button
                    type="submit"
                    // onSubmit={(e)=>{history.push(Paths.upgradeSurveyQuestions)}}
                    className="rounded bg-[#1B75BC] text-[#FFFFFF] py-2"
                  >
                    Next
                  </button>
                </div>
              }


            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default UpgradeDemographicsQuestions