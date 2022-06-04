import { Component } from 'react';
import validate from '../utils/validate';
import { Navigate } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
        this.props.router.navigate('/home');
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
        {this.state.user && <Navigate to="/home" replace={true} />}
      </>
    );
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default withRouter(Login);
