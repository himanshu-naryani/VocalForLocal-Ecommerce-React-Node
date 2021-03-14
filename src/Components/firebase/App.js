import React, { Component } from 'react';
import firebase from './Firebase';
import 'firebase/storage';
export class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null
        }
        console.log("in constructor")
    }

    handleChange = (files) => {
        this.setState({
            files: files
        })
    }
    handleSave = () => {

        let bucketName = 'images'
        let file = this.state.files[0]
        console.log(file);
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
        let uploadTask = storageRef.put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {

                uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                    this.props.handleClick(downloadUrl);
                })

            })

    }
    showImage = () => {
        let storageRef = firebase.storage().ref()

        storageRef.child('images/' + this.state.files[0].name).getDownloadURL().then((url) => {
            console.log(url)
            document.getElementById('new-img').src = url
        })
    }
    render() {
        return (
            <div>
                <input type="file" onChange={(e) => {
                    this.handleChange(e.target.files)
                }} />
                <button onClick={this.handleSave} style={{ marginRight: "2%" }}>Save</button>
                <button onClick={this.showImage}>Show image</button><br /><br />

                <img id="new-img" style={{ height: "60%", width: "90%", float: "center", margin: "4% 2% 4% 2%" }} />
            </div>
        )
    }
}
