const initialState = []

const articleReducer = (articleState = initialState, action) => {
  switch (action.type) {
    case("LOAD_ARTICLES"): {
      return { ...articleState, articles: action.payload }
    }
    default:
      return articleState
  }
}

export default articleReducer;
