import emailjs from "@emailjs/browser";

export const sendOtpEmail = (email, otp) => {
  return emailjs.send(
    "service_gn2uevl",
    "template_0w47q6q",
    {
      to_email: email,
      otp: otp,
    },
    "2fSm0_O_d13aGMXQO"
  );
};
