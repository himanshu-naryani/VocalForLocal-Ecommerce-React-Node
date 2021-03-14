import React, { useState } from 'react';
import { Container, Form, FormControl, FormLabel, FormGroup } from 'react-bootstrap';

let updatedData = {};
export default function EditProfile(props) {

    let [input, setInput] = useState({
        userName: props.userData.userName,
        userEmail: props.userData.userEmail,
        userMobile: props.userData.userMobile,
        userAddress: props.userData.userAddress,
    })

    function handleChange(event) {

        switch (event.target.name) {
            case "userName":
                input.userName = event.target.value;
                break;
            case "userEmail":
                input.userEmail = event.target.value;
                break;
            case "userMobile":
                input.userMobile = event.target.value;
                break;
            case "userAddress":
                input.userAddress = event.target.value;
                break;
            default:
                break;
        }
        updatedData = input;


    }


    return (
        <div>
            <Container fluid>
                <header className='profile-heading'>Edit profile</header>
            </Container>
            <Container className="profile-body">
                <Form xs={12} md={4}>
                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Name</FormLabel>
                        <FormControl name='userName' type='text' onChange={handleChange} placeholder={props.userData.userName} />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Email</FormLabel>
                        <FormControl name='userEmail' type='email' onChange={handleChange} placeholder={props.userData.userEmail} />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Phone number</FormLabel>
                        <FormControl name='userMobile' type='text' onChange={handleChange} placeholder={props.userData.userMobile} />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Address</FormLabel>
                        <FormControl name='userAddress' type='text' placeholder={props.userData.userAddress} onChange={handleChange} />
                    </FormGroup>


                </Form>
            </Container>
        </div>
    )
}

export {
    updatedData
}