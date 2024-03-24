import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/common/navbar/Navbar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const QuestionnairePage = () => {

  const handleButtonClick = () => {
    Swal.fire({
      title: 'Form Submitted',
      text: 'The form has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };
  const questions = [
    {
      question:
        "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
      options: [
        "Not at all",
        "Several Days",
        "More than half the days",
        "Neraly every day",
      ],
    },
    {
      question:
        ". Have you experienced a loss of interest or pleasure in activities you once enjoyed?",
      options: [
        "Not at all",
        "Several Days",
        "More than half the days",
        "Neraly every day",
      ],
    },
    {
      question:
        "How often do you find yourself feeling overly worried or anxious?",
      options: ["Rarely or never", "Occasionaly", "Frequently", "Constantly"],
    },
    {
      question:
        "Do you often have trouble falling asleep or staying asleep, or do you experience restless sleep?",
      options: ["Rarely or never", "Occasionaly", "Frequently", "Constantly"],
    },
    {
      question:
        "Are there times when you feel unusually irritable or easily angered?",
      options: ["Rarely or never", "Sometimes", "Often", "Almost always"],
    },
    {
      question:
        "Do you ever experience intrusive, unwanted thoughts or memories that are distressing?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
    {
      question:
        "How often do you find it hard to concentrate on tasks such as reading or watching television?",
      options: ["Rarely or never", "Occasionaly", "Frequently", "Constantly"],
    },
    {
      question:
        ". Do you sometimes feel disconnected from yourself or from reality?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
    {
      question:
        "Are you experiencing difficulties in managing your daily responsibilities?",
      options: ["Not at all", "Occasionaly", "Frequently", "Always"],
    },
    {
      question:
        "Have you had thoughts of harming yourself or ending your life?",
      options: ["Never", "Rarely", "Sometimes", "Often"],
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleAnswerChange = (questionIndex, option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
    setIsSubmitDisabled(!newAnswers.every((answer) => answer !== null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
  };

  return (
    <>
    <div className="flex">
        <nav>
          <div className="w-36 mx-5 my-8 h-96 p-4">
 
          </div>
        </nav>
        <section className='flex flex-col cards'>
            <div className="card">
            <div className="flex items-center bg-white justify-center min-h-screen">
            <div className="p-8 bg-white">
        <h2 className="text-3xl font-extrabold text-indigo-800 text-center mb-6">
          <br></br>
          Indicators to Mental Health
        </h2>
        <h4 className="font-bold text-center text-black mb-3">
          By filling this questionnaire you will get the posibilty
          <h4 />
          of how much anxiety, depression, stress, etc you might have.
        </h4>

        <form onSubmit={handleSubmit}>
          {questions.map((questionObj, questionIndex) => (
            <div
              key={questionIndex}
              className="mb-6 border border-black border-2 rounded-lg pb-4"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <label className="block m-4 font-bold text-black mb-2 text-lg">
                {`${questionIndex + 1}. ${questionObj.question}`}
              </label>

              {questionObj.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="flex items-center border-black"
                >
                  <input
                    type="radio"
                    id={`option_${questionIndex}_${option}`}
                    name={`question_${questionIndex}`}
                    checked={answers[questionIndex] === option}
                    onChange={() => handleAnswerChange(questionIndex, option)}
                    className="mx-2"
                  />
                  <label
                    htmlFor={`option_${questionIndex}_${option}`}
                    className="text-black"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleButtonClick}
            className={`className="w-40 px-5 py-3 text-white duration-150 bg-blue-800 rounded-full hover:bg-indigo-500 active:bg-indigo-70 ${
              isSubmitDisabled && "opacity-50 cursor-not-allowed"
              
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
            </div>
            
        </section>
    </div>
    </>
  );
};

export default QuestionnairePage;
