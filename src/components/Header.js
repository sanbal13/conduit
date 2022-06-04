import { Link } from 'react-router-dom';
function Header(props) {
  return (
    <>
      <div className="userDetail">
        {props.user && 'Welcome ' + props.user.username}
      </div>
      <div className="flex">
        <Link to="/Home">Conduit</Link>
        <nav>
          {props.user ? <AuthorizedNav /> : <UnauthorizedNav />}
        </nav>
      </div>
    </>
  );
}

function AuthorizedNav() {
  return (
    <nav>
      <Link to="/home">Home </Link>
      <Link to="/new-post">New Article </Link>
      <Link to="/settings">Settings </Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
function UnauthorizedNav() {
  return (
    <nav>
      <Link to="/home">Home </Link>
      <Link to="/login">Login </Link>
      <Link to="/signup">SignUp </Link>
    </nav>
  );
}
export default Header;
