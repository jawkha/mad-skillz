/**
 * List of features in the MVP
 *
 * HOME PAGE www.skillzone.com
 * The user should be able to see all the games available for a given platform
 * The user should be able to visit a game page on clicking the game card on home page
 *
 * GAME PAGE --> www.skillzone.com/:platform/:game
 * The user should be able to create an open challenge for a given platform game (bet amount debited from account)
 * The user should be able to see a list of all open challenges on the game page
 * The user should be able to accept a given open challenge (bet amount debited from account)
 *
 * MATCH PAGE --> www.skillzone.com/:platform/:game/:match
 * Upon accepting a challenge, the user should be taken to the Match Page where they can interact with the opponent
 * There should be a Countdown Timer on the Match Page to indicate the time within which the game should be completed.
 * The user should be able to post on the Match Page the result of the completed challenge.
 * There should be a verification mechanism in place in case of a dispute. This could include making a request to the     platform API to fetch the match result data.
 *
 * USER PROFILE PAGE www.skillzone.com/users/:user
 * The user can update information about their Profile such as contact details, display name, profile or cover pictures, etc.
 * The profile page should show a summary of all the games the user has played and their winnings/losses
 * Other users can also visit another profile page where a subset of the information will be displayed and they won't be able to edit anything.
 */

describe('App', () => {
  it('is a dummy test', () => {
    expect(true).toBe(true)
  })
})
