import { Component } from 'react';
import validate from '../utils/validate';
import WithRouter from './WithRouter';

let baseURL = 'https://mighty-oasis-08080.herokuapp.com/api';
let loginURL = '/users/login';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseURL + loginURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid username/password');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ user: data.user });
        this.props.setUser(data.user);
        this.props.navigate('/');
      })
      .catch((err) =>
        this.setState({ errorsDetail: 'Email/Password is invalid' })
      );
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({
      [name]: value,
      errors,
    });
  };
  render() {
    let { email, password, errors } = this.state;

    return (
      <>
        <center>
          <h2>Login</h2>
          <p>Don't have account? Create One.</p>
        </center>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className="flex flex-column"
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => this.handleChange(e)}
          />
          <span className="error">{errors.email}</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => this.handleChange(e)}
            autoComplete="off"
          />
          <span className="error">{errors.password}</span>
          <span className="error">{this.state.errorsDetail}</span>
          <input type="submit" value="Log In" />
        </form>
        {this.state.user && (
          <>
            <h3>{'username: ' + this.state.user.username}</h3>
            <h4>{'email: ' + this.state.user.email}</h4>
            <h4>{'token: ' + this.state.user.token}</h4>
          </>
        )}
        
      </>
    );
  }
}

export default WithRouter(Login);
