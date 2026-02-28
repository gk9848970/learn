import { db } from './db';
import { userTable } from './db/schema';

async function main() {
  const inserted = await db.insert(userTable).values({
    name: 'Alice',
    age: 30,
    email: 'alice@example3.com',
  });

  console.log('Inserted:', inserted);

  const users = await db.select().from(userTable);
  console.log('All users:', users);
}

main().catch(console.error).finally(() => process.exit());
