const getAutoFilledRecord = (data) => {
    var userData = JSON.parse(sessionStorage.getItem("userData"))
    var tempArr = []
    if (data && data.length > 0 && data != "Signature has expired") {
        data.map((item) => {
            if (item.questions.length > 0) {
                item.questions.map((question) => {
                    if (question.label == "Please state your first and Last name.") {
                        tempArr.push({
                            question_id: question.id,
                            option_id: "",
                            user_id: sessionStorage.getItem("uid"),
                            correct: true,
                            answertext: `${userData.first_name} ${userData.last_name}`,
                            time_taken: "00:00"
                        })
                        question.value = `${userData.first_name} ${userData.last_name}`

                    }
                    if (question.label == "Gender") {
                        var temp = userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)
                        question.options.map((item) => {
                            if (item.label == temp) {
                                tempArr.push({
                                    question_id: question.id,
                                    option_id: item.option_id,
                                    user_id: sessionStorage.getItem("uid"),
                                    correct: true,
                                    answertext: "",
                                    time_taken: "00:00"
                                })
                                question.value = item.option_id
                            }
                        })

                    }
                    if (question.label == "Please enter your date of birth in the format- mm/dd/yyyy") {
                        var date = new Date(userData.dob)
                        tempArr.push({
                            question_id: question.id,
                            option_id: "",
                            user_id: sessionStorage.getItem("uid"),
                            correct: true,
                            answertext: formatDate(date),
                            time_taken: "00:00"
                        })
                        question.value = formatDate(date)
                    }
                })
            }
        })
        setQuestionAnswerList([...tempArr])
    }
}