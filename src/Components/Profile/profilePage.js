import React, { useState } from 'react';
import { Container, Button, Form, FormControl, FormLabel, FormGroup, Modal } from 'react-bootstrap';
import './profilePage.scss';
import { connect } from 'react-redux';
import EditProfile, { updatedData } from './editProfilePage';
import axios from 'axios';
import { updateUserDataAction } from '../../Redux/Actioncreators/UpdateProfileActions';


export function ProfileDisplay(props) {

    return (
        <div>
            <Container fluid>
                <header className='profile-heading'>My Profile</header>
            </Container>
            <Container className='profile-body'>

                <Form xs={12} md={4}>
                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Name</FormLabel>
                        <FormControl name='userName' type='text' value={props.userData.userName} data-testid="test-username" disabled />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Email</FormLabel>
                        <FormControl name='userEmail' type='email' value={props.userData.userEmail} data-testid="test-useremail" disabled />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Phone number</FormLabel>
                        <FormControl name='userPhoneNumber' type='text' value={props.userData.userMobile} data-testid="test-userphone" disabled />
                    </FormGroup>

                    <FormGroup xs={12} md={4}>
                        <FormLabel className="profile-label">Address</FormLabel>
                        <FormControl name='userAddress' type='text' value={props.userData.userAddress} data-testid="test-useraddress" disabled />
                    </FormGroup>

                </Form>

            </Container>
        </div>
    )
}



function ProfileRendering(props) {

    let [show, setShow] = useState(false);

    let handleClose = () => setShow(false);

    let responseData = {};

    function handleClickSaveChanges() {
        setEdit(!edit)
        setShow(!show);

        let userId = props.userData._id;

        let url = `/updateUser/${userId}`;
        axios.put(url, updatedData)
            .then(res => {
                responseData = res.data.data;
                props.updateUserData(responseData);
                console.log("Data from server", responseData);
                console.log("User data after changes from store", props.userData); //from store
            })
            .catch(err => console.log(err));

    }

    const [edit, setEdit] = useState(true);


    return (
        <div>
            {edit ?
                <div>
                    <ProfileDisplay userData={props.userData} />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='modal-title'>SUCCESS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Changes saved successfully</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                :
                <div>
                    <EditProfile userData={props.userData} />

                </div>
            }
            {edit ? <div className='div-button'><Button className="btn-profile" onClick={() => setEdit(!edit)}>Edit</Button></div> : <div className='div-button'><Button variant='success' className="btn-profile" onClick={handleClickSaveChanges}>Save Changes</Button></div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.signin.data && state.signin.data.data)

        return ({

            userData: state.signin.data.data.userdata

        })
    return ({
        userData: state.signin.data// data is an object
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (updatedUserData) => dispatch(updateUserDataAction(updatedUserData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRendering);