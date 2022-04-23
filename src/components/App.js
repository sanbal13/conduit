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
  };
  componentDidMount() {
    fetch('https://mighty-oasis-08080.herokuapp.com/api/articles')
      .then((data) => data.json())
      .then(({ articles }) => this.setState({ articles }))
      .catch((error) => console.log(error));
  }
  render() {    
    let articles = this.state.articles;
    if (!articles) {
      return <Loader />;
    }    
    return (
      <div className="container">
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home articles={articles}/>} />
            <Route path="/home" element={<Home articles={articles}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/article/:slug" element={<Article/>} />
            <Route path="/tag" element={<Tag articles={articles}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}
export default App;
