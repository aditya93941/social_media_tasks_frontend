import React, { Component } from 'react';
import './App.css';

class UserForm extends Component {
  state = {
    name: '',
    handle: '',
    images: [],
    onSubmit: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, handle, images } = this.state;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('handle', handle);

    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });

    fetch('https://social-media-tasks-backend.onrender.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ name: '', handle: '', images: [], onSubmit: true });

        // Set a timeout to hide the message after 3 seconds
        setTimeout(() => {
          this.setState({ onSubmit: false });
        }, 3000);

        this.props.onSubmissionSuccess();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleFileChange = (e) => {
    this.setState({
      images: Array.from(e.target.files),
    });
  };

  render() {
    const { name, handle, onSubmit } = this.state;

    return (
      <div className="user-form">
        <h2>Submit Your Details</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
            required
          />

          <label>Social Media Handle</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => this.setState({ handle: e.target.value })}
            required
          />

          <label>Upload Images</label>
          <input
            type="file"
            multiple
            onChange={this.handleFileChange}
            required
          />

          <button type="submit">Submit</button>

          {onSubmit && <p className="onSubmit">Form Submitted Successfully!!</p>}
        </form>
      </div>
    );
  }
}

export default UserForm;
