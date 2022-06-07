import { Component } from 'react';

const profileURL = 'https://mighty-oasis-08080.herokuapp.com/api/user';
class Settings extends Component {
  constructor(props) {
    super(props);
    let { user } = props;
    this.state = {
      image: user.image,
      username: user.username,
      bio: user.bio,
      email: user.email,
      password: '',
      errors: {
        email: '',
      },
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      let errors = this.state.errors;
      errors.email = !value.includes('@') ? 'email must contain @' : '';
    }
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, bio, image, username, password } = this.state;
    fetch(profileURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: {
          email,
          username,
          password,
          bio,
          image,
        },
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then(({ user }) => {
      console.log(user);
      });
  };
  render() {
    let { username, email, image, password, bio, errors } = this.state;
    return (
      <div className="cotainer">
        <center>
          <h2>This is Settings</h2>
        </center>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="URL of profile picture"
            value={image}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            placeholder="Short Bio about you"
            value={bio}
            onChange={(event) => {
              this.handleChange(event);
            }}
          ></textarea>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
          <p className="error">{errors.email}</p>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="New Password"
            value={password}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
          <input type="submit" value="Update Profile" disabled={errors.email} />
        </form>
      </div>
    );
  }
}

export default Settings;
