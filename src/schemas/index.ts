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
export const diagnosisSchema = z.object({
  chest_pain: z.enum([
    "typical angina",
    "atypical angina",
    "non-anginal",
    "asymptomatic",
  ]),
  blood_pressure: z.coerce
    .number()
    .int({ message: "Blood Pressure must be integer." })
    .positive({ message: "Blood Pressure must be positive number." })
    .optional(),
  cholesterol: z.coerce
    .number()
    .int("Cholestrol must be integer")
    .positive("Cholestrol must be positive number.")
    .optional(),
  blood_sugar: z.coerce
    .number()
    .int("Blood Sugar must be integer")
    .positive({ message: "Blood Sugar must be positive number." }),
  max_thal: z.coerce
    .number()
    .int("Maximum Heart rate shoul be integer.")
    .positive("Maximum Heart rate shoul be positive number."),
  exercise_angina: z.coerce.boolean(),
  coronary_artery: z.coerce
    .number()
    .int({ message: "Cornary Artery must be integer." })
    .positive({ message: "Cornary Artery must be positive number." }),
  slope: z.enum(["upsloping", "flat", "downsloping"]),
  thal: z.enum(["normal", "fixed defect", "reversible defect"]),
  ecg: z.enum(["normal", "sst abnormality", "lv hypertrophy"]).optional(),
  old_peak: z.coerce.number(),
});
