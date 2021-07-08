 const { verifierFactory } = require('@southlane/cognito-jwt-verifier')
 const { cognito: { region, userPoolId, appClientId, tokenType }, dynamo:{ tableName, defaultRoleKey } } = require('./config')
 const AWS = require('aws-sdk')
 const cognitoIsp = new AWS.CognitoIdentityServiceProvider()
 const dynamoDC = new AWS.DynamoDB.DocumentClient()
 
 const verifier = verifierFactory({
      region,
      userPoolId,
      appClientId,
      tokenType
    })
 
 exports.handler = async event=>{
    console.log(`event=${JSON.stringify(event)}`)
 
    //verify token
    const tokenPayload = await verifier.verify(event.authorizationToken)
    console.log(`tokenPayload=${JSON.stringify(tokenPayload)}`)
    
    //lookup API access policy in Dynamo for group with highest precedence
    const highestPrecedenceGroup = tokenPayload?.['cognito:groups']?.[0]
    const policyRes = await dynamoDC.get({
     TableName: tableName,
     Key:{
      Role:  highestPrecedenceGroup || defaultRoleKey
     }
    }).promise()
    console.log(`policyRes=${JSON.stringify(policyRes)}`)
    
    return {
     principalId: tokenPayload.jti,
     policyDocument: policyRes?.Item?.PolicyDocument,
     context:{
      username:tokenPayload.username,
      accessLevel: highestPrecedenceGroup
     }
    }
}