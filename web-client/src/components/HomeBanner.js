import React from 'react'

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className="home-banner-info">
        <h1 className="home-banner-info-h1">
          <span className="home-banner-info-h1-line-1">
            A <span>New Home</span> for
          </span>
          <br />{' '}
          <span className="home-banner-info-h1-line-2">
            <span>Alpha</span> Gamers
          </span>
        </h1>
        <p className="home-banner-info-text">
          Create your team, compete with others and earn real money.
          <br />
          Push your gaming limits. Start playing now!
        </p>
        <button className="home-banner-button">START PLAYING</button>
        {/* The START PLAYING button should take unauthenticated users to the Sign up/Log in page  */}
      </div>
    </div>
  )
}

export default HomeBanner
