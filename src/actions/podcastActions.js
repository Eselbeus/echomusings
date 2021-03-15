const loadPodcasts = (podcasts) => ({ type: "LOAD_PODCASTS", payload: podcasts})

const newPodcast = (podcast) => ({type: "POST_PODCAST", payload: podcast})

export const getPodcasts = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/podcasts")
      .then(res => res.json())
      .then(res => dispatch(loadPodcasts(res)))
  }
}

export const postPodcast = (id, config) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/podcasts/`, config)
      .then(res => res.json())
      .then(res => {
        dispatch(newPodcast(res))
      })
  }
}
