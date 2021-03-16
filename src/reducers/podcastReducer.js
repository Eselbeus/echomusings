const initialState = []

const podcastReducer = (podcastState = initialState, action) => {
  switch (action.type) {
    case("LOAD_PODCASTS"): {
      return { ...podcastState, podcasts: action.payload }
    }
    case("POST_PODCAST"): {
      return { ...podcastState, podcasts: [...podcastState.podcasts, action.payload]}
    }
    case("DELETE_PODCAST"): {
      let filteredPodcasts = podcastState.podcasts.filter(podcast => {
        return podcast.id !== action.payload
      })
      return { ...podcastState, podcasts: filteredPodcasts }
    }
    default:
      return podcastState
  }
}

export default podcastReducer;
