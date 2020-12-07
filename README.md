# Homework 2

### Setup backend and frontend
<br>

Create environment file

For Linux
 * cp ./packages/backend/.env.example ./packages/backend/.env 

 For Windows
* copy ./packages/backend/.env.example ./packages/backend/.env

Install packages and Start containers (may take a while)

* docker-compose up

Sync database schema

* docker-compose exec backend npm run typeorm schema:sync

Load fixtures

* docker-compose exec backend npm run fixtures

**All this should be done inside the folder where docker-compose.yml is located**

___

### Read More

 [Backend] (packages/backend/README.md)

 [Frontend] (packages/frontend/README.md)
___



