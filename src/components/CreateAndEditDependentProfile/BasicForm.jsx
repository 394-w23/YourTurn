import React, {useEffect} from 'react';
import {Button, FileInput, Group, Input, Select, Text, TextInput} from "@mantine/core";
import InputMask from 'react-input-mask';
import {useForm} from "@mantine/form";
import {DatePicker} from "@mantine/dates";


const BasicForm = ({formData, nextStep, setFormData}) => {

    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            birthday: "",
            relationship: "",
            preferredPronouns: "",
            sex: "",
            address: "",
            phoneNumber: "",
            profilePic:""

        },
        validate: {
            birthday: (value) => (!value) ? 'Please enter a birthday' : null,
            sex: (value) => (!value) ? 'Please select sex' : null,
        },
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="2rem">Enter Basic Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                setFormData(values);
                nextStep();
            })
            }>
                <TextInput withAsterisk label="First Name" {...form.getInputProps('firstName')} size="lg"
                           required/>

                <TextInput withAsterisk label="Last Name" {...form.getInputProps('lastName')} size="lg"
                           required/>

                <FileInput label="Profile Picture" {...form.getInputProps('profilePic')} size="lg"/>
                <DatePicker label="Birthday" size="lg"
                            withAsterisk {...form.getInputProps('birthday')}

                />

                <TextInput label="Relationship" {...form.getInputProps('relationship')} size="lg"
                />

                <TextInput label="Preferred Pronouns" {...form.getInputProps('preferredPronouns')} size="lg"
                />

                <Select
                    label="Sex"
                    withAsterisk
                    size="lg"
                    data={[
                        {value: 'male', label: 'Male'},
                        {value: 'female', label: 'Female'},
                        {value: 'non-binary', label: 'Non-binary'}
                    ]}
                    {...form.getInputProps('sex')}
                />

                <TextInput label="Address" {...form.getInputProps('address')} size="lg"
                />


                <Input.Wrapper label="Phone Number" size="lg" error={form.errors.phoneNumber}>
                    <Input component={InputMask} mask="+1 (999) 999-9999"
                           size="lg" {...form.getInputProps('phoneNumber')}/>
                </Input.Wrapper>


                <Group position="right" mt="md" mb="20px">
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
};

export default BasicForm;