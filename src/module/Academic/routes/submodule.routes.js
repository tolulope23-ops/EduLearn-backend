import express from "express";
import { submoduleControllerInstance } from "../container.js";

const router = express.Router();

router.get("/:subModuleId", submoduleControllerInstance.getSubModule);  // Get submodule by id  

router.get("/all/:moduleId", submoduleControllerInstance.getSubModulesByModule); //Get all Submodules in a module

// Get submodule by sequence
router.get("/sequence/find", submoduleControllerInstance.getSubModuleBySequence);


export default router;