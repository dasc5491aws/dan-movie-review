const aws = require('aws-sdk')
const { db:{cluster:resourceArn , secret:secretArn, defaultDb:database}}=require('./config')

const rdsdataservice = new aws.RDSDataService();

module.exports = async sql => {
    const params = {
        resourceArn,
        secretArn,
        sql,
        database,
        includeResultMetadata: true
    }
    console.log(`query params=${JSON.stringify(params)}`)
    
    const {records,columnMetadata} = await rdsdataservice.executeStatement(params).promise()
    console.log(`columnMetadata=${JSON.stringify(records)}`)
    console.log(`records=${JSON.stringify(columnMetadata)}`)
     
    return records ? dbResToObject(records,columnMetadata):[]
}

const dbResToObject = (records,columnMetadata)=>records.map(
    record=>record.map(
        (columnValues,idx)=>({[columnMetadata[idx].label || columnMetadata[idx].name]:columnValues.isNull ? null : Object.values(columnValues)[0]}) //key value will be generated column name (label) or else the raw name
    ).reduce(
        (obj,val)=>({...val,...obj}), {})
)