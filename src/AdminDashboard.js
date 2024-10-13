import React, { Component } from 'react';

class AdminDashboard extends Component {
  state = {
    submissions: [],
  };

  componentDidMount() {
    this.fetchSubmissions();
  }

  fetchSubmissions = () => {
    fetch('https://social-media-tasks-backend.onrender.com/submissions')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ submissions: Array.isArray(data) ? data : [] });
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
        this.setState({ submissions: [] });
      });
  };

  handleDelete = (id) => {
    console.log(`Requesting delete for submission ID: ${id}`);
    fetch(`https://social-media-tasks-backend.onrender.com/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Successfully deleted submission with ID: ${id}`);
          this.fetchSubmissions();
        } else {
          console.error('Failed to delete submission');
        }
      })
      .catch((error) => {
        console.error('Error deleting submission:', error);
      });
  };

  render() {
    const { submissions } = this.state;

    return (
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        <div className="submissions">
          {submissions.length === 0 ? (
            <p>No submissions found</p>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="submission-card">
                <h3>{submission.name}</h3>
                <p>@{submission.handle}</p>
                <div>
                  {submission.images.map((image, index) => (
                    <img key={index} src={image} alt={`Uploaded image ${index + 1}`} width="100" />
                  ))}
                </div>
                <button onClick={() => this.handleDelete(submission.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
