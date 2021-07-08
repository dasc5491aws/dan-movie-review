module.exports = {
    cognito:{
        region: process.env.AWS_REGION || 'us-east-2',
        userPoolId: process.env.USER_POOL_ID || 'us-east-2_Bqv3vFGSY',
        appClientId: process.env.APP_CLIENT_ID || '1mdc8uqqq33m3c78roqv1r0evd',
        tokenType: 'access'
    },
    dynamo:{
        tableName: 'MovieReviewRoles',
        defaultRoleKey: 'default'
    }
}