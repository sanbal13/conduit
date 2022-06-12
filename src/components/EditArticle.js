import React from 'react';
import WithRouter from './WithRouter';

let createArticleURL = 'https://mighty-oasis-08080.herokuapp.com/api/articles';
class NewPost extends React.Component {
    
  state = {
    title: '',
    description: '',
    article: '',
    tagList: [],
    errors: {
      title: '',
      description: '',
      article: '',
      tagList: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = this.state.errors;
    errors[name] = value.length < 1 ? name + ' is required' : '';
    this.setState({
      [name]:
        name === 'tagList'
          ? value.split(',')
          : value,
      errors,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let { title, description, article, tagList } = this.state;
    fetch(createArticleURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body: article,
          tagList,
        },
      }),
    })
      .then((res) => res.json())
      .then(({ article }) => {
        this.setState({
          title: '',
          description: '',
          article: '',
          tagList: [],
        });
        console.log(article);
        this.props.navigate(`/article/${article.slug}`);
      });
  };
  render() {
    const { title, description, article, tagList, errors } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="flex flex-column"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Article Title"
            value={title}
            onChange={(event) => this.handleChange(event)}
          />
          <p className="error">{errors.title}</p>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Article Description"
            value={description}
            onChange={(event) => this.handleChange(event)}
          />
          <p className="error">{errors.description}</p>
          <textarea
            name="article"
            id="article"
            cols="30"
            rows="10"
            placeholder="Write your article (in markdown)"
            onChange={(event) => this.handleChange(event)}
            value={article}
          ></textarea>
          <p className="error">{errors.article}</p>
          <input
            type="text"
            name="tagList"
            id="tagList"
            placeholder="Enter tags separated by commas"
            value={tagList.join(',')}
            onChange={(event) => this.handleChange(event)}
          />
          <p className="error">{errors.tagList}</p>
          <input
            type="submit"
            value="Publish Article"
            disabled={              
              article === '' ||
              title === '' ||
              description === '' ||
              tagList.length === 0             
            }
          />
        </form>
      </div>
    );
  }
}
export default WithRouter(NewPost);
