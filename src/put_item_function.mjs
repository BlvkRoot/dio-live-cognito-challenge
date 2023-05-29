import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async(event) => {
    
    try {
        const item = JSON.parse(event.body);
        
        await dynamodb.send(new PutCommand({
            TableName: "DioItems",
            Item: item
        }));
        
        return {
            statusCode: 200,
            body: JSON.stringify(item),
        };
    } catch({ message }) {
        return {
        statusCode: 400,
        body: JSON.stringify(message),
    };
    }
};
