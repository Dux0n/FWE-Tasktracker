import { Connection, getRepository } from "typeorm";
import { Label } from "../entity/Label";

export const getAllLabels = async (req, res) => {
  const labelRepository = await getRepository(Label);
  const labels = await labelRepository.find();
  res.send({ data: labels });
};

export const getLabelById = async (req, res) => {
  const labelId = req.params.labelId;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    res.send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteLabelById = async (req, res) => {
  const { labelId } = req.params;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    await labelRepository.remove(label);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
};

export const updateLabelById = async (req, res) => {
  const { labelId } = req.params;
  const { name } = req.body;
  const labelRepository = await getRepository(Label);

  try {
    let label = await labelRepository.findOneOrFail(labelId);
    label.name = name;

    label = await labelRepository.save(label);

    res.send({
      data: label,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const createLabel = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({
      status: "Invalid Syntax",
    });
    return;
  }
  const label = new Label();
  label.name = name;

  const labelRepository = await getRepository(Label);
  const createdlabel = await labelRepository.save(label);

  res.send({
    data: createdlabel,
  });
};

export const getAllTaskOfLabel = async (req, res) => {
  const { labelId } = req.params;
  const labelRepository = await getRepository(Label);
  try {
    const label = await labelRepository.findOneOrFail({
      where: { labelid: labelId },
      relations: ["tasks"],
    });
    const tasks = label.tasks;
    res.send({
      data: tasks,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
};
