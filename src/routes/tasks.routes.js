import { Router } from "express";
import { prisma } from "../db/client.js"

const router = Router();

router.get("/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

router.put("tasks/:id", async (req, rest) => {
    const id = Number(req.params.id);

    const updated = await prisma.task.update({
        where: { id },
        data: { completed: true }
    });

    res.json(updated);  
})

router.post("/tasks", async (req, res) => {
    const { title } = req.body;

    const task = await prisma.task.create({
        data: { title }
    });

    res.status(201).json(task);
});

router.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    await prisma.task.delete({
        where: { id: id },
    });
    

    res.json({ message: "Deleted" });
});

export default router;