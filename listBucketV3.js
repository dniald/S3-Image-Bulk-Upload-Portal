// Import required AWS SDK clients and commands for Node.js.
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
