import {Router} from "express";

const router = Router();

router.get("/schedule");
router.post("/schedule");
router.put("/schedule/:id");
router.delete("/schedule/:id");

export default router;