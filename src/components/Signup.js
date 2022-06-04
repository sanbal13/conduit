import { Component } from 'react';
import { Link } from 'react-router-dom';
import validate from '../utils/validate';
import { Navigate, useNavigate } from 'react-router-dom';

let baseURL = 'https://mighty-oasis-08080.herokuapp.com/api';
let signupURL = '/users';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
    },
  };

  handleSubmit = (event) => {
    const { username, email, password } = this.state;
    event.preventDefault();
    fetch(baseURL + signupURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Username already exists');
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ user: data.user });
        this.props.setUser(data.user);
        this.props.navigate('/home');
      })
      .catch((err) => {
        this.setState({ err: err.message });
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({
      [name]: value,
      errors,
    });
  };
  render() {
    let { email, password, username, errors } = this.state;
    return (
      <>
        <h1>Signup Page</h1>
        <span className="error">{this.state.err}</span>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(event) => this.handleChange(event)}
            placeholder="Enter email"
          />
          <div className="error">{errors.email}</div>
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={(event) => this.handleChange(event)}
            placeholder="Enter username"
          />
          <div className="error">{errors.username}</div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => this.handleChange(event)}
            placeholder="Enter password"
            autoComplete="off"
          />
          <div className="error">{errors.password}</div>

          <input type="submit" value="Signup" />

          <Link to="/login">Login</Link>
        </form>
        {this.state.user && 'You are registered as ' + this.state.user.username}
        {this.state.user && <Navigate to="/home" replace={true} />}
      </>
    );
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter(Signup);
