import { taskBuilder } from "../builder/Task";

describe("DashboardPage", () => {
  it("can create a new task", () => {
      const task = taskBuilder({})();
      cy.visit("/");
      cy.screenshot();
      cy.findByTestId(/add-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/description/i).type(task.description);
      cy.findByText("Add new Task").click();
      cy.findByTestId("task-item").should("have.length", 1);
      cy.screenshot();
  });
});
