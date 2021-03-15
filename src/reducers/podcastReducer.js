const initialState = []

const podcastReducer = (podcastState = initialState, action) => {
  switch (action.type) {
    case("LOAD_PODCASTS"): {
      return { ...podcastState, podcasts: action.payload }
    }
    case("POST_PODCAST"): {
      return { ...podcastState, podcasts: [...podcastState.podcasts, action.payload]}
    }
    default:
      return podcastState
  }
}

export default podcastReducer;
