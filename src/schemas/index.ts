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
    .number({ message: "Blood Pressure must be number." })
    .int({ message: "Blood Pressure must be integer." })
    .min(0, { message: "Blood Pressure must be positive number." })
    .max(200, { message: "Blood Pressure must be less than 200." })
    .optional(),
  cholesterol: z.coerce
    .number({ message: "Cholestrol must be number." })
    .int("Cholestrol must be integer")
    .min(0, { message: "Cholestrol must be positive number." })
    .max(603, { message: "Cholestrol must be less than 603." })
    .optional(),
  blood_sugar: z.coerce
    .number({ message: "Blood Sugar must be entered as number." })
    .int("Blood Sugar must be integer")
    .min(0, { message: "Blood Sugar must be positive number." }),
  max_thal: z.coerce
    .number({ message: "Maximum Heart rate must be entered as number." })
    .int("Maximum Heart rate shoul be integer.")
    .min(60, { message: "Maximum Heart rate should be greater than 60." })
    .max(202, { message: "Maximum Heart rate should be less than 202." }),
  exercise_angina: z.coerce.boolean(),
  coronary_artery: z.coerce
    .number({ message: "Cornary Artery must be entered as a number." })
    .int("Cornary Artery must be integer.")
    .min(0, { message: "Cornary Artery must be positive number." })
    .max(3, { message: "Cornary Artery must be less than 3." }),
  slope: z.enum(["upsloping", "flat", "downsloping"]),
  thal: z.enum(["normal", "fixed defect", "reversible defect"]),
  ecg: z.enum(["normal", "stt abnormality", "lv hypertrophy"]).optional(),
  old_peak: z.coerce
    .number({ message: "Old Peak must be entered as a number." })
    .min(-2.6, { message: "Old Peak must be greater than -2.6." })
    .max(6.2, { message: "Old Peak must be less than 6.2." }),
});
