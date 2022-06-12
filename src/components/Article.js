import { useParams, Link } from 'react-router-dom';
import Hero from './Hero';
import Comment from './Comment';

function Article(props) {
  let slug = useParams().slug;
  let article = props.articles.find((article) => article.slug === slug);

  return (
    <div className="article-details">
      <Hero title={article.title} author={article.author} user={props.user} slug={article.slug}/>
      <div className="container">
        <p className="article-body">{article.body}</p>
       
        {props.user ? <Comment user={props.user} article={article}/> :
        (<p>
        <Link to='/login'>Log in </Link> 
        or 
        <Link to='/signup'> Sign up </Link>
        to add comments on this article</p>)
        }
      </div>
    </div>
  );
}
export default Article;
