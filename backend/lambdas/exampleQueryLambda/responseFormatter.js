module.exports = queryRes=>({
    statusCode: queryRes.length ? 200 : 404,
    body: queryRes.length ? JSON.stringify(queryRes[0]) : '[]',
    headers:{
        'Access-Control-Allow-Origin':'*'
    }
})