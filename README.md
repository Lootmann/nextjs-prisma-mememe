# mememe

simple memorize app.
show problem, answer it.

## Endpoints (API)

- /problems

  - [x] GET /problems
  - [x] GET /problems/:problemId
  - [x] POST /problems
  - [x] PUT /problems/:problemId
  - [x] DEL /problems/:problemId

- /decks
  - [x] GET /decks
  - [x] GET /decks/:deckId
  - [x] POST /decks
  - [x] PUT /decks/:deckId
  - [x] DEL /decks/:deckId

## Component URLs

```
/problems
/problems/:problemId

/decks
/decks/:deckId

/add - add problem

/learn/:deckId - show a random problem from :deckId Deck
```

## Models

```python
class Deck:
    id: int
    title: int
    problems: List[Problem]


class Problem:
    id: int
    front: string
    back: string
    deck_id: int
    deck: Deck
```

## commands

### nextjs

- run server

```
npm run dev
```

### primsa

- initialize prisma

```
npx prisma init
```

- create schema

```
npx prisma generate
```

- migrate

```
npx prisma migrate dev
npx prisma migrate dev --name <name>
npx primsa migrate reset
```

- create db from schema

```
npx prisma db pull
```

- update db from current schema

```
npx prisma db push
```

- add, put, del records on GUI

```
npx primsa studio
```

## TODO

- Decks

  - [x] change 'Create Deck Component' from showing another component to alert-ish message

- Problems

  - [ ] Problem search form in '/problmes/pages.tsx'
  - [x] Edit a problem in '/problems/page.tsx'
  - [x] Remove edit link button in problem lists table
  - [ ] Add Pagination to '/problmes/page.tsx' table
