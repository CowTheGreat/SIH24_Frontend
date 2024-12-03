import React, { useState, useEffect } from "react";
import Classes from "./Onboarding.module.css";

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

  // Initialize completedSteps from localStorage or use an empty array
  const [completedSteps, setCompletedSteps] = useState(() => {
    const savedSteps = localStorage.getItem("completedSteps");
    return savedSteps ? JSON.parse(savedSteps) : [];
  });

  // Save completedSteps to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const handleStepClick = (stepTitle, stepPrompt) => {
    if (!completedSteps.includes(stepTitle)) {
      setCompletedSteps([...completedSteps, stepTitle]);
    }
    setInput(stepPrompt); // Update the input box with the clicked step's prompt
  };

  // Check if all steps are completed
  const allStepsCompleted = completedSteps.length === steps.length;

  if (allStepsCompleted) {
    return null; // Hide the component if all steps are completed
  }

  return (
    <div className={Classes.onboardingContainer}>
      <h2 className={Classes.title}>Onboarding Steps</h2>
      <div className={Classes.stepsContainer}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${Classes.step} ${
              completedSteps.includes(step.title) ? Classes.completed : ""
            }`}
            onClick={() => handleStepClick(step.title, step.prompt)}
          >
            <div className={Classes.stepIcon}>
              {completedSteps.includes(step.title) ? "✔️" : index + 1}
            </div>
            <div className={Classes.stepContent}>
              <p>{step.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
