const axios = require('axios')
const { cognito: { clientId }, apiBaseUrl } = require('./config')
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const accessTokenRequest = async (USERNAME, PASSWORD) => axios({
    method: 'post',
    url: 'https://cognito-idp.us-east-2.amazonaws.com/',
    data: {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: { USERNAME, PASSWORD },
        ClientMetadata: {}
    },
    headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth'
    }
})

const dataApiRequest = async (method, url, data) => axios({
    method,
    url: `${apiBaseUrl}${url}`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': cookies.get('accessToken')
    },
    data
})

export {
    accessTokenRequest,
    dataApiRequest
}