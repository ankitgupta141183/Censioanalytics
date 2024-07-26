import React, { useEffect, useState } from "react";
import './_GenericDemographicsQuestionList.scss'
// import AssessmentDemographicOptions from './AssessmentDemographicOptions.json'
import Arrow from '../../../assets/upgrade-images/Arrow.svg'
import Loader from "../../CommonComponent/Loader/Loader";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { showNotification } from "../../../Actions/componentActions";
import { Paths } from "../../routes/routePaths";
import { fethcAllGenericDemographic, submitGenericQuestionsDemographics } from '../../../Services/GenericSevices/GenericSevices'

const GenericDemographicsQuestionList = ({ isHeaderManu }) => {
  const { profileReducer } = useSelector(state => state)
  const profileDetail = profileReducer?.profileDetail?.data?.user
  // const [isShowDemographics, setIsShowDemographics] = useState(false)
  // const [demograpgicsQuestions, setDemograpgicsQuestions] = useState(AssessmentDemographicOptions)
  const [demograpgicsQuestions, setDemograpgicsQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState([])
  const history = useHistory();
  const dispatch = useDispatch()


  useEffect(() => {
    getMturkDemoGraphicsQuestions()
    // eslint-disable-next-line 
  }, [])

  const getMturkDemoGraphicsQuestions = async () => {
    setIsLoading(true)
    const questionsOptions = await fethcAllGenericDemographic()
    if (questionsOptions.status === 200 && questionsOptions.data.status !== 422) {
      setDemograpgicsQuestions(questionsOptions ? questionsOptions?.data?.questions : [])
      setIsLoading(false)
    } else {
      setIsLoading(false)
      dispatch(showNotification(true, questionsOptions?.data ? questionsOptions?.data?.message : questionsOptions.error.response.data.error ? questionsOptions?.error?.response?.data.error : "Somthing went wrong."))
    }

  }

  const handleInputChange = (e, questions) => {
    const { value, id } = e.target;
    let optionId = questions.options.filter((items) => items.label === value)
    let getUserId = sessionStorage.getItem('assessmentUserId' || '')
    let submitObj = {
      user_id: profileDetail ? profileDetail?.id : parseInt(getUserId),
      question_label: questions.question_label,
      selected_response: [value],
      answer_text: null,
      generic_question_id: questions.que_id,
      selected_option_number: optionId[0].id
    }
    if (formData.length === 0) {
      setFormData([...formData, submitObj])
    } else {
      let inInclude = formData.filter(data => data.generic_question_id === parseInt(id))
      if (inInclude.length > 0) {
        let editData = formData.map(data => data.generic_question_id === parseInt(id) ? { ...submitObj } : data)
        setFormData(editData)
      } else {
        setFormData([...formData, submitObj])
      }
    }

  }

  const handleOnSubmitData = async (e) => {
    e.preventDefault()
    let groupBypayload = {
      demographics: true
    }
    // let submitResponse = await submitMturkQuestionsDemographics(formData)
    let submitResponse = await submitGenericQuestionsDemographics(formData, groupBypayload)
    if (submitResponse.status === 200 && submitResponse.data.status !== 422) {
      history.push(Paths.GenericQuestionnaire)
    } else {
      dispatch(showNotification(true, submitResponse?.data ? submitResponse?.data?.message : submitResponse.error.response.data.error ? submitResponse?.error?.response?.data.error : "Somthing went wrong."))
    }


  }

  return (
    <>
      <main className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16">
        <div id="main_section" className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] m-auto"
          : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}>
          <div className="pt-2">
            <span className="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]">Select the following options listed below.</span>
          </div>
          <div
            className="bg-white px-4 py-7 rounded-2xl dark:bg-[#212121] transition-all duration-300 text-sm"
          >
            <form
              className="flex flex-col gap-6"
              action=""
              id="settingForm"
              name="settingForm"
              onSubmit={(e) => { handleOnSubmitData(e) }}

            >
              <div
                className="input_group flex flex-wrap"
              >


                {
                  demograpgicsQuestions?.length > 0 && demograpgicsQuestions instanceof Array && !isLoading ?
                    demograpgicsQuestions.map((questions, index) => {

                      return (
                        questions.ques_type === 'radio' ?
                          <>
                            <div className="relative z-0 max-w-[100%] flex-[100%] px-2 py-2 group mb-5">
                              <table className="w-100 px-2 table-auto border-separate border-spacing-2 border rounded-lg border-[#0000003B] text-sm" cellpadding="3">
                                <thead>
                                  <tr>
                                    <td className="w-[100%]" colSpan="4">
                                      <div className="mb-2 font-medium">{questions?.question_label}</div>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {questions?.options && questions.options.map((option, optionsIndex) => {
                                      return <>
                                        <td className="w-[20%] text-center align-baseline">
                                          <label>{option.label}</label><br />
                                          <input type='radio'
                                            name={questions.que_id}
                                            value={option.label}
                                            key={optionsIndex}
                                            id={questions?.que_id}
                                            onChange={(e) => { handleInputChange(e, questions) }}
                                          />
                                        </td>
                                      </>

                                    })}

                                  </tr>
                                  <br />
                                  {/* <tr>
                                    <td className="w-25">
                                      q <br/> andbadb
                                    </td>
                                    <td className="w-25">
                                      q
                                    </td>
                                    <td className="w-25">
                                      q
                                    </td>
                                    <td className="w-25">
                                    q <br/> andbadb
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                              {/* <>
                                <label
                                  for="student"
                                  className="text-[#92929D] text-black dark:text-gray-300 absolute px-1 transition-all duration-300 -top-[16%] left-3 w-auto text-[#00000099] text-sm bg-white dark:bg-[#212121] dark:text-[#F5F5F5] line-clamp-1"
                                >

                                  {questions?.question_label}
                                </label>
                                {questions?.options && questions.options.map((option, optionsIndex) => {
                                  return <>
                                    <label>{option.label}</label>
                                    <input type='radio'
                                      name={questions.que_id}
                                      value={option.label}
                                      key={optionsIndex}
                                      id={questions?.que_id}
                                      onChange={(e) => { handleInputChange(e, questions) }}
                                    />
                                  </>
                                })}
                              </> */}

                            </div>
                          </>
                          :
                          <>
                            <div className="relative z-0 max-w-[50%] flex-[50%] px-2 group mb-5">
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



              </div>

              {
                demograpgicsQuestions.length > 0 && demograpgicsQuestions instanceof Array && !isLoading &&
                <div
                  className="form_submit grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  <button
                    type="submit"

                    className="rounded bg-[#1B75BC] text-[#FFFFFF] py-2"
                  >
                    Submit
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

export default GenericDemographicsQuestionList;