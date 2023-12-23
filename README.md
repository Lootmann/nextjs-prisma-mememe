# mememe

simple memorize app.
show problem, answer it.

## Endpoints (API)

- /problems

  - [x] GET /problems
  - [x] GET /problems/:problemId
  - [x] POST /problems
  - [x] PUT /problems/:problemId
  - [ ] DEL /problems/:problemId

- /decks
  - [x] GET /decks
  - [x] GET /decks/:deckId
  - [x] POST /decks
  - [x] PUT /decks/:deckId
  - [ ] DEL /decks/:deckId

## Component URLs

```
/problems
/problems/:problemId
/problems/create

/decks
/decks/:deckId
/decks/create

/add

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
  - npm run dev

### primsa

- initialize prisma

  - npx prisma init

- create schema

  - npx prisma generate

- migrate

  - npx prisma migrate dev
  - npx prisma migrate dev --name <name>
  - npx primsa migrate reset

- create db from schema

  - npx prisma db pull

- update db from current schema

  - npx prisma db push

- add, put, del records on GUI
  - npx primsa studio
