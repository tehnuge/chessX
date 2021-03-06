/* global Materialize */
import React from 'react';
import UserApi from '../../api/user_api';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.success = this.success.bind(this);

    this.state = {username: '', password: ''};
  }

  setUsername(e) {
    this.setState({username: e.currentTarget.value});
  }

  setPassword(e) {
    this.setState({password: e.currentTarget.value});
  }

  resetState() {
    this.setState({username: '', password: ''});
  }

  handleSubmit(e) {
    e.preventDefault();
    UserApi.login(this.state, this.success);
  }

  success(data) {
    this.resetState();
    $('#login-modal').closeModal();
    Materialize.toast(
      'Welcome back, ' + data.username + '!', 2000, 'success-text'
    );
  }

  render() {
    if (this.state.currentUser) {
      return null;
    } else {
      return (
        <div id="login-modal" className="modal">
          <div className='row'>
            <form onSubmit={this.handleSubmit}>

              <div className="modal-content">

                <div className='row'>
                  <div className='input-field'>
                    <input id="login[username]"
                           type="text"
                           value={this.state.username}
                           onChange={this.setUsername} />
                    <label htmlFor="login[username]">Username</label>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field'>
                    <input id="login[password]"
                           type="password"
                           value={this.state.password}
                           onChange={this.setPassword} />
                    <label htmlFor="login[password]">Password</label>
                  </div>
                </div>
              </div>
              <input type="submit" hidden />
              <div className='modal-footer'>
                <a onClick={this.handleSubmit} className="waves-effect waves-light btn">
                  Login
                </a>
              </div>

            </form>
          </div>
        </div>
      );
    }
  }
};

export default LoginForm;
