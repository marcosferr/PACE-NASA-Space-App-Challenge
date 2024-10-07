import { useState, useEffect } from "react";
import Tour from "reactour";
import { useNavigate } from "react-router-dom";

const TourComponent = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isTourCompleted = localStorage.getItem("isTourCompleted");
    if (!isTourCompleted) {
      setIsTourOpen(true);
    }
  }, []);

  const handleStepChange = (currentStep: number) => {
    if (currentStep === 1) {
      navigate("/app");
    }
  };

  const handleTourClose = () => {
    setIsTourOpen(false);
    localStorage.setItem("isTourCompleted", "true");
  };

  const steps = [
    {
      selector: ".start-learning-link",
      content: (
        <div>
          <p>Click here to start learning!</p>
          <img src="plankton_teacher.png" alt="Start Learning" />
        </div>
      ),
    },
    {
      selector: ".slides-container",
      content: (
        <div>
          <p>Here you can slide through the different sections.</p>
          <img src="plankton_teacher.png" alt="Slides" />
        </div>
      ),
    },
    {
      selector: ".chat-container",
      content: (
        <div>
          <p>Ask your questions in the chat here.</p>
          <img src="plankton_teacher.png" alt="Chat" />
        </div>
      ),
    },
    {
      selector: ".end-tour-button",
      content: (
        <div>
          <p>Click the button below to end the tour.</p>
          <button onClick={handleTourClose} style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '12px', padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>End Tour</button>
        </div>
      ),
    },
  ];

  return (
    <Tour
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={handleTourClose}
      getCurrentStep={handleStepChange}
    />
  );
};

export default TourComponent;
