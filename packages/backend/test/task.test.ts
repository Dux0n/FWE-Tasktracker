import "jest";
import request from "supertest";
import { Task } from "../entity/Task";
import { Helper } from "./helper";

describe("task", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to create a new task", async (done) => {
    await helper.resetDatabase();
    request(helper.app)
      .post("/api/task")
      .send({
        name: "test",
        description: "tdesc",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.description).toBe("tdesc");
        expect(res.body.data.name).toBe("test");
        done();
      });
  });

  it("should show all tasks", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/task")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].name).toBe("Task2");
        expect(res.body.data[0].description).toBe("Test description");
        done();
      });
  });

  it("get task by id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const task = new Task();
    task.name = "Testwert";
    task.description = "Das ist ein Test";
    const savedtask = await helper.getRepo(Task).save(task);
    request(helper.app)
      .get(`/api/task/${savedtask.taskid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.taskid).toBe(savedtask.taskid);
        expect(res.body.data.name).toBe(savedtask.name);
        expect(res.body.data.description).toBe(savedtask.description);

        done();
      });
  });

  it("it should be able to update a task", async (done) => {
    await helper.resetDatabase();
    const task = new Task();
    task.name = "Testwert";
    task.description = "Das ist ein Test";
    const savedtask = await helper.getRepo(Task).save(task);
    request(helper.app)
      .patch(`/api/task/${savedtask.taskid}`)
      .send({
        description: "Edited Description",
        name: "Edited Name",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Edited Name");
        expect(res.body.data.description).toBe("Edited Description");
        done();
      });
  });

  it("it should be able to delete a task", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    task = await helper.getRepo(Task).findOneOrFail({ taskid: 1 });
    request(helper.app)
      .delete(`/api/task/${task.taskid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err) => {
        if (err) throw err;
        const [, taskCount] = await helper.getRepo(Task).findAndCount();
        expect(taskCount).toBe(2);
        done();
      });
  });

  it("it should be able to add a label by taskid", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    task = await helper.getRepo(Task).findOneOrFail({
      where: { taskid: 3 },
      relations: ["labels"],
    });
    request(helper.app)
      .patch(`/api/task/${task.taskid}/addlabel`)
      .send({ labels: [4] })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.labels.length).toBe(4);
        done();
      });
  });

  it("it should be able to delete a label by taskid", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let task = new Task();
    task = await helper.getRepo(Task).findOneOrFail({
      where: { taskid: 3 },
      relations: ["labels"],
    });
    request(helper.app)
      .patch(`/api/task/${task.taskid}/deletelabel`)
      .send({ labels: [1, 2] })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.labels.length).toBe(1);
        done();
      });
  });

  it("should show all labels of a task", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/task/1/labels")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe("Label2");
        done();
      });
  });

  it("should show all trackings of a task", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/task/3/trackings")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].description).toBe("Tracking1");
        done();
      });
  });
});
