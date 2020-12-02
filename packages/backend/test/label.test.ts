/*import "jest";
import request from "supertest";
import { Label } from "../src/entity/Label";
import { Helper } from "./helper";

describe("label", () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });

  it("should be able to create a new label", async (done) => {
    await helper.resetDatabase();
    request(helper.app)
      .post("/api/label")
      .send({
        name: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("test");
        done();
      });
  });

  it("should not be able to create a new label", async (done) => {
    await helper.resetDatabase();
    request(helper.app)
      .post("/api/label")
      .send({
        name: "",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("Invalid Syntax");
        done();
      });
  });

  it("should show all labels", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/label")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(4);
        expect(res.body.data[1].name).toBe("Label2");
        done();
      });
  });

  it("get label by id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    const label = new Label();
    label.name = "Testwert";
    const savedlabel = await helper.getRepo(Label).save(label);
    request(helper.app)
      .get(`/api/label/${savedlabel.labelid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.labelid).toBe(savedlabel.labelid);
        expect(res.body.data.name).toBe(savedlabel.name);
        done();
      });
  });

  it("should not be able to get label by id", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get(`/api/label/100`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("not_found");
        done();
      });
  });

  it("should be able to update a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let label = new Label();
    label = await helper.getRepo(Label).findOneOrFail({ labelid: 1 });
    request(helper.app)
      .patch(`/api/label/${label.labelid}`)
      .send({
        name: "Edited Name",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe("Edited Name");
        done();
      });
  });

  it("should not be able to update a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .patch(`/api/label/100`)
      .send({
        name: "Edited Name",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("not_found");
        done();
      });
  });

  it("should be able to delete a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    let label = new Label();
    label = await helper.getRepo(Label).findOneOrFail({ labelid: 1 });
    request(helper.app)
      .delete(`/api/label/${label.labelid}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end(async (err) => {
        if (err) throw err;
        const [, labelCount] = await helper.getRepo(Label).findAndCount();
        expect(labelCount).toBe(3);
        done();
      });
  });

  it("should not be able to delete a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .delete(`/api/label/100`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("not_found");
        done();
      });
  });

  it("should show all tasks of a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/label/2/tasks")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].name).toBe("Task2");
        done();
      });
  });

  it("should not be able to show all tasks of a label", async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    request(helper.app)
      .get("/api/label/100/tasks")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe("not_found");
        done();
      });
  });
});
