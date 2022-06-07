import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Article from './Article';
import Tag from './Tag';
import Loader from './Loader';
import NewPost from './NewPost';
import Settings from './Settings';
import Profile from './Profile';

class App extends React.Component {
  state = {
    articles: null,
    user: null,
  };
  setUser = (user) => {
    console.log(user);
    this.setState({ user });
  };
  componentDidMount() {
    let loggedInUser = localStorage.getItem('loggedInUser');
    let token = loggedInUser !== 'null' && (loggedInUser !== 'undefined') ? JSON.parse(loggedInUser).token : null;
    if(token) {
    fetch('https://mighty-oasis-08080.herokuapp.com/api/user', {
      method: 'GET',
      headers: { Authorization: 'Token ' + token },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ user: data.user }));
  }
    fetch('https://mighty-oasis-08080.herokuapp.com/api/articles')
      .then((data) => data.json())
      .then(({ articles }) => this.setState({ articles }))
      .catch((error) => console.log(error));
    window.addEventListener('beforeunload', this.handleUpdateLocalStorage);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUpdateLocalStorage);
  }
  handleUpdateLocalStorage = () => {
    localStorage.setItem('loggedInUser', JSON.stringify(this.state.user));
  };
  render() {
    let articles = this.state.articles;
    if (!articles) {
      return <Loader />;
    }
    return (
      <>
        <Router>
          <Header user={this.state.user} setUser={this.setUser}/>          
          {this.state.user ? <AuthorizedRoutes user={this.state.user} articles={articles}
          /> : <UnauthorizedRoutes setUser={this.setUser} articles={articles}
          />}
        </Router>
      </>
    );
  }
}

function AuthorizedRoutes(props) {
  return (
    <Routes>
            <Route
              index
              element={<Home articles={props.articles} user={props.user} />}
            />
                       
            <Route path="/article/:slug" element={<Article articles={props.articles} user={props.user}/>} />
            <Route path="/tag" element={<Tag articles={props.articles} />} />
            <Route path="/new-post" element={<NewPost token={props.user.token}/>} />
            <Route path="/settings" element={<Settings user={props.user} />} />
            <Route path="/profile/:user" element={<Profile articles={props.articles}  user={props.user}/>} />
            <Route
              path="*"
              element={<h2 className='container'>This page cannot be displayed. 404 Error</h2>}
            />
          </Routes>
  )
}
function UnauthorizedRoutes(props) {
  return (
    <Routes>
            <Route
              index
              element={<Home articles={props.articles} />}
            />
            
            <Route path="/login" element={<Login setUser={props.setUser} />} />
            <Route path="/signup" element={<Signup setUser={props.setUser}/>} />
            <Route path="/article/:slug" element={<Article articles={props.articles}/>} />
            <Route path="/tag" element={<Tag articles={props.articles} />} />            
            <Route
              path="*"
              element={<h2 className='container'>This page cannot be displayed. 404 Error</h2>}
            />
          </Routes>
  )
}


export default App;
