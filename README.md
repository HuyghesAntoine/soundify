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

-   [Our Trello](https://trello.com/b/4eynBCyz)
-   ???

---

## Idea:

Social network base on the Spotify API. Similar to soundcloud.

---

## Technologies:

-   NodeJS
-   React (frontend)
-   MongoDB (database)
-   Spotify API
-   ???

---

## Prototype front

![1st idea](img/prototype.png)

## References

Mainly for dev purpose, list of official repo and documentation.

### Client

-   react-spotify-api ([repo](https://github.com/idanlo/react-spotify-api#readme), [doc](https://idanlo.github.io/react-spotify-api/))
-   react-spotify-auth ([repo](https://github.com/kevin51jiang/react-spotify-auth#readme))
-   react-bootstrap-icons ([repo](https://github.com/ismamz/react-bootstrap-icons#readme))
-   js-cookie ([repo](https://github.com/js-cookie/js-cookie#readme))
-   react-spotify-web-playback ([repo](https://github.com/gilbarbara/react-spotify-web-playback#readme))
-   react-moment ([repo](https://github.com/headzoo/react-moment#readme))
-   axios ([repo](https://github.com/axios/axios#readme))

### backend (path)

We assume that each route is preceded by `http://localhost:3030/api/`, and each request have a headers.authorization

| Method   | route                  | detail                                                                                |
| -------- | ---------------------- | ------------------------------------------------------------------------------------- |
| `PUT`    | `hello`                | create a new user or update a token of an existing one                                |
| `GET`    | `me`                   | get current user                                                                      |
| `GET`    | `user/:id`             | get user using his id                                                                 |
| `GET`    | `user/:id/follow`      | get users follow (=> User[] )                                                         |
| `GET`    | `user/:id/follower`    | get users follower => User[] )                                                        |
| `GET`    | `user/:id/timeline`    | get users timeline (=> Post[] )                                                       |
| `GET`    | `user/search`          | search user `body { query : String (required) }`}                                     |
| `PUT`    | `addFollowers/:id`     | follow a user using his id                                                            |
| `PUT`    | `post`                 | add a new post. `body : { content : String (required) } `                             |
| `GET`    | `post/:id`             | get post from id                                                                      |
| `DELETE` | `post/:id`             | delete post from post id                                                              |
| `PUT`    | `post/:id/react/:mood` | create/update reaction from post id                                                   |
| `GET`    | `post/search`          | search post `body { query : String (required), limit : Int(optional, default : 10) }` |
