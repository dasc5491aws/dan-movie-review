const runQuery = require('./runQuery')
const {buildMovieDetailsQuery} = require('./buildQuery')
const formatResponse = require('./responseFormatter')

exports.handler = async event => {
    const movieDetailsRes = await runQuery(buildMovieDetailsQuery(event.pathParameters.movieId))
    console.log(`movieDetailsRes=${JSON.stringify(movieDetailsRes)}`)
    
    const response = formatResponse(movieDetailsRes)
    console.log(response)
  
    return response
};
