Keywords: NextJS, Clean Architecture, Onion, NodeJS, TODO application.

This is a NextJS application. The main goal of this sample TODO application is to demonstrate how clean architecture can be 
implemented in a boostraped NextJS application. 

## Getting Started

First, run the development server:

```bash
docker-compose up

npx prisma migrate dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

If you familiar with NextJS you will recognize the structure of the `src/app` folder. Inside you will find all the NextJS
related files. 

- `src/application:` Contains your use cases and interfaces.
- `src/domain:` Contains domain entities.
- `src/infrastructure:` Contains the implementation of adapters, repositories.
- `src/main:` Contains factories to compose use cases as well as handlers to abstract web logic.

## Pending Items
```
unit test
improve types
```
