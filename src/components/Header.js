import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className="flex">
      <Link to="/Home">
              Conduit
          </Link>
      <nav>
          <Link to="/login">
              Login
          </Link>
          <Link to="/signup">
              SignUp
          </Link>
      </nav>
    </div>
  );
}
export default Header;
