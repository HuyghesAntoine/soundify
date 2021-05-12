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

-  `localhost:3030/api/hello`: to create a new user or update a token of an existing one (access_token in the header)
-  `localhost:3030/api/addFollowers/:id`: to add a new follower (access_token in the header)
-  `localhost:3030/api/post`: to add a new post. The content need to be in the body (access_token in the header)
