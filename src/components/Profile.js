import Hero from './Hero';
import React from 'react';
import withRouter from './WithRouter';

class Profile extends React.Component {
  state = {
    favouriteArticles: false,
  };
  handleFavouriteArticles = (boolean) => {
    this.setState({
      favouriteArticles: boolean,
    });
  };
  render() {
    let username = this.props.params.user;
    let favouriteArticles = this.state.favouriteArticles;
    let articles = this.props.articles.filter(
      (article) => article.author.username === username
    );
    return (
      <div className="profile">
        <Hero author={articles[0].author} user={this.props.user} />
        
        <div className="articles container">
        <div className="flex justify-start">
        <h3 style={{borderBottom:'1px solid green', cursor: 'pointer'}} onClick={() => this.handleFavouriteArticles(false)}>My Articles</h3>
        <h3 style={{marginLeft: '1rem', borderBottom:'1px solid green', cursor: 'pointer'}} onClick={() => this.handleFavouriteArticles(true)}>
          Favourite Articles
        </h3>
        </div>
          {!this.state.favouriteArticles ? (
            articles.map((article) => {
              return (
                <div key={article.slug} className="article">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              );
            })
          ) : (
            <h3>No articles yet</h3>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Profile);
