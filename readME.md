# TypeSafe JSON DB
A minimalist, strongly-typed NoSQL JSON database written in TypeScript
Stores collections of objects in JSON files with a fully type-safe CRUD API

---

# 🚀 Features
- Full TypeScript generic typing for collections
- Asynchronous file-based JSON storage
- Basic CRUD methods: set, get, delete, find
- Easy to extend and integrate in Node.js projects

---

# 📦 Installation
```bash
git clone https://github.com/yourusername/type-safe-json-db.git
cd type-safe-json-db
npm install
```

---


# 🔧 Usage example
```ts
import { DB } from './src/db';

type Schema = {
  users: { id: number; name: string; email: string };
  posts: { id: number; title: string; content: string };
};

const db = new DB<Schema>('./db');

(async () => {
  await db.set('users', 'user1', { id: 1, name: 'Vlad', email: 'vlad@example.com' });

  const user = await db.get('users', 'user1');
  console.log(user);

  const foundUsers = await db.find('users', u => u.email.includes('@example'));
  console.log(foundUsers);
})();
```

---

# 📂 Project structure
```bash
src/
├── db.ts          # Core database logic
├── types.ts       # Type definitions and schemas
example/
├── index.ts       # Usage example
db/                 # Folder with JSON collection files
package.json
tsconfig.json
readME.md
```

---

# 🛠 Scripts
- npm run dev — run example in development mode
- npm run build — compile TypeScript to JavaScript
- npm start — run compiled example