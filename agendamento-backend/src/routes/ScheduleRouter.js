import {Router} from "express";
import ScheduleController from "../controller/ScheduleController.js";

const router = Router();

const scheduleController = new ScheduleController();

router.get("/schedule", scheduleController.index.bind(scheduleController));
router.post("/schedule", scheduleController.store.bind(scheduleController));
router.put("/schedule/:id", scheduleController.update.bind(scheduleController));
router.delete("/schedule/:id", scheduleController.remove.bind(scheduleController));

export default router;