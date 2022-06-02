import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';
class Home extends React.Component {
  state = {
    page: 0,
  };

  render() {
    let { page } = this.state;
    let articles = this.props.articles;
    
    if (!articles) {
      return <Loader />;
    }
   
    let allTags = articles.reduce((acc, cv) => acc.concat(cv.tagList), []);
    let allUniqueTags = Array.from(new Set(allTags));
    
    return (
      <>      
        <section className="main">
          <h5>Global Feed</h5>
          <ul>
            {articles
              .filter(
                (article, index) =>
                  index >= page * 10 && index < (page + 1) * 10
              )
              .map((article) => {
                return (
                  <li key={article.slug}>
                    <h5>{article.author.username}</h5>
                    <h5>
                      {new Date(
                        article.createdAt.slice(0, 10)
                      ).toLocaleDateString()}
                    </h5>
                    <div className="heart">
                      <div className="heart1"></div>
                      <div className="heart2"></div>
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
        <section className="aside">
          <ul>
            {allUniqueTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>
        <section className="pagination">
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
