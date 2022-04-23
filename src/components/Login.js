import { Component } from 'react';
import { Link } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
  };
  handleChange = (event) => {
    let field = event.target.id;
    let value = event.target.value;
    let error = field + 'Error';

    this.setState({
      [event.target.id]: value,
      [error]: this.validate(field, value),
    });
  };
  validate = (field, value) => {
    let { email, password } = this.state;
    if (field === 'email') {
      return email.includes('@') ? 'Email must contain @' : null;
    } else if (field === 'password') {
      return /\d/.test(password)
        ? 'Email must contain atleast 6 characters and it must contain a number'
        : null;
    }
  };
  render() {
    let { email, password, emailError, passwordError } = this.state;
    return (
      <>
        <h1>Login Page</h1>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(event) => this.handleChange(event)}
          />
          <div className="error">{emailError}</div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => this.handleChange(event)}
          />
          <div className="error">{passwordError}</div>
          <input type="submit" value="Login" />
          <Link to="/signup">SignUp</Link>
        </form>
      </>
    );
  }
}

export default Login;
