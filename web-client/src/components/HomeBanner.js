import React from 'react'
import styled from 'styled-components'

import bannerImage from './../../static/images/home-banner-01.jpg'

const Container = styled.div`
  background-image: url(${bannerImage});
  min-height: 70vh;
`

const TextContainer = styled.div`
  display: inline-block;
  float: left;
  padding: 3rem;
`

const BannerTop = styled.h1`
  color: #ffffff;
  font-weight: normal;
  padding-bottom: 4vh;
`

const Line1 = styled.span`
  padding-left: 6vh;
`
const Line2 = styled.span`
  padding-left: 25vh;
`

const AccentedText = styled.span`
  color: #4484f4;
`

const BannerText = styled.p`
  color: #ffffff;
  font-weight: normal;
`

const Button = styled.button`
  cursor: pointer;
  width: 50%;
  margin: 5vh auto;
  padding: 2vh 6vh;
  background-color: #0b52cc;
  color: white;
  font-size: 1.6rem;
  border: none;
  border-radius: 1vh;
  &:hover {
    background-color: #0849b9;
  }
`

const HomeBanner = () => {
  return (
    <Container>
      <TextContainer>
        <BannerTop>
          <Line1>
            A <AccentedText>New Home</AccentedText> for
          </Line1>
          <br />{' '}
          <Line2>
            <AccentedText>Alpha</AccentedText> Gamers
          </Line2>
        </BannerTop>
        <BannerText>
          Create an account, challenge others to a game and earn real money.
          <br />
          Push your gaming limits. Start playing now!
        </BannerText>
        <Button>START PLAYING</Button>
        {/* The START PLAYING button should take unauthenticated users to the Sign up/Log in page  */}
      </TextContainer>
    </Container>
  )
}

export default HomeBanner
