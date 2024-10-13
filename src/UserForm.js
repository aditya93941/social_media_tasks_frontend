import React, { Component } from 'react';
import './App.css';
class UserForm extends Component {
  state = {
    name: '',
    handle: '',
    images: [],
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
    const { name, handle } = this.state;

    return (
      <div className="user-form">
        <h2>Submit Your Details</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
          </label>

          <label>
            Social Media Handle:
            <input
              type="text"
              value={handle}
              onChange={(e) => this.setState({ handle: e.target.value })}
              required
            />
          </label>

          <label>
            Upload Images:
            <input
              type="file"
              multiple
              onChange={this.handleFileChange}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
