import express from "express";
import { addNewAdmin, getAllDoctors, login, patientRegister,getUserDetails, logoutAdmin, logoutPatient } from "../controller/userController.js";
import {isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.middlewares.js"

const router = express.Router();

router.post("/patient/register" ,patientRegister)
router.post("/login" ,login)
router.post("/admin/addnew",isAdminAuthenticated ,addNewAdmin)
router.get("/doctors",getAllDoctors)
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

export default router;