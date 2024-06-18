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


### 3. Get users details from database
**URL:** `/api/users`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
    ]
    ```
- **Failure: 500**
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

### 4. Get all users
**URL:** `/api/userid`
**Method:** `GET`
#### Request Headers
- `Authorization`: Bearer token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
    ]
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
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
### 6. Get movie from database
**URL:** `/api/get/movie`
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
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
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
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
----

### 10. Get all the tvSeries from database
**URL:** `/api/get/all/tvseries`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
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
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
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
----

### 15. Get Search value
**URL:** `/api/search`
**Method:** `GET`
#### Request Headers
- `x-access-token`: token
#### Response
- **Success: 200**
    ```json
    [
        {
            "_id": "60d9c6b8f8aabd0015e4e255",
            "title": "Inception",
            "director": "Christopher Nolan",
            "release_date": "2010-07-16",
            "genre": "Science Fiction",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        },
        {
            "_id": "60d9c6b8f8aabd0015e4e256",
            "title": "The Matrix",
            "director": "Lana Wachowski, Lilly Wachowski",
            "release_date": "1999-03-31",
            "genre": "Action",
            "created_at": "2023-06-12T12:00:00Z",
            "updated_at": "2023-06-12T12:00:00Z"
        }
    ]
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