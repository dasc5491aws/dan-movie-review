# dan-movie-review

## APIs
GET /movies?title=&genre&
GET /movies/{movieId}
GET /movies/{movieId}/ratings
POST /movies/{movieId}/ratings
(PUT /ratings/{ratingId}/like)
(POST /movies)
(PUT /movies/{movieId})
(DELETE /movies/{movieId})
(DELETE /ratings/{ratingId})

## API Data Design
Movie
----
```json
{
    "movieId": "number",
    "title": "string",
    "imgSrc": "string",
    "people":[{/*Person*/}],
    "genre": "string",
    "releaseDate": "string",
    "language": "string",
    "collectiveScore": "number"
}
```

Ratings
----
```json
{
    "userName": "string",
    "movieId": "string",
    "text": "string",
    "score": "number"
}
```

Person
----
```json
{
    "personId": "string",
    "name": "string",
    "roleDesc": "string"
}
```


## DB Design

Table movie:
M_KEY
M_TITLE
M_IMGSRC
M_GENRE
M_RELEASE_DATE
M_LANGUAGE

Table rating:
R_KEY
R_USERNAME
R_M_KEY
R_TEXT
R_SCORE

Table people:
P_KEY
P_NAME

Table people2movie
PM_KEY
PM_P_KEY
PM_M_KEY
PM_ROLE_DESC

## Lambdas
moviePortalAuthorizer
getMovieDetails
listMovies
getMovieRatings
addMovieRating


## Resources
AWS Fine-grained auth demo - https://aws.amazon.com/blogs/security/building-fine-grained-authorization-using-amazon-cognito-api-gateway-and-iam/

Caching Authorizer (so I don't always have to ask cognito which group(s) user belongs to - https://www.alexdebrie.com/posts/lambda-custom-authorizers/#caching-your-custom-authorizers

Create DB User with master permissions: https://aws.amazon.com/premiumsupport/knowledge-center/duplicate-master-user-mysql/

### Notes
1. I didn't have FK relationships/enforcement in DB
2. I could have had a joining table for genres, but for sake of time did not do that (demonstrated with people2movie already)
3. Authorizer caching is not implemented
4. Boilerplate code in lambdas - copy/pasted vs. creating node module
