import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import AdminDashboard from './AdminDashboard';
import './App.css';

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.fetchSubmissions();
  }

  fetchSubmissions = () => {
    fetch('https://social-media-tasks-backend.onrender.com/submissions')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  handleNewSubmission = () => {
    this.fetchSubmissions();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/">User Form</Link>
            <Link to="/admin">Admin Dashboard</Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={<UserForm onSubmissionSuccess={this.handleNewSubmission} />}
            />
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
