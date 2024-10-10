import React, { useState } from 'react';
import './MultiStepForm.css';
import Start from "./Start.jsx";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";
import Step5 from "./Step5.jsx";
import Step6 from "./Step6.jsx";
import Step7 from "./Step7.jsx";
import Step8 from "./Step8.jsx";
import Step9 from "./Step9.jsx";
import Step10 from "./Step10.jsx";
import Step11 from "./Step11.jsx";
import Step12 from "./Step12.jsx";

const MultiStepForm = () => {
    const [step, setStep] = useState(0); // Initially set to Start (step 0)
    const [formData, setFormData] = useState({
        boardingName: '',
        ownerName: '',
        city: '',
        boardingType: '',
        houseTitle: '', // Step 8
    });
    const [errors, setErrors] = useState({});
    const totalSteps = 12; // Total number of steps
    const progressPercentage = (step / totalSteps) * 100; // Calculate progress percentage

    const nextStep = () => setStep(prevStep => prevStep + 1);
    const prevStep = () => setStep(prevStep => prevStep - 1);

    // Handle input changes for form fields
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Submit handler logic
    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
        // Add your submission logic here (API call, etc.)
    };

    // Validation functions for steps
    const validateStep2 = () => {
        if (!formData.boardingType) {
            setErrors({ boardingType: 'Please select a boarding type' });
            return false;
        }
        setErrors({});
        return true;
    };

    const validateStep3 = () => {
        // Add validation logic for Step 3
        return true;
    };

    // Validate the current step
    const validateCurrentStep = () => {
        switch (step) {
            case 2:
                return validateStep2();
            case 3:
                return validateStep3();
            // Add more validation for other steps as needed
            default:
                return true;
        }
    };

    // Handle moving to the next step with validation
    const handleNextStep = () => {
        if (!validateCurrentStep()) return;
        nextStep();
    };

    // Render the corresponding component for each step
    const getStepComponent = () => {
        switch (step) {
            case 0: return <Start nextStep={handleNextStep} handleChange={handleChange} values={formData} />;
            case 1: return <Step1 nextStep={handleNextStep} handleChange={handleChange} values={formData} />;
            case 2: return <Step2 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} errors={errors} />;
            case 3: return <Step3 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />;
            case 4: return <Step4 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />;
            case 5: return <Step5 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />;
            case 6: return <Step6 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} errors={errors} />;
            case 7: return <Step7 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 8: return <Step8 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 9: return <Step9 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 10: return <Step10 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 11: return <Step11 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            case 12: return <Step12 nextStep={handleNextStep} prevStep={prevStep} handleChange={handleChange} values={formData} />;
            default: return null;
        }
    };

    return (
        <div className="unique-form-container">
            {/* Step content */}
            <div className="unique-step-content">
                {getStepComponent()}
            </div>

            {/* Progress Bar and Step Indicator */}
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="step-indicator">
                <p>Step {step + 1} of {totalSteps}</p> {/* Adjusted for human-readable step count */}
            </div>

            {/* Footer navigation buttons */}
            <div className="unique-footer-buttons">
                {/* Back button (only shown after the first step) */}
                {step > 0 && (
                    <button className="unique-back-button" onClick={prevStep}>
                        Back
                    </button>
                )}
                {/* Next or Submit button */}
                {step < totalSteps ? (
                    <button className="unique-next-button" onClick={handleNextStep}>
                        {step === 0 ? 'Get started' : 'Next'}
                    </button>
                ) : (
                    <button className="unique-submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
