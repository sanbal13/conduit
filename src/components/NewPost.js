import React from 'react';
import WithRouter from './WithRouter';

let createArticleURL = 'https://mighty-oasis-08080.herokuapp.com/api/articles';

class NewPost extends React.Component {  
  state = {
    title: '',
    description: '',
    article: '',
    tagList: [],
    existingTagList: [],
    errors: {
      title: '',
      description: '',
      article: '',
      tagList: '',
    },
  };
  componentDidMount() {
    if(this.props.params.slug) {
      let slug = this.props.params.slug;
      console.log(slug);
      let getArticleURL =`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`;
      fetch(getArticleURL).then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
        return res.json()
      }
      ).then(({article}) => {
        const {title, description, body, tagList} = article;
        this.setState({
          title,
          description,
          article: body,
          existingTagList: tagList
        })
      })

    }
  }
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
    if(this.props.params.slug) {
      let slug =  this.props.params.slug;
      let editArticleURL =`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`;
      fetch(editArticleURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.props.token}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body: article,
            tagList: this.state.existingTagList.concat(tagList),            
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
    } else {
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
      });}
  };
  handleDeleteTag = (deleteTag) => {    
    let existingTagList = this.state.existingTagList;
    console.log(existingTagList);
    existingTagList = existingTagList.filter(tag => tag !== deleteTag);
    console.log(existingTagList, 'After Filter');
    this.setState({
      existingTagList
    });
  }
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
          <div className="flex justify-start" style={{ width: '100%'}}>
          {this.props.params.slug ? this.state.existingTagList.map(tag => {
            return <div className="existing-tag flex" key={tag} onClick={() => this.handleDeleteTag(tag)}>
            <div>{tag}</div>             
            <div className="tag-close flex center">x</div>
            </div>
          }) : <p className="error">{errors.tagList}</p>}
          </div>
          
          <input
            type="submit"
            value="Publish Article"
            disabled={              
              article === '' ||
              title === '' ||
              description === '' ||
              (tagList.length === 0 && !this.state.existingTagList)             
            }
          />
        </form>
      </div>
    );
  }
}
export default WithRouter(NewPost);
