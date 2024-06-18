# Subscribers API Documentation
## Base URL

`http://localhost:3000/`
`https://testmongo-bjvb.onrender.com`

## Endpoints
### 1. Singup url
**URL:** `/api/signup`
**Method:** `POST`
**BodyType:** raw
#### Payload:
    {
        "email": ""          // [required]
        "password": ""       // [required]
    }
  
#### Response
- **Success: 201**
    ```json
    {
        "message": "User created successfully",
        "userId": ""
    }
- **Failure: 400**
    ```json
    {
        "message": "Please fill all fields"
    }
    ```
- **Failure: 409**
    ```json
    {
        "message": "User already exist"
    }
    ```

- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
---

### 2. Login url
**URL:** `/api/login`
**Method:** `POST`
**BodyType:** raw
#### Payload:
    {
        "email": ""          // [required]
        "password": ""       // [required]
    }
  
#### Response
- **Success: 200**
    ```json
    {
        "message": "Login successful",
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzAyNGNhMDc1N2E5NTFkYzVkNzQ2NCIsImlhdCI6MTcxODY5MTU4NSwiZXhwIjoxNzE4Njk4Nzg1fQ.R9j1IzQjNLP0a1Jv6ROUewsiHeEYOdd41v9c6Um2Ij8"
    }
- **Failure: 400**
    ```json
    {
        "message": "Please fill all fields"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "User not found"
    }
    ```
- **Failure: 401**
    ```json
    {
        "message": "Invalid password"
    }
    ```

- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
    
----
----


### 3. Get all users from database
**URL:** `/api/users`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "",
            "email": "",
            "password": "",
            "__v": 0
        },
    ]
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

### 4. Get user details from database
**URL:** `/api/userid`
**Method:** `GET`
#### Request Headers
- `Authorization`: Bearer token
#### Response
- **Success: 200**
    ```json
    {
        "_id": "",
        "email": "",
        "password": "",
        "__v": 0
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "'User not found'"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
----

### 5. Get all the movies from database
**URL:** `/api/get/all/movies`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    {
        "movies": [ {
            "_id": "",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
                "Action",
                "Crime",
                "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [],
            "__v": 0,
            } ],
        "id": "667024ca0757a951dc5d7464"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "Movies not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
### 6. Get movie from database
**URL:** `/api/get/movie`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token

**BodyType:** raw
#### Payload:
    {
        "search_query" :"rings"
    }

#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "6670253f0757a951dc5d746e",
            "big_image": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            "genre": [
            "Action",
            "Adventure",
            "Drama"
            ],
            "id": "top7",
            "image": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0167260",
            "imdbid": "tt0167260",
            "rank": 7,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR0,0,45,67_AL_.jpg",
            "title": "The Lord of the Rings: The Return of the King",
            "year": "2003",
            "bookmarks": [],
            "__v": 0
        }
    ]
    ```
