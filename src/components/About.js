import React from 'react'
import '../App.scss';

class About extends React.Component {
  render(){
    return (
      <div className="about">
        <div className="staff">
          <h2>Crystal Kim</h2>
          <p className="staff-bio">Crystal Kim has been a performing professional musician since she was 6 years old, and has also been working in newsrooms since 13 years old.  Initially trained as a classical pianist and winning many domestic and international competitions that are a part of the Music Teachers National Associations, she has very developed musicianship skills.  While still loving classical, her passions lie more with rock, pop, and new age genres.  She further extended her passions of sound into songwriting music tracks, and sound designing for various multimedia projects.  As someone who also loves going to concerts, she has also given reviews of many established concerts from ones at Carnegie Hall to Electric Zoo and rock concerts of various artists.  Since 2010, she has performed with a symphonic rock band, Symfinity which has gained success in the local New York City scene by playing at well known venues such as Irving Plaza, Stage 48, and Gramercy and opening for well known bands/artists like Sonata Arctica and Tarja.  Crystal is also a very accomplished audio engineer, producer, media journalist (audio and written), and photographer.
          </p>
        </div>
        <div className="staff">
          <h2>Kevin Mayorga</h2>
          <p className="staff-bio">Kevin Mayorga is a musician and an aspiring musicologist, aiming to make music his main career. He focuses on contemporary music such as Rock to help bridge the differences between the masses. He currently plays in his band Roschambeau and his solo project, Olinguito. He also enjoys video games and live streaming.
          </p>
        </div>
      </div>
    )
  }
}

export default About;
