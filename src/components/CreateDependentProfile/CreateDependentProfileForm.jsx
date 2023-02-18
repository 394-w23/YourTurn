import React, { useState } from "react";
import BasicForm from "./BasicForm";
import EmergencyForm from "./EmergencyForm";
import GeneralCareForm from "./GeneralCareForm";
import DocumentsForm from "./DocumentsForm";
import EducationForm from "./EducationForm";
import styles from "./CreateDependentProfileForm.module.css";
import { Progress } from "@mantine/core";
import ReviewPage from "./ReviewPage";

const CreateDependentProfileForm = ({ user, allUsers }) => {
  const [basicFormData, setBasicFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    relationship: "",
    preferredPronouns: "",
    sex: "",
    address: "",
    phoneNumber: "",
    parentsName: "",
  });

  const [emergencyFormData, setEmergencyFormData] = useState({
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    allergies: "",
    currentMedications: "",
  });

  const [generalCareFormData, setGeneralCareFormData] = useState({
    routineNotes: "",
    extracurriculars: "",
    bedTime: "",
    medicationSchedule: "",
  });

  const [educationFormData, setEducationFormData] = useState({
    schoolName: "",
    teacherName: "",
    grade: "",
    startTime: "",
    endTime: "",
    busNumber: "",
    busTime: "",
  });

  const [documentsFormData, setDocumentsFormData] = useState({
    immunizationFile: null,
    insuranceCard: null,
    esaDocuments: null,
    fsaDocuments: null,
  });
  //keeps track of which form we want to display
  const [step, setStep] = useState(0);

  //go back to the previous form step
  const prevStep = () => {
    setStep((currStep) => currStep - 1);
  };

  //go to the next form step
  const nextStep = () => {
    setStep((currStep) => currStep + 1);
  };

  let renderedElement;

  switch (step) {
    case 0:
      //display basic form
      renderedElement = (
        <BasicForm
          formData={basicFormData}
          nextStep={nextStep}
          setFormData={setBasicFormData}
        />
      );
      break;

    case 1:
      renderedElement = (
        <EmergencyForm
          formData={emergencyFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setEmergencyFormData}
        />
      );
      break;
    case 2:
      renderedElement = (
        <EducationForm
          formData={educationFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setEducationFormData}
        />
      );

      break;
    case 3:
      renderedElement = (
        <GeneralCareForm
          formData={generalCareFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setGeneralCareFormData}
        />
      );
      break;
    case 4:
      renderedElement = (
        <DocumentsForm
          formData={documentsFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setDocumentsFormData}
        />
      );
      break;

    case 5:
      renderedElement = (
        <ReviewPage
          basicFormData={basicFormData}
          emergencyFormData={emergencyFormData}
          generalCareFormData={generalCareFormData}
          educationFormData={educationFormData}
          documentsFormData={documentsFormData}
          prevStep={prevStep}
          user={user}
          allUsers={allUsers}
        />
      );
      break;
    default:
      // renderedElement = (<div>
      //     Placeholder
      //     <button onClick={prevStep}>Prev</button>
      //     <button onClick={nextStep}>Next</button>
      // </div>);
      renderedElement = (
        <ReviewPage
          basicFormData={basicFormData}
          emergencyFormData={emergencyFormData}
          generalCareFormData={generalCareFormData}
          educationFormData={educationFormData}
          documentsFormData={documentsFormData}
        />
      );
      break;
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.progressBarContainer} title="Progress">
        <Progress
          value={(step / 5) * 100}
          label={`${(step / 5) * 100}%`}
          size="xl"
          radius="xl"
          striped
        />
      </div>
      <div className={`${styles.formContent}${step === 5 ? "inReview" : ""}`}>
        {renderedElement}
      </div>
    </div>
  );
};

export default CreateDependentProfileForm;