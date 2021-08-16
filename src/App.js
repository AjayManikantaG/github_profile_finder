import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  users = {};

  async componentDidMount() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(process.env.REACT_APP_GITHUB_SECRET_KEY);
    this.setState({ loading: true });

    this.users = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_KEY}`
    );
    this.setState({ users: this.users.data, loading: false });
  }

  // Search Github User
  searchUsers = async (user) => {
    this.setState({ loading: true });
    this.users = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_KEY}`
    );
    this.setState({ users: this.users.data.items, loading: false });
  };

  // Clear all the users
  clearUsers = () => {
    this.setState({ users: [] });
  };

  // Get single user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_KEY}`
    );
    this.setState({ user: res.data, loading: false });
    console.log(res);
  };

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET_KEY}`
    );
    this.setState({ repos: res.data, loading: false });
    console.log(res);
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                    />
                    <Users
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
