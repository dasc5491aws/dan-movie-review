module.exports = {
    db:{
        cluster: process.env.DB_CLUSTER || 'arn:aws:rds:us-east-2:782474673763:cluster:dan-movie-review-cluster',
        secret: process.env.DB_SECRET || 'arn:aws:secretsmanager:us-east-2:782474673763:secret:rds-db-credentials/cluster-WTZO5LW4UQVD5DYWCAIVU43M2U/lambdaDbUser-ttAsXJ',
        defaultDb: process.env.DB_DEFAULT || 'dan_movie_review_db'
    }
}