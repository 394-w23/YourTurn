import React from "react";
import {Anchor, Button, Divider, Group, Text} from "@mantine/core";
import styles from "./ReviewPage.module.css";
import {addNewDependent, getNewDependentKey, updateDependent, uploadFile,} from "../../utilities/firebase";
import {useNavigate} from "react-router-dom";

const ReviewPage = ({
                        basicFormData,
                        emergencyFormData,
                        generalCareFormData,
                        educationFormData,
                        documentsFormData,
                        prevStep,
                        user,
                        allUsers,
                        oldDocumentsFormData,
                        dependentId,
                        isEditMode
                    }) => {
    const navigate = useNavigate();
    const determineDisplayedText = (fieldName) => {
        if (documentsFormData[fieldName]) { //the user uploaded a new file
            return (
                <Anchor href={URL.createObjectURL(documentsFormData[fieldName])} target="_blank">
                    {documentsFormData[fieldName].name}
                </Anchor>
            );
        } else {
            if (oldDocumentsFormData[fieldName] !== "N/A") {
                return (
                    <Anchor href={oldDocumentsFormData[fieldName].fileLink} target="_blank">
                        {oldDocumentsFormData[fieldName].fileName}
                    </Anchor>
                );
            } else {
                return "Not Uploaded";
            }
        }

    };
    const handleFormSubmit = async () => {
        let fileLinks = {};
        //upload dependent files
        for (const [key, file] of Object.entries(documentsFormData)) {
            // console.log("Document key: ",key," Document value: ",file.name);
            if (file) {
                //if the user uploaded a file
                const [isSuccessful, fileLink] = await uploadFile(
                    file,
                    "dependent-files"
                );
                if (isSuccessful) {
                    fileLinks[key] = {fileName: file.name, fileLink: fileLink};
                } else {
                    fileLinks[key] = "N/A";
                }
            } else {
                //user didn't upload file
                fileLinks[key] = "N/A";
            }
        }

        if (isEditMode) {
            let newDocumentObject={}
            for (const [key,file] of Object.entries(fileLinks)){
                if(fileLinks[key]==="N/A"){
                    //check if we have uploaded a file previously
                    newDocumentObject[key]=(oldDocumentsFormData[key]!=="N/A")?oldDocumentsFormData[key]:"N/A"
                }
                else{
                    newDocumentObject[key]=fileLinks[key]
                }
            }
            // Create new dependent object
            let newDependent = {
                id: dependentId,
                basic: {
                    firstName: basicFormData.firstName,
                    lastName: basicFormData.lastName,
                    birthday: basicFormData.birthday
                        ? basicFormData.birthday.toUTCString()
                        : "N/A",
                    relationship: basicFormData.relationship
                        ? basicFormData.relationship
                        : "N/A",
                    preferredPronouns: basicFormData.preferredPronouns
                        ? basicFormData.preferredPronouns
                        : "N/A",
                    sex: basicFormData.sex,
                    address: basicFormData.address ? basicFormData.address : "N/A",
                    phoneNumber: basicFormData.phoneNumber
                        ? basicFormData.phoneNumber
                        : "N/A"
                },
                emergency: {
                    emergencyContactName: emergencyFormData.emergencyContactName,
                    emergencyContactPhone: emergencyFormData.emergencyContactPhone,
                    emergencyContactRelationship:
                    emergencyFormData.emergencyContactRelationship,
                },
                education: {
                    schoolName: educationFormData.schoolName,
                    teacherName: educationFormData.teacherName,
                    grade: educationFormData.grade,
                    startTime: educationFormData.startTime
                        ? educationFormData.startTime.toUTCString()
                        : "N/A",
                    endTime: educationFormData.endTime
                        ? educationFormData.endTime.toUTCString()
                        : "N/A",
                    busNumber: educationFormData.busNumber
                        ? educationFormData.busNumber
                        : "N/A",
                    busTime: educationFormData.busTime
                        ? educationFormData.busTime.toUTCString()
                        : "N/A",
                },
                generalCare: {
                    routineNotes: generalCareFormData.routineNotes
                        ? generalCareFormData.routineNotes
                        : "N/A",
                    extracurriculars: generalCareFormData.extracurriculars
                        ? generalCareFormData.extracurriculars
                        : "N/A",
                    bedTime: generalCareFormData.bedTime
                        ? generalCareFormData.bedTime.toUTCString()
                        : "N/A",
                    currentMedications: generalCareFormData.currentMedications,
                    medicationSchedule: generalCareFormData.medicationSchedule
                        ? generalCareFormData.medicationSchedule
                        : "N/A",
                    allergies: generalCareFormData.allergies
                },
                documents: newDocumentObject,
            };

            // Add object to database
            await updateDependent(newDependent,dependentId)


        } else { //we're creating the dependent for the first time
            // Create a new entry in the dependents table
            let newDependentID = getNewDependentKey();


            // Create new dependent object
            let newDependent = {
                id: newDependentID,
                basic: {
                    firstName: basicFormData.firstName,
                    lastName: basicFormData.lastName,
                    birthday: basicFormData.birthday
                        ? basicFormData.birthday.toUTCString()
                        : "N/A",
                    relationship: basicFormData.relationship
                        ? basicFormData.relationship
                        : "N/A",
                    preferredPronouns: basicFormData.preferredPronouns
                        ? basicFormData.preferredPronouns
                        : "N/A",
                    sex: basicFormData.sex,
                    address: basicFormData.address ? basicFormData.address : "N/A",
                    phoneNumber: basicFormData.phoneNumber
                        ? basicFormData.phoneNumber
                        : "N/A"
                },
                emergency: {
                    emergencyContactName: emergencyFormData.emergencyContactName,
                    emergencyContactPhone: emergencyFormData.emergencyContactPhone,
                    emergencyContactRelationship:
                    emergencyFormData.emergencyContactRelationship,
                },
                education: {
                    schoolName: educationFormData.schoolName,
                    teacherName: educationFormData.teacherName,
                    grade: educationFormData.grade,
                    startTime: educationFormData.startTime
                        ? educationFormData.startTime.toUTCString()
                        : "N/A",
                    endTime: educationFormData.endTime
                        ? educationFormData.endTime.toUTCString()
                        : "N/A",
                    busNumber: educationFormData.busNumber
                        ? educationFormData.busNumber
                        : "N/A",
                    busTime: educationFormData.busTime
                        ? educationFormData.busTime.toUTCString()
                        : "N/A",
                },
                generalCare: {
                    routineNotes: generalCareFormData.routineNotes
                        ? generalCareFormData.routineNotes
                        : "N/A",
                    extracurriculars: generalCareFormData.extracurriculars
                        ? generalCareFormData.extracurriculars
                        : "N/A",
                    bedTime: generalCareFormData.bedTime
                        ? generalCareFormData.bedTime.toUTCString()
                        : "N/A",
                    currentMedications: generalCareFormData.currentMedications,
                    medicationSchedule: generalCareFormData.medicationSchedule
                        ? generalCareFormData.medicationSchedule
                        : "N/A",
                    allergies: generalCareFormData.allergies
                },
                documents: {
                    immunizationFile: fileLinks["immunizationFile"],
                    insuranceCard: fileLinks["insuranceCard"],
                    esaDocuments: fileLinks["esaDocuments"],
                    fsaDocuments: fileLinks["fsaDocuments"],
                },
            };

            let updatedUserDependents;
            if (!allUsers[user.uid].dependents) {
                updatedUserDependents = {
                    dependents: [newDependentID],
                };
            } else {
                updatedUserDependents = {
                    dependents: [...allUsers[user.uid].dependents, newDependentID],
                };
            }

            // Add object to database
            await addNewDependent(
                newDependent,
                updatedUserDependents,
                newDependentID,
                user.uid
            );
        }


        navigate("/dependents");
    };
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageTitle}>
                <Text fz="xl" fw="700" mb="2rem" mt="2rem">
                    Review
                </Text>
            </div>

            {/*basic information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">
                    Basic Information
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Name
                </Text>
                <Text> {`${basicFormData.firstName} ${basicFormData.lastName}`}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Birthday
                </Text>
                <Text>
                    {" "}
                    {basicFormData.birthday &&
                        basicFormData.birthday.toLocaleDateString()}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Relationship
                </Text>
                <Text>
                    {" "}
                    {basicFormData.relationship ? basicFormData.relationship : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Preferred Pronouns
                </Text>
                <Text>
                    {" "}
                    {basicFormData.preferredPronouns
                        ? basicFormData.preferredPronouns
                        : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Sex
                </Text>
                <Text> {basicFormData.sex}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Address
                </Text>
                <Text> {basicFormData.address ? basicFormData.address : "N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Phone Number
                </Text>
                <Text>
                    {" "}
                    {basicFormData.phoneNumber ? basicFormData.phoneNumber : "N/A"}
                </Text>

            </div>

            <Divider mt="2rem" size="sm"/>

            {/*emergency information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">
                    Emergency Information
                </Text>
                <Text fz="lg" fw="500" mt="2rem">
                    Emergency Contact Name
                </Text>
                <Text> {emergencyFormData.emergencyContactName}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Emergency Contact Phone
                </Text>
                <Text> {emergencyFormData.emergencyContactPhone}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Emergency Contact Relationship
                </Text>
                <Text> {emergencyFormData.emergencyContactRelationship}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Current Medications
                </Text>
                <Text> {emergencyFormData.currentMedications}</Text>
            </div>
            <Divider mt="2rem" size="sm"/>

            {/* education information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">
                    Education Information
                </Text>
                <Text fz="lg" fw="500" mt="2rem">
                    School Name
                </Text>
                <Text> {educationFormData.schoolName}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Teacher Name
                </Text>
                <Text> {educationFormData.teacherName}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Grade
                </Text>
                <Text> {educationFormData.grade}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Start Time
                </Text>
                <Text>
                    {" "}
                    {educationFormData.startTime
                        ? educationFormData.startTime.toLocaleTimeString()
                        : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    End Time
                </Text>
                <Text>
                    {" "}
                    {educationFormData.endTime
                        ? educationFormData.endTime.toLocaleTimeString()
                        : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Bus Number
                </Text>
                <Text>
                    {" "}
                    {educationFormData.busNumber ? educationFormData.busNumber : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Bus Time
                </Text>
                <Text>
                    {" "}
                    {educationFormData.busTime
                        ? educationFormData.busTime.toLocaleTimeString()
                        : "N/A"}
                </Text>
            </div>

            <Divider mt="2rem" size="sm"/>
            {/*general care information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">
                    General Care Information
                </Text>
                <Text fz="lg" fw="500" mt="2rem">
                    Routine Notes
                </Text>
                <Text>
                    {" "}
                    {generalCareFormData.routineNotes
                        ? generalCareFormData.routineNotes
                        : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Extracurriculars
                </Text>
                <Text>
                    {" "}
                    {generalCareFormData.extracurriculars
                        ? generalCareFormData.extracurriculars
                        : "N/A"}
                </Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Bed Time
                </Text>
                <Text>
                    {" "}
                    {generalCareFormData.bedTime
                        ? generalCareFormData.bedTime.toLocaleTimeString()
                        : "N/A"}
                </Text>
                <Text fz="lg" fw="500" mt="2rem">
                    Allergies
                </Text>
                <Text> {generalCareFormData.allergies}</Text>

                <Text fz="lg" fw="500" mt="2rem">
                    Medication Schedule
                </Text>
                <Text>
                    {" "}
                    {generalCareFormData.medicationSchedule
                        ? generalCareFormData.medicationSchedule
                        : "N/A"}
                </Text>

            </div>

            <Divider mt="2rem" size="sm"/>
            <Text fz="xl" fw="700" mt="2rem">
                Documents Upload
            </Text>
            <Text fz="lg" fw="500" mt="2rem">
                Immunization File
            </Text>
            <Text c="red">
                {" "}
                {determineDisplayedText("immunizationFile")}
            </Text>

            <Text fz="lg" fw="500" mt="2rem">
                Insurance Card
            </Text>
            <Text c="red">
                {" "}
                {determineDisplayedText("insuranceCard")}
            </Text>

            <Text fz="lg" fw="500" mt="2rem">
                ESA Documents
            </Text>
            <Text c="red">
                {" "}
                {determineDisplayedText("esaDocuments")}
            </Text>

            <Text fz="lg" fw="500" mt="2rem">
                FSA Documents
            </Text>
            <Text c="red">
                {" "}
                {determineDisplayedText("fsaDocuments")}
            </Text>

            <Group position="right" mt="md">
                <Button name="prevButton" onClick={prevStep}>
                    Back
                </Button>
                <Button name="nextButton" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </Group>
        </div>
    );
};

export default ReviewPage;
