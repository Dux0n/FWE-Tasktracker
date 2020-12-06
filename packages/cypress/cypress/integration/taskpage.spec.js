import { taskBuilder } from "../builder/Task";
import { labelBuilder} from "../builder/Label"

describe("TaskdPage", () => {
  const task = taskBuilder({})();
  const label = labelBuilder({})();
  it("can create a new task", () => {
      cy.visit("/");
      
      cy.findByTestId(/add-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/description/i).type(task.description);
      cy.findByText("Add new Task").click();
      cy.findByTestId("task-list-id").find("ul").should("have.length", 2);
      cy.findByTestId("task-item" + task.name).should("have.length", 1);

      cy.findByTestId("task-flex-id").click();
      cy.url().should('contain','/taskpage/');
  });


});