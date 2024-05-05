import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Invalid password" }),
});
// .superRefine(({ password }, ctx) => {
//   if (
//     !(
//       password.match(/[A-Z]/g) &&
//       password.match(/[a-z]/g) &&
//       password.match(/[0-9]/g) &&
//       !password.match(/[^A-Za-z0-9]/g)
//     )
//   ) {
//     ctx.addIssue({
//       code: "custom",
//       path: ["password"],
//       message: "Invalid password",
//     });
//   }
// });

export const signupFormSchema = z
  .object({
    name: z.string().min(3, { message: "The name must be 3 letters at least" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters" }),

    passwordConfirm: z
      .string()
      .min(6, { message: "Passwords must be at least 8 characters" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    // if (
    //   !(
    //     password.match(/[A-Z]/g) &&
    //     password.match(/[a-z]/g) &&
    //     password.match(/[0-9]/g)
    //   )
    // ) {
    //   ctx.addIssue({
    //     code: "custom",
    //     path: ["password"],
    //     message:
    //       "Password must contain at least one uppercase character, one lowercase character, and one number",
    //   });
    // } else if (password.match(/[^A-Za-z0-9]/g)) {
    //   ctx.addIssue({
    //     path: ["password"],
    //     code: "custom",
    //     message: "Password should not contain special characters",
    //   });
    // } else
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });

export const patientSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  age: z.coerce
    .number({ message: "Age must be a number" })
    .int({ message: "Age must be an integer number" })
    .positive({ message: "Age must be a positive number" }),
  gender: z.enum(["male", "female"]),
});
