import React from 'react';
import { Link } from 'react-router-dom';
import WithRouter from './WithRouter';
class Header extends React.Component { 
  handleLogout = (setUser) => {
    localStorage.setItem('loggedInUser', JSON.stringify(null));
    setUser(null);
    this.props.navigate('./login');
    console.log(this.props, this.props);
  }
  render() {
    return (
      <div className="container">
        <div className="userDetail">
          {this.props.user && 'Welcome ' + this.props.user.username}
        </div>
        <div className="flex">
          <Link to="/">Conduit</Link>
          <nav>
            {this.props.user ? <AuthorizedNav setUser={this.props.setUser} user={this.props.user} handleLogout={this.handleLogout}/> : <UnauthorizedNav />}
          </nav>
        </div>
      </div>
    );
  }
}

function AuthorizedNav(props) {
  return (
    
    <nav>
      <Link to="/">Home </Link>
      <Link to="/new-post">New Article </Link>
      <Link to="/settings">Settings </Link>
      <Link to={`/profile/${props.user.username}`}>Profile</Link>
      <button className='logout' onClick={() => props.handleLogout(props.setUser)}>Logout</button>
    </nav>
  
  );
}
function UnauthorizedNav() {
  return (
    <nav>
      <Link to="/">Home </Link>
      <Link to="/login">Login </Link>
      <Link to="/signup">SignUp </Link>
    </nav>
  );
}
export default WithRouter(Header);
