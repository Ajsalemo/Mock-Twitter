
# Mock Twitter - a replica site

<br>

#### This site was created with the intentions of producing a decently close replica of Twitter's UI and functionality. The UI it's modeled after is Twitter's old UI, their UI was recently refresh and changed during the building of this site.


## Usage

<br>

### Accounts and users

<br>

#### Upon logging in, a general trending pane will be displayed, as well as all accounts you follow - including their retweets. By clicking the profile avatar in the top right or left, you can access your public facing profile, the dark-mode theme toggle and logout option in the dropdown

#### The authenticated user can post tweets - like and retweet other tweets, all changes will be reflected on their actual Twitter account

![Landing page](https://media.giphy.com/media/kfFUY8zyCP9cs95QJz/giphy.gif)


### Public profiles

<br>

#### All public profiles can be accessed just like on Twitter's normal site, it will display their favorites, lists, timeline, followers and following. Posts on these accounts can be liked and retweeted.

![Public profiles](https://media.giphy.com/media/kz0W4rysFFTg77CUbO/giphy.gif)

### Search options and subscribing to lists

<br>

#### The search field in the navigation bar will return results from Twitter's Standard Search API - this mostly includes the tweets related to the keywords entered. The user's profile is included in the tweets.

#### A user can subscribe to list's on public profiles, they can also view the timeline for the list specified. 

![Search tweets](https://media.giphy.com/media/iGvR1ApT1VuLps3DXk/giphy.gif)

### Technologies

<br>

#### This was built mainly using React, Apollo Client and Apollo-Server-Express, GraphQL and Material UI. Including Redux and also Firebase for authentication. Additional NPM Packages were also used. 



