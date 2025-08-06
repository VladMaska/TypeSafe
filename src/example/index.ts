import { DB } from '../db';

type Schema = {
    users: { id: number; name: string; email: string };
    posts: { id: number; title: string; content: string };
};

const db = new DB<Schema>('./db');

(async () => {
    await db.set('users', 'user1', { id: 1, name: 'Vlad', email: 'vlad@example.com' });
    const user = await db.get('users', 'user1');
    console.log('Got user:', user);

    const found = await db.find('users', (u) => u.email.includes('@example'));
    console.log('Found users:', found);
})();