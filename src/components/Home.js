import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';
class Home extends React.Component {
  state = {
    page: 0,
  };

  handleFavorite = (slug) => {   
    console.log(this.props.user.token);
    let favoriteURL=`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/favorite`
    fetch(favoriteURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Token ${this.props.user.token}`
      }
    }).then(res => {
      if(!res.ok) {
        let error = res.json();
        return Promise.reject(error);
      }
      res.json()}).then(data => console.log(data)).catch(error => console.log(error))
  }

  render() {
    let { page } = this.state;
    let articles = this.props.articles;
    
    if (!articles) {
      return <Loader />;
    }
   
    let allTags = articles.reduce((acc, cv) => acc.concat(cv.tagList), []);
    let allUniqueTags = Array.from(new Set(allTags)).filter(
      (item) => item !== ''
    );

    return (
      <>
        <div className="flex flex-start container">
          <section className="main flex-65">
            <h5>Global Feed</h5>
            <ul>
              {articles
                .filter(
                  (_article, index) =>
                    index >= page * 10 && index < (page + 1) * 10
                )
                .map((article) => {
                  return (
                    <li key={article.slug} className="article-info">
                      <h5>{article.author.username}</h5>
                      <h5>
                        {new Date(
                          article.createdAt.slice(0, 10)
                        ).toLocaleDateString()}
                      </h5>
                      <div className="heart">
                        <div
                          className="heart1"
                          style={{ border: '2px solid orange' }}
                          onClick={() => {
                            this.handleFavorite(article.slug);
                          }}
                        ></div>
                        <div
                          className="heart2"
                          style={{ border: '2px solid orange' }}
                          onClick={() => {
                            this.handleFavorite(article.slug);
                          }}
                        ></div>
                        {article.favoritesCount}
                      </div>
                      <h4>{article.title}</h4>
                      <p>{article.description}</p>
                      <Link to={`/article/${article.slug}`} className="button">
                        Read More...
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>
          <section className="aside flex-30">
            <ul>
              {allUniqueTags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section className="container pagination">
          {Array.from(
            { length: Math.ceil(articles.length / 10) },
            (_, i) => 1 + i
          ).map((pageNo) => (
            <span
              className="pageNo"
              key={pageNo}
              onClick={() => this.setState({ page: pageNo - 1 })}
            >
              {pageNo}
            </span>
          ))}
        </section>
      </>
    );
  }
}
export default Home;
