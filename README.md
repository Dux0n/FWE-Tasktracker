# Homework 2

### Setup backend and frontend
<br>

Create environment file

For Linux
 * cp ./packages/backend/.env.example ./packages/backend/.env 

 For Windows
* copy ./packages/backend/.env.example ./packages/backend/.env

Install packages and Start containers

* docker-compose up

Sync database schema

* docker-compose exec backend npm run typeorm schema:sync

Load fixtures

* docker-compose exec backend npm run fixtures

**All this should be done inside the folder where docker-compose.yml is located**

___

### Interaction with Database

Either use **docker-compose exec  mysqldb mysql -utest -ptest fwemysqldb** or **postaman collection**

### To run automated tests

* docker-compose exec backend npm run test

### Discord bot is starting automatically

* Discord link 

* Type **!tasks** in the chat to get all tasks


___
### Router Description
<details>
**Global Router** http://localhost:4000/api

This is a router through which you can access other routes by either appending /task , /label or /tracking

**Task Router** http://localhost:4000/api/task

**/:taskId** Is a request parameter which is being passed through our link

| Routes | Description |
| ---    | ---         |
| taskRouter.get("/", getAllTasks)  | is used to get all existing tasks from database.  |
| taskRouter.post("/", createTask)  | is used to create a new task. You can create only one task at a time.  |
| taskRouter.get("/:taskId", getTaskById)   | is used to get a task where id = taskId  |
| taskRouter.delete("/:taskId", deleteTaskById)   | is used to delete a task where id = taskId.  |
| taskRouter.patch("/:taskId", updateTaskById)   | is used to update a task where id = taskId.  |
| taskRouter.post("/:taskId/label", addLabel)   | is used to get all existing tasks from database.  |
| taskRouter.delete("/:taskId/label", deleteLabel)   | is used to delete one or more labels from a task.  |
| taskRouter.get("/:taskId/labels", getAllLabelsOfTask)   | is used to get all labels of a certain task.  |
| taskRouter.get("/:taskId/trackings", getAllTrackingsOfTask)   | is used to get all trackings of a certain task.  |

<br>**Label Router** http://localhost:4000/api/label

**/:labelId** Is a request parameter which is being passed through our link

| Routes | Description |
| ---    | ---         |
| labelRouter.get("/", getAllLabels)  | is used to get all existing labels from database.  |
| labelRouter.post("/", createLabel)  | is used to create a new label. You can create only one label at a time.  |
| labelRouter.get("/:labelId/tasks", getAllTasksOfLabel)   | is used to get a label where id = labelId  |
| labelRouter.get("/:labelId", getLabelById)   | is used to get a label where id = labelId.  |
| labelRouter.delete("/:labelId", deleteLabelById)   | is used to delete a label where id = labelId.  |
| labelRouter.patch("/:labelId", updateLabelById)   | is used to update a label where id = labelId.  |


<br>**Tracking Router** http://localhost:4000/api/tracking

**/:trackingId** Is a request parameter which is being passed through our link

| Routes | Description |
| ---    | ---         |
| trackingRouter.get("/", getAllTrackings)  | is used to get all existing trackings from database.  |
| trackingRouter.get("/:trackingId", getTrackingById)  | is used to get a tracking where id = trackingId   |
| trackingRouter.post("/", createTracking);   | is used to create a new tracking. You can create only one tracking at a time.  |
| trackingRouter.patch("/:trackingId", UpdateTrackingById)   | is used to update a tracking where id = trackingId.  |
| trackingRouter.delete("/:trackingId", deleteTrackingById)   | is used to delete a tracking where id = trackingId.  |

</details>

___

### Frontend