- **Failure: 400**
    ```json
    {
        "message": "Please provide a movie name"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "Movies not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
### 7. Bookmark a movie
**URL:** `/api/bookmark/set/movie`
**Method:** `POST`
#### Request Headers
- `x-access-token`: token

**BodyType:** raw
#### Payload:
    {
        "id": "6670254b0757a951dc5d7534"
    }

#### Response
- **Success: 200**
    ```json
        {
            "_id": "6670253f0757a951dc5d746a",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
                "Action",
                "Crime",
                "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [
                "667024ca0757a951dc5d7464"
            ],
            "__v": 0,
            "bookmarked": false
        }
    ```
- **Failure: 404**
    ```json
    {
        "message": "Movies not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
----
### 8. Get all movies from bookmark
**URL:** `/api/bookmark/get/movies`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "6670253f0757a951dc5d746a",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
            "Action",
            "Crime",
            "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [
            "667024ca0757a951dc5d7464"
            ],
            "__v": 0,
            "bookmarked": false
        },
    ]
    ```
- **Failure: 404**
    ```json
    {
        "message": "Movies not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
### 9. Delete movie from bookmark
**URL:** `/api/bookmark/delete/movie/:id`
**Method:** `DELETE`
#### Request Headers
- `x-access-token`: token
#### Parameters
- `id` 
#### Response
- **Success: 200**
    ```json
    { "message" : "Removed from bookmark successfully", "id" : "" }
    ```
- **Failure: 404**
    ```json
    {
        "message": "Movies not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
----
----

### 10. Get all the tvSeries from database
**URL:** `/api/get/all/tvseries`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    {
        "series": [ {
            "_id": "",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
                "Action",
                "Crime",
                "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [],
            "__v": 0,
            } ],
        "id": "667024ca0757a951dc5d7464"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "tvSeries not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
----
### 11. Get tvSeries from database
**URL:** `/api/get/tvseries`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token

**BodyType:** raw
#### Payload:
    {
        "search_query" :"avengers"
    }

#### Response
- **Success: 200**
    ```json
        [
            {
                "_id": "6670254b0757a951dc5d7530",
                "big_image": "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5",
                "description": "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
                "genre": [
                "Crime",
                "Drama",
                "Thriller"
                ],
                "id": "top1",
                "image": "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_QL75_UX380_CR0,1,380,562_.jpg",
                "imdb_link": "https://www.imdb.com/title/tt0903747",
                "imdbid": "tt0903747",
                "rank": 1,
                "rating": 9.5,
                "thumbnail": "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_UY67_CR0,0,45,67_AL_.jpg",
                "title": "Breaking Bad",
                "year": "2008-2013",
                "bookmarked": false,
                "__v": 0,
                "bookmarks": [
                "667024ca0757a951dc5d7464"
                ]
            }
        ]
    ```
- **Failure: 400**
    ```json
    {
        "message": "Please provide a movie name"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "tvSeries not found"
    }
    ```

- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
----
### 12. Bookmark a tvSeries
**URL:** `/api/bookmark/set/tvseries`
**Method:** `POST`
#### Request Headers
- `x-access-token`: token

**BodyType:** raw
#### Payload:
    {
        "id": "6670254b0757a951dc5d7534"
    }

#### Response
- **Success: 200**
    ```json
        {
            "_id": "6670253f0757a951dc5d746a",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
                "Action",
                "Crime",
                "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [
                "667024ca0757a951dc5d7464"
            ],
            "__v": 0,
            "bookmarked": false
        }
    ```
- **Failure: 404**
    ```json
    {
        "message": "tvSeries not found"
    }
    ```

- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
### 13. Get all tvSeries from bookmark
**URL:** `/api/bookmark/get/tvseries`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "6670253f0757a951dc5d746a",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
            "Action",
            "Crime",
            "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [
            "667024ca0757a951dc5d7464"
            ],
            "__v": 0,
            "bookmarked": false
        },
    ]
    ```
- **Failure: 404**
    ```json
    {
        "message": "tvSeries not found"
    }
    ```

- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

----
### 14. Delete tvSeries from bookmark
**URL:** `/api/bookmark/delete/tvSeries/:id`
**Method:** `DELETE`
#### Request Headers
- `x-access-token`: token
#### Parameters
- `id` 
#### Response
- **Success: 200**
    ```json
        { "message" : "Removed from bookmark successfully", "id" : "" }
    ```
- **Failure: 404**
    ```json
    {
        "message": "tvSeries not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
----
----

### 15. Get Search value
**URL:** `/api/search`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
        {
            "_id": "6670253f0757a951dc5d746a",
            "big_image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": [
                "Action",
                "Crime",
                "Drama"
            ],
            "id": "top3",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            "imdb_link": "https://www.imdb.com/title/tt0468569",
            "imdbid": "tt0468569",
            "rank": 3,
            "rating": 9,
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            "title": "The Dark Knight",
            "year": "2008",
            "bookmarks": [
                "667024ca0757a951dc5d7464"
            ],
            "__v": 0,
            "bookmarked": false
        }
    ```
- **Failure: 400**
    ```json
    {
        "message": "Please provide a search value"
    }
    ```
- **Failure: 404**
    ```json
    {
        "message": "not found"
    }
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```