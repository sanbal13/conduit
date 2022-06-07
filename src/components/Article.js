import { useParams } from 'react-router-dom';
import Hero from './Hero';

function Article(props) {
  let slug = useParams().slug;
  let article = props.articles.find((article) => article.slug === slug);
 
  return (
    <div className="article-details">
      <Hero title={article.title} author={article.author} user={props.user}/>
      <div className="container">
        <p className='article-body'>{article.body}</p>
      </div>
    </div>
  );
}
export default Article;
