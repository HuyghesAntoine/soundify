<center>
<h1> Soundify </h1>
<img src="img/soundIfyReadme.png" width="400" height="400" />
</center>

# projetWS

## Authors:

-   HUYGHES Antoine
-   PECQUEUX Théo
-   SKIBINSKI Pierre
-   WALLET Nicolas

## Supervised by:

-   FASQUEL Clément

---

## Useful links

-   [Trello](https://trello.com/b/4eynBCyz)
-   [Soundify.fr](https://sound-ify.netlify.app/)
-   [Postman documentation](https://documenter.getpostman.com/view/15851172/TzY7fEih)

---

## Idea:

Social network base on the Spotify API. Similar to soundcloud.
You can share your favorite songs with your friends, react and talk with them in real time. Add gifs to your own posts, and add reaction on your friend's posts.
Don't forget to add a word about you in your profile !

---

## Technologies:

-   NodeJS
-   React (frontend)
-   MongoDB (database)
-   Spotify API
-   Giphy API
-   Server hosted by HerokuApp
-   Client hosted by Netlify
---

## Prototype

This is the first idea that we got for our social network.

![1st idea](img/prototype.png)

---

### Features

-   Login with your spotify account
-   Add new friends
-   Add a word about you in your soundify profile
-   Get your favorite artists/playlists/albums in 1 click
-   Print your playlists
-   Share your favorite sound of the moment with your friends
-   Add emojis, gifs, and songs to your posts
-   Find the most recent releases at any moment
-   Search for any musics, albums or artists
-   Comment the posts of your friends

---

## References

Mainly for dev purpose, list of official repo and documentation.

### Client

-   react-spotify-api ([repo](https://github.com/idanlo/react-spotify-api#readme), [doc](https://idanlo.github.io/react-spotify-api/))
-   react-spotify-auth ([repo](https://github.com/kevin51jiang/react-spotify-auth#readme))
-   react-bootstrap-icons ([repo](https://github.com/ismamz/react-bootstrap-icons#readme))
-   js-cookie ([repo](https://github.com/js-cookie/js-cookie#readme))
-   react-moment ([repo](https://github.com/headzoo/react-moment#readme))
-   axios ([repo](https://github.com/axios/axios#readme))
-   react-custom-scrollbars-2 ([repo](https://github.com/RobPethick/react-custom-scrollbars-2/tree/master/docs)) -> Create a custom scrollbar
-   react-giphy-picker ([repo](https://github.com/progresso-group/react-giphy-picker)) -> Create a gif picker in the post section
-   react-kawaii ([repo](https://github.com/miukimiu/react-kawaii)) -> Add kawai reactions to the post section
-    findTheLyrics ([repo](https://github.com/normanlol/findthelyrics#readme)) -> Find the lyrics for every musics

### backend (path)

We assume that each route is preceded by `http://localhost:3030/api/`, and each request have a headers.authorization

| Method   | route                      | detail                                                                                  |
| -------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `PUT`    | `hello`                    | create a new user or update a token of an existing one                                  |
| `GET`    | `me`                       | get current user                                                                        |
| `GET`    | `user/:id`                 | get user using his id                                                                   |
| `GET`    | `user/:id/follow`          | get users follow (=> User[] )                                                           |
| `GET`    | `user/:id/follower`        | get users follower (=> User[] )                                                         |
| `GET`    | `timeline`                 | get users timeline (=> Post[] )                                                         |
| `PUT`    | `user/bio`                 | update current users bio `body { content : String (required) }`}                        |
| `GET`    | `user/search`              | search user `params { query : String (required), limit : Int(optional, default : 10) }` |
| `PUT`    | `follow/:id`               | follow a user using his id                                                              |
| `PUT`    | `unfollow/:id`             | unfollow a user using his id                                                            |
| `POST`   | `post`                     | add a new post. `body : { content : String (required) } `                               |
| `GET`    | `post/:id`                 | get post from id                                                                        |
| `DELETE` | `post/:id`                 | delete post from post id                                                                |
| `PUT`    | `post/:id/react/:reaction` | create/update reaction from post id                                                     |

---

## How to run localy:
### Export your environment variable 
```sh
export REACT_APP_API_URL=http://localhost:3030
export REACT_APP_GIPHY_CLIENT_ID={yourKey}
export REACT_APP_SPOTIFY_CLIENT_ID={yourKey}
export REACT_APP_URL=http://localhost:3000/
````

### Client:
```sh
cd client
npm i && npm run css
npm start
```

### Server:

```sh
cd server
npm i
npm run dev
```

Once you have run **both** the client and the server, go to **https://localhost:3000**

---

# Some stats

Total : 53 files,  12879 codes, 83 comments, 1535 blanks, all 14497 lines

## Languages
| language | files | code | comment | blank | total |
| :--- | ---: | ---: | ---: | ---: | ---: |
| CSS | 3 | 9,229 | 27 | 1,206 | 10,462 |
| JavaScript | 44 | 3,481 | 32 | 288 | 3,801 |
| Markdown | 1 | 103 | 0 | 36 | 139 |
| JSON | 1 | 25 | 0 | 1 | 26 |
| HTML | 1 | 20 | 23 | 1 | 44 |
| YAML | 1 | 14 | 0 | 1 | 15 |
| SCSS | 1 | 6 | 1 | 2 | 9 |
| XML | 1 | 1 | 0 | 0 | 1 |

## Directories
| path | files | code | comment | blank | total |
| :--- | ---: | ---: | ---: | ---: | ---: |
| . | 53 | 12,879 | 83 | 1,535 | 14,497 |
| client | 36 | 11,618 | 72 | 1,380 | 13,070 |
| client\public | 2 | 45 | 23 | 2 | 70 |
| client\scss | 1 | 6 | 1 | 2 | 9 |
| client\src | 33 | 11,567 | 48 | 1,376 | 12,991 |
| client\src\components | 23 | 2,224 | 14 | 151 | 2,389 |
| client\src\components\main | 20 | 1,969 | 14 | 140 | 2,123 |
| client\src\components\main\card | 3 | 528 | 1 | 34 | 563 |
| client\src\components\main\form | 3 | 516 | 0 | 40 | 556 |
| client\src\components\main\view | 6 | 482 | 0 | 28 | 510 |
| client\src\components\sidebar | 1 | 150 | 0 | 5 | 155 |
| server | 15 | 1,144 | 11 | 118 | 1,273 |
| server\business | 4 | 396 | 6 | 32 | 434 |
| server\controller | 4 | 189 | 0 | 25 | 214 |
| server\httpRepository | 1 | 12 | 0 | 1 | 13 |
| server\model | 4 | 491 | 1 | 44 | 536 |
