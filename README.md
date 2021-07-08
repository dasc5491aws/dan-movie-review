# dan-movie-review

# Access Information:
http://dan-movie-review-webhosting.s3-website.us-east-2.amazonaws.com/
Admin User: adminuser
Basic User: basicuser

## Stack:
- React UI, Webpack
- API Gateway / Lambda Authorizer / Lambda Back-end (Node JS 14.x)
- Cognito IDP
- Dynamo (Role-based access)
- RDS Data API (Querying)
- RDS Serverless, AWS Aurora DB

## UI Development
- Located in 'frontend' directory
- Run 'npm run build' to build
- Run 'npm run start' to start localhost dev server

## Back-end Development
- Located in 'backend' directory
- I have included a sample querying lambda (they are all more or less the same, just with different queries.  Opportunity for node module(s))
- Included the lambda authorizer
- Included the Roles table records (Dynamo) 
- Included API Gateway export

## Resources
AWS Fine-grained auth demo - https://aws.amazon.com/blogs/security/building-fine-grained-authorization-using-amazon-cognito-api-gateway-and-iam/

Caching Authorizer (so I don't always have to ask Cognito which group(s) user belongs to - https://www.alexdebrie.com/posts/lambda-custom-authorizers/#caching-your-custom-authorizers

Create DB User with master permissions: https://aws.amazon.com/premiumsupport/knowledge-center/duplicate-master-user-mysql/

### Some Notes/Improvement opportunities
1. I didn't have FK relationships/enforcement in DB
2. I could have had a joining table for genres, but for sake of time did not do that (demonstrated with people2movie already)
3. Boilerplate code in lambdas - copy/pasted vs. creating node module
4. JSON types out of APIs are poorly done
5. Swagger definitions/schema for APIs are not existing
6. I chose not to include Images, although the DB supports imgSrc, which UI would use to grab image from S3 or elsewhere
7. I chose not to include filtering on the main list of Movies (time), but API and Lambda supports this
8. Currently cannot add cast/crew, but DB/API/UI supports this
9. Admin cannot currently edit an existing movie
10. Like/Dislike of ratings not currently handled
11. Admin cannot currently delete existing rating/comment
12. A user can currently add as many ratings as they want
13. UI is not currently hosted, but could easily be ported onto something like S3
14. Lambdas were made using the AWS Lambda Web GUI and therefore do not have the best formatting/linting
15. Ratings page just displays stringified JSON response - no formatting currently