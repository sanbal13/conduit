import { Link } from 'react-router-dom';
import withRouter from './WithRouter';

function Hero(props) {
  let username = props.author.username;
  function handleFollow() {
    let followURL = `https://mighty-oasis-08080.herokuapp.com/api/profiles/${username}/follow`;
    fetch(followURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.user.token}`,
      },
    }).then((res) => console.log(res));
  }
  function handleDelete() {
    let deleteURL = `https://mighty-oasis-08080.herokuapp.com/api//articles/${props.slug}`;
    fetch(deleteURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${props.user.token}`
      }
    }).then(res => {
      if(!res.ok) {
        return res.json().then(data => Promise.reject("Article not deleted"));
      }
      props.navigate(`/profile/${props.author.username}`);
    }).catch(error => console.log(error));
  }
  return (
    <div className="hero">
      <div className="container">
        <center>
          <h2>{props.title}</h2>
        </center>
        <Link to={`/profile/${props.author.username}`}>
          <h3 className="username">{props.author.username}</h3>
          <img src={props.author.image} alt={props.author.username} />
        </Link>
        <h4 className="bio">{props.author.bio ? props.author.bio : ''}</h4>
        {props.user &&
          (props.author.username === props.user.username ? (
            <div className="flex">
            <Link to="/settings" className="settings-btn">
              Edit setting
            </Link>
            <div className="article-section">
            <Link to={`/article/edit/${props.slug}`} className="edit-btn">
              Edit Article
            </Link>
            <button className="delete-btn" onClick={() => handleDelete()}>
              Delete Article
            </button>
            </div>
            </div>
          ) : (
            <button onClick={() => handleFollow}>Follow</button>
          ))}
      </div>
    </div>
  );
}
export default withRouter(Hero);
