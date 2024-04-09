import React, { useEffect } from 'react';
import PT from 'prop-types';
// import axios from 'axios';
import { Navigate } from 'react-router-dom';
// import  axiosWithAuth  from '../axios';

export default function Articles(props) {
  const {
    articles,
    getArticles,
    deleteArticle,
    currentArticleId,
    setCurrentArticleId,
  } = props;

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }
  // if (currentArticleId === article_id) {
  //   setCurrentArticleId(null); // 
  // }
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate('/');
    } else {
      getArticles();
    }
  }, []);

  const handleDeleteClick = (article_id) => {
    deleteArticle(article_id);
    setCurrentArticleId(null);
    // getArticles();
    
  };

  const handleEditClick = (article_id) => {
    // Corrected placement of this function inside the Articles component
    
    setCurrentArticleId(article_id)
    // if (currentArticleId === article_id) {
    //   setCurrentArticleId(null); // 
    // }
  };
 
  
  return (
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0
        ? 'No articles yet'
        : articles.map((art) => (
            <div className="article" key={art.article_id}>
              <div>
                <h3>{art.title}</h3>
                <p>{art.text}</p>
                <p>Topic: {art.topic}</p>
              </div>
              <div>
                {/* Corrected onClick functions */}
                <button disabled={!!currentArticleId} onClick={() => handleEditClick(art.article_id)}>Edit</button>
                <button disabled={!!currentArticleId} onClick={() => handleDeleteClick(art.article_id)}>Delete</button>
              </div>
            </div>
          ))}
    </div>
  );
}


Articles.propTypes = {
  articles: PT.arrayOf(
    PT.shape({
      article_id: PT.number.isRequired,
      title: PT.string.isRequired,
      text: PT.string.isRequired,
      topic: PT.string.isRequired,
    })
  ).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, 
};
