import {Link} from 'react-router-dom';



function Hero(props) {   
  let username = props.author.username;  
  function handleFollow() {
    let followURL = `https://mighty-oasis-08080.herokuapp.com/api/profiles/${username}/follow`;
    fetch(followURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${props.user.token}` 
      }
    }).then(res => console.log(res));

  }
  return (
    <div className="hero">
      <div className="container">
      <center><h2>{props.title}</h2></center>
      <Link to={`/profile/${props.author.username}`}>
      <h3 className="username">{props.author.username}</h3>      
      <img src={props.author.image} alt={props.author.username} />
      </Link>
      <h4 className="bio">{props.author.bio ? props.author.bio: ''}</h4>
      {props.user && (props.author.username === props.user.username ? <Link to="/settings" className='edit'>Edit setting</Link> : <button onClick={handleFollow}>Follow</button>)}
      </div>
    </div>
  );
}
export default Hero;
