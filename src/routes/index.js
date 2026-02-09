import { Router } from "express";
import tasksRoutes from "./tasks.routes.js";

const router = Router();

router.use(tasksRoutes);

export default router;