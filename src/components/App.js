import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Article from './Article';
import Tag from './Tag';
import Loader from './Loader';

class App extends React.Component {
  state = {
    articles: null,
    user: null
  };
  setUser = (user) => {
    console.log(user);
    this.setState({user});
  }
  componentDidMount() {
    console.log(localStorage);
    this.setState({user: JSON.parse(localStorage.getItem('loggedInUser')) || null});
    fetch('https://mighty-oasis-08080.herokuapp.com/api/articles')
      .then((data) => data.json())
      .then(({ articles }) => this.setState({ articles }))
      .catch((error) => console.log(error));
  }
  componentWillUnmount() {
    localStorage.setItem("loggedInUser", JSON.stringify(this.state.user))
  }
  render() {    
    let articles = this.state.articles;
    if (!articles) {
      return <Loader />;
    }    
    return (
      <div className="container">
        <Router>
          <Header user= {this.state.user}/>
          <Routes>
            <Route index element={<Home articles={articles} user ={this.state.user}/>} />
            <Route path="/home" element={<Home articles={articles} user={this.state.user}/>} />
            <Route path="/login" element={<Login setUser = {this.setUser}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:slug" element={<Article/>} />
            <Route path="/tag" element={<Tag articles={articles}/>} />
            <Route path='*' element={<h2>This page cannot be displayed. 404 Error</h2>} />
          </Routes>
        </Router>
      </div>
    );
  }
}
export default App;
