const loadPodcasts = (podcasts) => ({ type: "LOAD_PODCASTS", payload: podcasts})

export const getPodcasts = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/podcasts")
      .then(res => res.json())
      .then(res => dispatch(loadPodcasts(res)))
  }
}
