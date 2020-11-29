import { getRepository, Timestamp } from "typeorm";
import { Task } from "../entity/Task";
import { Tracking } from "../entity/Tracking";

export const getAllTrackings = async (req, res) => {
  const trackingRepository = await getRepository(Tracking);
  const trackings = await trackingRepository.find();
  res.send({ data: trackings });
};

export const getTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    res.send({
      data: tracking,
    });
    return;
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const deleteTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const trackingRepository = await getRepository(Tracking);

  try {
    const tracking = await trackingRepository.findOneOrFail(trackingId);
    await trackingRepository.remove(tracking);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found",
    });
  }
};

export const UpdateTrackingById = async (req, res) => {
  const trackingId = req.params.trackingId;
  const { description, timestart, timeend } = req.body;
  const trackingRepository = await getRepository(Tracking);
  console.log(trackingId);
  try {
    let tracking = await trackingRepository.findOneOrFail(trackingId);
    tracking.description = description;
    tracking.timestart = timestart;
    tracking.timeend = timeend;

    tracking = await trackingRepository.save(tracking);

    res.send({
      data: tracking,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
};

export const createTracking = async (req, res) => {
  const { description, taskId, timestart, timeend } = req.body;
  if(!description || !taskId){
    res.status(400).send({
      status: "Invalid Syntax",
    });
    return;
  }
  const tracking = new Tracking();
  const taskRepository = await getRepository(Task);
  tracking.description = description;
  tracking.timestart = timestart;
  tracking.timeend = timeend;

  try {
    const foundtask = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
    });
    tracking.task = foundtask;
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }

  const trackingRepository = await getRepository(Tracking);
  const createdTracking = await trackingRepository.save(tracking);

  res.send({
    data: createdTracking,
  });
};
