import React, { Component } from "react";
import {  Button, Modal, Form, FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import styled from 'styled-components';
import { axiosAddPhoto } from '../../services/photoService';
import { getToken } from '../../services/tokenService';

class Banner extends Component {
  constructor(props){
    super(props);
    this.state = {
      accessToken: '',
      show: false,
      name: '',
      date: '',
      description: '',
      url: '',
      file: '',
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount(){
    const token = getToken();
    this.setState({ accessToken: token });
  }

  handleClose() {
    this.setState({ show: false });
  }
  
  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileUpload() {
    console.log(document.getElementsByName('file'));
    console.log(document.getElementsByName('file')[0].value);
    console.log(document.getElementsByName('file')[0].files[0]);
    this.setState({
      // file: document.getElementsByName('file')[0].files[0]
      file: document.getElementsByName('file')[0].value
    });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    const newPhotoObj = {
      name: this.state.name,
      date: this.state.date,
      description: this.state.description,
      url: this.state.url,
      file: this.state.file
    }
    axiosAddPhoto(newPhotoObj, this.state.accessToken, (res) => {
      this.props.refresh(res._id);
    });
    this.handleClose();
  }

  render() {
    return (
      <BannerContainer>
        <Button bsStyle="primary" onClick={this.handleShow}>Add Photo</Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Photo Information</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              <FormGroup controlId="formControlsText">
                <ControlLabel>Name</ControlLabel>
                <FormControl 
                  placeholder="Enter photo name" 
                  type="text" 
                  name="name" 
                  onChange={this.handleChange}>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formControlsText">
                <ControlLabel>Date</ControlLabel>
                <FormControl 
                  placeholder="Date photo was taken" 
                  type="text" 
                  name="date" 
                  onChange={this.handleChange}>
                </FormControl>
              </FormGroup>

              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Description</ControlLabel>
                <FormControl 
                  componentClass="textarea" 
                  placeholder="Enter a description of your photo" 
                  name="description" 
                  onChange={this.handleChange}>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <Radio name="radioGroup" inline>
                  <FormGroup controlId="formControlsText">
                    <ControlLabel>URL</ControlLabel>
                    <FormControl 
                      placeholder="Enter photo url" 
                      type="text"
                      name="url" 
                      onChange={this.handleChange}>
                    </FormControl>
                  </FormGroup>
                </Radio>

                <Radio name="radioGroup" inline>
                  <FormGroup controlId="formControlsFile">
                    <ControlLabel>File</ControlLabel>
                    <FormControl 
                      type="file"
                      name="file"
                      onChange={this.handleFileUpload}>
                    </FormControl>
                  </FormGroup>
                </Radio>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.handleSubmit}>Add Photo</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Form inline>
          <FormGroup controlId="formControlsText">
            <FormControl 
              placeholder="Photo name" 
              type="text" name="name" 
              onChange={this.handleChange}>
            </FormControl>
          </FormGroup>{' '}
          <Button type="submit">Search</Button>
        </Form>

      </BannerContainer>
    );
  }
}
  
export default Banner;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 0 30px;
`