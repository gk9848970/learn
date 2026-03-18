import { sql } from 'drizzle-orm';
import { db } from './db';
import { userTable } from './db/schema';

async function main() {
  const result1 = await db.query.userTable.findMany({
    columns: {
      email: false,
    }
  })

  console.log(result1);

  const result2 = await db.query.userTable.findMany({
    columns: {
      email: true,
    }
  })

  console.log(result2);

  const result3 = await db.query.userTable.findMany({
    columns: {
      email: true,
      name: false,
    }
  })

  console.log(result3);

  const result4 = await db.query.userTable.findMany({
    columns: {
      email: true,
      name: true,
    },
    extras: {
      lowerCaseName: sql<string>`lower(${userTable.name})`.as('lowerCaseName')
    }
  })

  console.log(result4);

  const result5 = await db.query.userTable.findMany({
    columns: {
      email: true,
      name: true,
    },
   limit: 1,
  })

  console.log(result5);

  const result6= await db.query.userTable.findMany({
    columns: {
      email: true,
      name: true,
    },
   offset: 1,
  })

  console.log(result6);

  const result7= await db.query.userTable.findMany({
    columns: {
      email: true,
      name: true,
    },
   with: {
    posts: true,
   }
  })

  console.log(result7);
}

main().catch(console.error).finally(() => process.exit());
