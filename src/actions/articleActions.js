const loadArticles = (articles) => ({ type: "LOAD_ARTICLES", payload: articles})

const newArticle = (article) => ({type: "POST_ARTICLE", payload: article})

export const getArticles = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/articles")
      .then(res => res.json())
      .then(res => dispatch(loadArticles(res)))
  }
}

export const postArticle = (id, config) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/articles/`, config)
      .then(res => res.json())
      .then(res => {
        dispatch(newArticle(res))
      })
  }
}
