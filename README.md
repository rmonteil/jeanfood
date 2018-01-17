# jeanfood
Sends a scheduled notification on a Mattermost channel with a list of restaurants nearby.

## How to make it works?

Install dependencies:
```bash
npm install
```

Setup your own configuration:
```bash
cp src/config/db.dist.ts src/config/db.ts
vim src/config/db.ts # Put your own webhooks

cp src/config/parameters.dist.ts src/config/parameters.ts
vim src/config/parameters.ts # Put your own configuration parameters
```

Lint (optionnal):
```bash
npm run lint
```

Build:
```bash
npm run build
```

Start:
```bash
npm run start
```

