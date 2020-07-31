import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": event.requestContext.identity.cognitoIdentityId
    }
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});