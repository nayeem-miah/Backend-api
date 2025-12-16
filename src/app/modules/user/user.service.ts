import { Request } from "express";
import prisma from "../../prisma/prisma";
import { fileUpload } from "../../utils/fileUpload";
import { sendEmail } from "../../utils/emailSender";
import { stripe } from "../../utils/stripe";
import config from "../../config";
import ApiError from "../../errors/apiError";
import bcrypt from "bcryptjs";

const createUser = async (req: Request) => {
    const {password} = req.body;
    

    const isExistingUser = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if(!password){
        throw new ApiError(500, "password is requied")
    }
   

    const hashPassword = await bcrypt.hash(password,10)



    if (isExistingUser) {
        throw new ApiError(403,"User already exits!")
    }

    // ! file uploading -------------------------------------
    if (!req.file) {
        throw new ApiError(404,"file is required!");
    }

    const uploadedResult = await fileUpload.uploadToCloudinary(req.file);
    const image_url = uploadedResult?.secure_url;

    // !file uploaded done -------------------------------------

    const result = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password:hashPassword,
            profilePicture: image_url
        }
    })

    // ! email sender  --------------------------------------
    await sendEmail({
        to: req.body.email,
        subject: "Welcome to SMT Project 🎉",
        html: `
      <h2>Hello ${req.body.name}</h2>
      <p>Welcome to our platform.</p>
      <p>Happy coding 🚀</p>
    `,
    });
    // ! email sent done------------------------------------------


    // ! implement payment system ----------------------------
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",

        customer_email: req.body.email,

        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Order #${123}`,
                    },
                    unit_amount: 100 * 100,
                },
                quantity: 1,
            },
        ],

        metadata: {
            orderId: 123,
            userId: result.id,
        },

        success_url:
            `${config.stripe.frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
            `${config.stripe.frontendUrl}/payment/cancel`,
    });

    // ! send payment success email --------------------------
    await sendEmail({
        to: req.body.email,
        subject: "Payment Successful 🎉",
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hello ${req.body.name},</h2>

      <p>✅ Your payment has been <strong>successfully completed</strong>.</p>

      <hr />

      <p><strong>Payment Details:</strong></p>
      <ul>
        <li><strong>Amount Paid:</strong> $${(100).toFixed(2)} USD</li>
        <li><strong>Order ID:</strong> #123</li>
        <li><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>

      <hr />

      <p>
        Thank you for choosing <strong>SMT Project</strong>.
        If you have any questions, feel free to contact our support team.
      </p>

      <p>Happy coding 🚀</p>

      <p style="margin-top: 30px;">
        Best regards,<br/>
        <strong>SMT Project Team</strong>
      </p>
    </div>
  `,
    });
    // ! email sent done --------------------------------------------

    return { clientSecret: session.url, result }
    // ! done payment --------------------------------------------
};

const getUsers = async () => {
    return await prisma.user.findMany({
        include: { posts: true },
    });

};

export const UserService = {
    createUser,
    getUsers,
};
