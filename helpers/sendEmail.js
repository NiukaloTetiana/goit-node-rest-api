import nodemailer from "nodemailer";

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  post: 465,
  secure: true,
  auth: {
    user: "tanya_niukalo@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  const email = { ...data, from: "tanya_niukalo@meta.ua" };

  await transport.sendMail(email);
};
