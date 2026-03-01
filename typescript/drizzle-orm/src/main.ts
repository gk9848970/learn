import { db } from './db';
import { userTable } from './db/schema';

async function main() {
  await db.delete(userTable);

  const inserted = await db.insert(userTable).values([{
    name: 'Alice',
    age: 31,
    email: 'alice@example1.com',
  }, {
    name: 'Gaurav',
    age: 32,
    email: 'alice@example2.com',
  }, {
    name: 'Khyati',
    age: 33,
    email: 'alice@example3.com',
  }])
  .returning()
  .onConflictDoUpdate({
    target: [userTable.email],
    set: {
      name: 'Gaurav Kumar',
    },
  });

  
  console.log('Inserted:', inserted);
}

main().catch(console.error).finally(() => process.exit());
