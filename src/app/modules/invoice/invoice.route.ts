import { Router } from "express";
import { invoiceController } from "./invoice.controller";

const router = Router();


router.post("/", invoiceController.createInvoice);


export const invoiceRoutes = router;