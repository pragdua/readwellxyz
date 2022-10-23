import { Client } from "@notionhq/client";

const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

async function posts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE_ID}`,
  });

  return myPosts;
}

export { posts };
