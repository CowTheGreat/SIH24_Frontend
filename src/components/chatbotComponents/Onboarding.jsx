// import React, { useState, useEffect } from "react";
// import Classes from "./Onboarding.module.css";

// const Onboarding = ({ setInput }) => {
//   const steps = [
//     {
//       title: "Get to know your team",
//       prompt: "Give me the reporting chain of Gowtham",
//     },
//     {
//       title: "Define your goals",
//       prompt: "What are your top priorities for this project?",
//     },
//     {
//       title: "Understand resources",
//       prompt: "List all available team resources.",
//     },
//     {
//       title: "Establish communication channels",
//       prompt: "How does the team communicate daily?",
//     },
//     {
//       title: "Set deadlines",
//       prompt: "What are the key deadlines for the project?",
//     },
//     {
//       title: "Review expectations",
//       prompt: "Summarize the team's expectations from this project.",
//     },
//   ];

//   // Initialize completedSteps from localStorage or use an empty array
//   const [completedSteps, setCompletedSteps] = useState(() => {
//     const savedSteps = localStorage.getItem("completedSteps");
//     return savedSteps ? JSON.parse(savedSteps) : [];
//   });

//   // Save completedSteps to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
//   }, [completedSteps]);

//   const handleStepClick = (stepTitle, stepPrompt) => {
//     if (!completedSteps.includes(stepTitle)) {
//       setCompletedSteps([...completedSteps, stepTitle]);
//     }
//     setInput(stepPrompt); // Update the input box with the clicked step's prompt
//   };

//   // Check if all steps are completed
//   const allStepsCompleted = completedSteps.length === steps.length;

//   if (allStepsCompleted) {
//     return null; // Hide the component if all steps are completed
//   }

//   return (
//     <div className={Classes.onboardingContainer}>
//       <h2 className={Classes.title}>Onboarding Steps</h2>
//       <div className={Classes.stepsContainer}>
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className={`${Classes.step} ${
//               completedSteps.includes(step.title) ? Classes.completed : ""
//             }`}
//             onClick={() => handleStepClick(step.title, step.prompt)}
//           >
//             <div className={Classes.stepIcon}>
//               {completedSteps.includes(step.title) ? "✔️" : index + 1}
//             </div>
//             <div className={Classes.stepContent}>
//               <p>{step.prompt}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

import React, { useState, useEffect } from "react";
import Classes from "./Onboarding.module.css";
import { TiTick } from "react-icons/ti";

const Onboarding = ({ setInput }) => {
  const steps = [
    {
      title: "Get to know your team",
      prompt: "Give me the reporting chain of Gowtham",
    },
    {
      title: "Define your goals",
      prompt: "What are your top priorities for this project?",
    },
    {
      title: "Understand resources",
      prompt: "List all available team resources.",
    },
    {
      title: "Establish communication channels",
      prompt: "How does the team communicate daily?",
    },
    {
      title: "Set deadlines",
      prompt: "What are the key deadlines for the project?",
    },
    {
      title: "Review expectations",
      prompt: "Summarize the team's expectations from this project.",
    },
  ];

  const [completedSteps, setCompletedSteps] = useState(() => {
    const savedSteps = localStorage.getItem("completedSteps");
    return savedSteps ? JSON.parse(savedSteps) : [];
  });

  const [showContainer, setShowContainer] = useState(true); // Controls whether the entire container is displayed
  const [showCompletionButton, setShowCompletionButton] = useState(false);

  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const handleStepClick = (stepIndex) => {
    const stepTitle = steps[stepIndex - 1].title;
    const stepPrompt = steps[stepIndex - 1].prompt;

    if (!completedSteps.includes(stepTitle)) {
      setCompletedSteps([...completedSteps, stepTitle]);
    }
    setInput(stepPrompt);

    if (stepIndex === steps.length) {
      setShowCompletionButton(true); // Show the "Onboarding Completed" button
    }
  };

  const handleCompleteClick = () => {
    setShowContainer(false); // Hide the entire onboarding container
  };

  if (!showContainer) {
    return null; // Return null to hide the component completely
  }

  return (
    <div className={Classes.onboardingContainer}>
      <h2 className={Classes.title}>Onboarding Steps</h2>
      <div className={Classes.stepperContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`${Classes.stepItem} ${
                completedSteps.includes(step.title) ? Classes.complete : ""
              }`}
              onClick={() => handleStepClick(index + 1)}
            >
              <div className={Classes.step}>
                {completedSteps.includes(step.title) ? (
                  <TiTick size={20} />
                ) : (
                  index + 1
                )}
              </div>
              <div className={Classes.stepContent}>
                <p>{step.title}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${Classes.stepLine} ${
                  completedSteps.includes(steps[index].title)
                    ? Classes.completedLine
                    : ""
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {showCompletionButton && (
        <div className={Classes.completeContainer}>
          <h2>Onboarding Completed</h2>
          <button
            className={Classes.completeButton}
            onClick={handleCompleteClick}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
