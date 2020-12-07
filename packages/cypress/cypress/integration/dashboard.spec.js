import { taskBuilder } from "../builder/Task";
import { labelBuilder} from "../builder/Label"

describe("DashboardPage", () => {
  const task = taskBuilder({})();
  const label = labelBuilder({})();
  it("can create a new task", () => {
      cy.visit("/");
      cy.screenshot();
      cy.findByTestId(/add-task-button/i).click();
      cy.findByLabelText(/name/i).type(task.name);
      cy.findByLabelText(/description/i).type(task.description);
      cy.findByText("Add new Task").click();
      cy.findByTestId("task-list-id").find("ul").should("have.length", 2);
      cy.findByTestId("task-item" + task.name).should("have.length", 1);
      cy.screenshot();
  });

  it("can create a new label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/show-labels-button/i).click();
    cy.findByTestId(/create-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByText("Create a label").click();
    cy.findByTestId("label-list-id").find("li").should("have.length", 1);
    cy.screenshot();
});

it("can delete a new label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/show-labels-button/i).click();
    cy.findByTestId(/delete-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByText("Delete a label").click();
    cy.findByTestId("label-list-id").find("li").should("have.length", 0);
    cy.screenshot();
});

  it("can filter a task by name", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/filter-task-button/i).click();
    cy.findByLabelText(/Name/i).type(task.name);
    cy.findByText("Use current filter").click();
    cy.findByTestId("task-list-id").find("ul").should("have.length", 2);
    cy.findByTestId("task-item" + task.name).should("have.length", 1);
    cy.screenshot();
});

  it("can delete a task", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("delete-task-button"+ task.name).click();
    cy.findByTestId("task-list-id").find("ul").should("have.length", 0);
    cy.screenshot();
    });
});