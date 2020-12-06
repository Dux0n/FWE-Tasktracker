import { taskBuilder } from "../builder/Task";
import { labelBuilder } from "../builder/Label";
import { trackingBuilder } from "../builder/Tracking";

describe("TaskPage", () => {
  const task = taskBuilder({})();
  const label = labelBuilder({})();
  const tracking = trackingBuilder({})();
  it("redirect to taskpage", () => {
    cy.visit("/");

    cy.findByTestId(/add-task-button/i).click();
    cy.findByLabelText(/name/i).type(task.name);
    cy.findByLabelText(/description/i).type(task.description);
    cy.findByText("Add new Task").click();
    cy.findByTestId("task-list-id").find("ul").should("have.length", 2);
    cy.findByTestId("task-item" + task.name).should("have.length", 1);

    cy.findByTestId("task-flex-id").click();
    cy.url().should("contain", "/taskpage/");
  });

  it("can create a new tracking", () => {
    cy.findByTestId(/add-tracking-button/i).click();
    cy.findByLabelText(/description/i).type(tracking.description);
    cy.findByText("Add a tracking").click();
    cy.findByTestId("tracking-list-id").find("ul").should("have.length", 1);
  });

  it("can delete a tracking", () => {
    cy.findByTestId(/delete-tracking-button/i).click();
    cy.findByTestId("tracking-list-id").find("ul").should("have.length", 0);
  });

  it("can add a label to a task", () => {

    cy.visit("/");
    cy.findByTestId(/create-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByText("Create a label").click();
    
    cy.findByTestId("task-flex-id").click();

    cy.findByTestId(/edit-task-button/i).click();
    cy.findByLabelText(/label/i).type(label.name);
    cy.findByText("Edit the task").click();
    cy.findByTestId("label-list-id").find("li").should("have.length", 1);
  });

  it("can delete a label from task", () => {

    cy.findByTestId(/delete-label-button/i).click();
    cy.findByLabelText(/labels/i).type(label.name);
    cy.findByText("Delete the labels").click();
    cy.findByTestId("label-list-id").find("li").should("have.length", 1);

  });
});
