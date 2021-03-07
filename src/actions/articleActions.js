const loadArticles = (articles) => ({ type: "LOAD_ARTICLES", payload: articles})

export const getArticles = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/articles")
      .then(res => res.json())
      .then(res => dispatch(loadArticles(res)))
  }
}
