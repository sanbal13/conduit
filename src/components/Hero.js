function Hero(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <span className="username">{props.author.username}</span>
      <span className="bio">{props.author.bio}</span>
      <img src={props.author.image} alt={props.author.username} />
    </>
  );
}
export default Hero;
