import { Request, Response } from "express"
import { generateInvoicePDF } from "../../utils/generateInvoice";



export const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000);

    return `INV/${year}/${month}/${random}`;
};



const createInvoice = async (req: Request, res: Response) => {
    const invoiceData = {
        company: {
            name: "Bangladesh.com",
            email: "info@company.com"
        },
        invoiceNumber: generateInvoiceNumber(),
        dueDate: new Date().toLocaleString(),
        items: [
            { name: "Three-seat Sofa", price: 1500, qty: 5 }
        ],
        total: 9141.27
    };

    const pdfPath = await generateInvoicePDF(invoiceData);

    res.download(pdfPath);
};


export const invoiceController = {
    createInvoice
}