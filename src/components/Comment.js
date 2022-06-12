import React from 'react';

class Comment extends React.Component {
  commentURL = `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.article.slug}/comments`;
  state = {
    comment: '',
    comments: []
  };
  componentDidMount() {
    fetch(this.commentURL)
    .then(res => {
        if(!res.ok) {
            return res.json().then(data => Promise.reject('Comments not fetched successfully'))
        }
        return res.json()
    }).then(({comments}) =>{this.setState({comments}); console.log(comments)}).catch(error => console.log(error));
  }
  handleChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };
  handleSubmit = () => {   
    console.log(this.state.comment,'comment-before update');    
    fetch(this.commentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Token ${this.props.user.token}`
        },
        body: JSON.stringify({
            "comment": {
              "body": this.state.comment
            }
          })
    }).then(res => {
        if(!res.ok) {
            return res.json().then((data) => Promise.reject('Error in adding comment'));
        }
        return res.json();
    }).then(data => this.setState({comment: ''})).catch((error) => console.log(error));
    console.log(this.state.comment, 'comment-after')
  }
  
  /* handleSubmit1 = async() => {   
    console.log(this.state.comment,'comment-before update');    
    let fetchData = await fetch(this.commentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Token ${this.props.user.token}`
        },
        body: JSON.stringify({
            "comment": {
              "body": this.state.comment
            }
          })
    })
    console.log(this.state.comment, 'comment-after')
    console.log(fetchData, 'fetchData');
    let data = await fetchData.json();
    console.log(data);
    await this.setState({comment: ''});
  } */

  handleDelete = (id) => {
    fetch(this.commentURL + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Token ${this.props.user.token}`
        }
    }).then(res => console.log(res));
       
  }

  render() {
    const { username, image } = this.props.user;
    return (
      <div className="comment-container">
        <textarea
          name="comment"
          id="comment"
          className="comment-content"
          cols="10"
          rows="5"
          placeholder="Add your comment..."
          onChange={this.handleChange}
        ></textarea>
        <div className="flex comment-footer">
          <div className="comment-user-info flex">
            <img src={image} alt={username} className="comment-img" />
            <span>{username}</span>
          </div>
          <input type="submit" value="Post Comment" onClick={this.handleSubmit}/>
        </div>
        {
            this.state.comments.map(comment => {
                const dateObject = new Date(comment.createdAt)
                const date = dateObject.toLocaleString();
               return (<div key={comment.id}><textarea
          name="comment"
          id="comment"
          className="comment-content"
          cols="10"
          rows="5"
          placeholder="Add your comment..."
          onChange={this.handleChange}
          value={comment.body}
        ></textarea>

        <div className="flex comment-footer padding-1rem">
          <div className="comment-user-info flex">
            <img src={comment.author.image} alt={comment.author.username} className="comment-img" />
            <span>{comment.author.username}</span>
            <p>{date}</p>
          </div>          
           {comment.author.username === username && 
           <input type="button" className='comment-delete-btn' onClick={() => this.handleDelete(comment.id)} value='🗑️' />}
        </div>
        </div>)
            })
        }
      </div>
    );
  }
}
export default Comment;
