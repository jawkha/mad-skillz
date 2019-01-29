import styled from 'styled-components'

// GAMES CONTAINER
export const CardGroup = styled.div`
  display: flex;
  height: 20rem;
  margin: 0.5rem;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 20rem;
  height: 20rem;
  margin: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
`

export const CardImage = styled.img`
  width: 20rem;
`

export const CardHeader = styled.h3`
  color: black;
`

// GAME PAGE
export const Jumbotron = styled.div`
background-image: url('${props => props.coverImageUrl}');
background-size: cover;
width: 100vw;
height: 30rem;
`

export const Content = styled.div`
  display: flex;
`

export const CenterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28rem;
`

export const CreateChallengeDiv = styled.div`
  width: 70rem;
  height: 15rem;
  margin: 2rem auto;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const CurrentOpenChallengesDiv = styled.div`
  width: 70rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const CurrentOpenChallengesListItem = styled.li`
  width: 60rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const RecentGameResultsDiv = styled.div`
  width: 70rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const GamesInProgressDiv = styled.div`
  width: 70rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const GamesInProgressListItem = styled.li`
  width: 60rem;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`

export const ChatWindow = styled.div`
  width: 20rem;
  margin: 3rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.05), 0 0px 4rem rgba(0, 0, 0, 0.08);
`
