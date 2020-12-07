# Frontend

### General Info

To get to the front page type either http://localhost:80 or just **localhost** in the search bar

For the test data you can use **docker-compose exec backend npm run fixtures**

### Dashboard

![DashboardPage.png](./images/DashboardPage.png "dashboard")

6. Each task has its own delete button.
7. Starts the timer of specific task

#### 1. Add task form

![AddTaskForm.png](./images/AddTaskForm.png/ "addtaskform")

1. Name must be written in order to create a new task <br>
2. Description is also required for the task creation
3. Label input is optional. Multiple label input is possible. If you want to input multiple labels then there has to be a comma in between two labels and no blank spaces before or after the comma. Blank space after a label name is only allowed if the label name contains a blank space at the end. <br> Examples: 
* Label2,Label3
* This is a Label,Label3 

#### <br> 2. Create label form
![CreateLabelForm.png](./images/CreateLabelForm.png/ "createlabelform")

1. Name is required to create a label


#### <br> 3. Filter task form
![FilterTaskForm.png](./images/FilterTaskForm.png/ "filtertaskform")

All three options are optional. If neither option is used then all the existing tasks will be shown. If the filter is written wrongly then no tasks will be shown.

#### <br> 4. Show labels
![ShowLabels.png](./images/ShowLabels.png/ "filtertaskform")

After you click on the button, all the existing labels will be shown.

#### <br> 5. Delete label form
![DeleteLabelForm.png](./images/DeleteLabelForm.png/ "deletelabelform")

1. It is possible to delete only one label at a time. Just input the name of the label that you want to delete.

#### <br> Dashboard after starting timer
![DashboardPage+Timer.png](./images/DashboardPage+Timer.png/ "dashboardpage+timer")

7. Stops and resets the global timer
8. You have to input tracking description to save the tracking
9. Saves the tracking and stops plus resets the timer.
10. Pauses/Resumes the global timer

#### <br> Taskpage
![TaskPage.png](./images/TaskPage.png/ "taskpage")

2 It works exactly like in the dashboard page <br>
6 Each tracking has its own delete button <br>
7 Current task


#### <br> 1 Edit Task
![EditTaskPage.png](./images/EditTaskForm.png/ "edittaskform")

1. Change task name
2. Change task description
3. Add one or more labels to a task

#### <br> 3 Delete label from task
![EditTaskPage.png](./images/DeleteLabelFromTaskForm.png/ "edittaskform")

1. It is possible to delete one or more labels from a task at a time. <br>
If you want to input multiple labels then there has to be a comma in between two labels and no blank spaces before or after the comma. Blank space after a label name is only allowed if the label name contains a blank space at the end. <br> 
Examples: 
* Label2,Label3
* This is a Label,Label3

#### <br> 4 Add tracking
![AddTrackingForm.png](./images/AddTrackingForm.png/ "edittrackingform")

1. Description of the tracking

#### <br> 5 Edit tracking
![EditTrackingForm.png](./images/EditTrackingForm.png/ "edittrackingform")

1. Change the description of the tracking
2. It is possible to change the start time
3. It is possible to change the end time

---
## Tests

### E2E Tests

Before running tests all the tasks, labels and trackings should be deleted. <br><br>
To run e2e tests cd in to the cypress folder in packages cmd and run
 
 * npm install cypress

After the installation

* npm run cypress

#### <br> E2E Tests
![e2eTests.png](./images/e2eTests.png/ "e2eTests")