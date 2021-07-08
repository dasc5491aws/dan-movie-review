const { cognito: { clientId, userPoolId, region }, apiBaseUrl, } = require('./config')

const axios = require('axios')

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const isAdmin = () => cookies.get('accessLevel') === 'admin'

const initiateAuthSession = async (USERNAME, PASSWORD) => {

    //get token
    const { data: { AuthenticationResult: { AccessToken } } } = await axios({
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
    cookies.set(`accessToken`, AccessToken, { path: '/', maxAge: 3600 })

    //get user details/access level
    const { data: { accessLevel } } = await dataApiRequest('GET', '/user-details')
    cookies.set(`accessLevel`, accessLevel, { path: '/', maxAge: 3600 })
}

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
    initiateAuthSession,
    dataApiRequest,
    isAdmin
}