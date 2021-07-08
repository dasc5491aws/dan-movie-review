const buildMovieDetailsQuery =  movieId=>`
    select 
        M_KEY as movieId,
        M_TITLE as title,
        M_IMGSRC as imgSrc,
        M_GENRE as genre,
        M_RELEASE_DATE as releaseDate,
        M_LANGUAGE as language
    from
        movie
    where 
        M_KEY = ${movieId}
    limit 1
`

module.exports = {
    buildMovieDetailsQuery
}
        
