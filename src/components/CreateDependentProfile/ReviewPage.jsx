import React from 'react';
import {Button, Divider, Group, Text} from "@mantine/core";
import styles from './ReviewPage.module.css';

const ReviewPage = ({
                        basicFormData,
                        emergencyFormData,
                        generalCareFormData,
                        educationFormData,
                        documentsFormData,
                        prevStep
                    }) => {

    console.log(educationFormData);
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageTitle}>
                <Text fz="xl" fw="700" mb="2rem" mt="2rem">Review</Text>
            </div>

            {/*basic information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">Basic Information</Text>

                <Text fz="lg" fw="500" mt="2rem">Name</Text>
                <Text> {`${basicFormData.firstName} ${basicFormData.lastName}`}</Text>


                <Text fz="lg" fw="500" mt="2rem">Birthday</Text>
                <Text> {basicFormData.birthday && basicFormData.birthday.toLocaleDateString()}</Text>


                <Text fz="lg" fw="500" mt="2rem">Relationship</Text>
                <Text> {basicFormData.relationship ? basicFormData.relationship : "N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Preferred Pronouns</Text>
                <Text> {basicFormData.preferredPronouns ? basicFormData.preferredPronouns : "N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Sex</Text>
                <Text> {basicFormData.sex}</Text>


                <Text fz="lg" fw="500" mt="2rem">Address</Text>
                <Text> {basicFormData.address ? basicFormData.address : "N/A"}</Text>


                <Text fz="lg" fw="500" mt="2rem">Phone Number</Text>
                <Text> {basicFormData.phoneNumber ? basicFormData.phoneNumber : "N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Parent's Name</Text>
                <Text> {basicFormData.parentsName}</Text>

            </div>

            <Divider mt="2rem" size="sm"/>

            {/*emergency information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">Emergency Information</Text>
                <Text fz="lg" fw="500" mt="2rem">Emergency Contact Name</Text>
                <Text> {emergencyFormData.emergencyContactName}</Text>


                <Text fz="lg" fw="500" mt="2rem">Emergency Contact Phone</Text>
                <Text> {emergencyFormData.emergencyContactPhone}</Text>

                <Text fz="lg" fw="500" mt="2rem">Emergency Contact Relationship</Text>
                <Text> {emergencyFormData.emergencyContactRelationship}</Text>


                <Text fz="lg" fw="500" mt="2rem">Allergies</Text>
                <Text> {emergencyFormData.allergies}</Text>

                <Text fz="lg" fw="500" mt="2rem">Current Medications</Text>
                <Text> {emergencyFormData.currentMedications}</Text>
            </div>
            <Divider mt="2rem" size="sm"/>

            {/* education information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">Education Information</Text>
                <Text fz="lg" fw="500" mt="2rem">School Name</Text>
                <Text> {educationFormData.schoolName}</Text>

                <Text fz="lg" fw="500" mt="2rem">Teacher Name</Text>
                <Text> {educationFormData.teacherName}</Text>

                <Text fz="lg" fw="500" mt="2rem">Grade</Text>
                <Text> {educationFormData.grade}</Text>

                <Text fz="lg" fw="500" mt="2rem">Start Time</Text>
                <Text> {educationFormData.startTime ? educationFormData.startTime.toLocaleTimeString() : "N/A"}</Text>


                <Text fz="lg" fw="500" mt="2rem">End Time</Text>
                <Text> {educationFormData.endTime ? educationFormData.endTime.toLocaleTimeString() : "N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Bus Number</Text>
                <Text> {educationFormData.busNumber ? educationFormData.busNumber : "N/A"}</Text>


                <Text fz="lg" fw="500" mt="2rem">Bus Time</Text>
                <Text> {educationFormData.busTime?educationFormData.busTime.toLocaleTimeString():"N/A"}</Text>

            </div>

            <Divider mt="2rem" size="sm"/>
            {/*general care information*/}
            <div>
                <Text fz="xl" fw="700" mt="2rem">General Care Information</Text>
                <Text fz="lg" fw="500" mt="2rem">Routine Notes</Text>
                <Text> {generalCareFormData.routineNotes?generalCareFormData.routineNotes:"N/A"}</Text>


                <Text fz="lg" fw="500" mt="2rem">Extracurriculars</Text>
                <Text> {generalCareFormData.extracurriculars?generalCareFormData.extracurriculars:"N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Bed Time</Text>
                <Text> {generalCareFormData.bedTime?generalCareFormData.bedTime.toLocaleDateString():"N/A"}</Text>

                <Text fz="lg" fw="500" mt="2rem">Medication Schedule</Text>
                <Text> {generalCareFormData.medicationSchedule?generalCareFormData.medicationSchedule:"N/A"}</Text>
            </div>

            <Divider mt="2rem" size="sm"/>
            <Text fz="xl" fw="700" mt="2rem">Documents Upload</Text>
            <Text fz="lg" fw="500" mt="2rem">Immunization File</Text>
            <Text
                c={documentsFormData.immunizationFile ? "green" : "red"}> {documentsFormData.immunizationFile ? "Uploaded" : "Not Uploaded"}</Text>

            <Text fz="lg" fw="500" mt="2rem">Insurance Card</Text>
            <Text
                c={documentsFormData.insuranceCard ? "green" : "red"}> {documentsFormData.insuranceCard ? "Uploaded" : "Not Uploaded"}</Text>


            <Text fz="lg" fw="500" mt="2rem">ESA Documents</Text>
            <Text
                c={documentsFormData.esaDocuments ? "green" : "red"}> {documentsFormData.esaDocuments ? "Uploaded" : "Not Uploaded"}</Text>

            <Text fz="lg" fw="500" mt="2rem">FSA Documents</Text>
            <Text
                c={documentsFormData.fsaDocuments ? "green" : "red"}> {documentsFormData.fsaDocuments ? "Uploaded" : "Not Uploaded"}</Text>


            <Group position="right" mt="md">
                <Button name="prevButton" onClick={prevStep}>Back</Button>
                <Button name="nextButton">Submit</Button>
            </Group>
        </div>


    );
};


export default ReviewPage;