import { useParams, Link } from 'react-router-dom';
import Hero from './Hero';
import Comment from './Comment';
import React from 'react';
import withRouter from './WithRouter';
import Loader from './Loader';

class Article extends React.Component {
  state = {
    article: null,
  }
  componentDidMount() {
    let slug =this.props.params.slug;
    console.log(slug);
    let getArticleURL =`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`;
    fetch(getArticleURL).then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error));
      }
      return res.json()
    }
    ).then(({article}) => {      
      this.setState({
        article
      })
    })
  }
  render() {  
    const article = this.state.article;
    if(!article) {
    return <div className="container"> <Loader /></div>    
    }
    return (
      <div className="article-details">
        <Hero title={article.title} author={article.author} user={this.props.user} slug={article.slug}/>
        <div className="container">
          <h3>{article.title}</h3>
          <h4>{article.description}</h4>
          <p className="article-body">{article.body}</p>         
          {this.props.user ? <Comment user={this.props.user} article={article}/> :
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
 
}
export default withRouter(Article);
