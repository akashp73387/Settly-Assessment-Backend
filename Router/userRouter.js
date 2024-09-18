import express from "express";
import { createEditHistory, createTask, getAllTask, getEditHistory, updateTask } from "../Controllers/DataController.js";

const router = express.Router();

router.post("/addUser",createTask)
router.put("/editUser/:id",updateTask)
router.post('/addEditHistory',createEditHistory)
router.get('/getAllusers',getAllTask)
router.get('/getEditHistory/:userId',getEditHistory)


export default router;