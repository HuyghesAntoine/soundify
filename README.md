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
| `GET`    | `post/search`              | search post `params { query : String (required), limit : Int(optional, default : 10) }` |

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
