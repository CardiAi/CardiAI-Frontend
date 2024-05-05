/* eslint-disable @typescript-eslint/no-unused-vars */
import { decrypt, encrypt } from "@/lib/utils";
import { loginFormSchema, patientSchema, signupFormSchema } from "@/schemas";
import { store } from "@/store/store";
import { storeUser } from "@/store/userSlice";
import axios, { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { z } from "zod";

export const instance = axios.create({
  baseURL: "https://cardiai-112e49359ba9.herokuapp.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});
// export async function isAuthenticated() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return null;
//   }
//   try {
//     const res=await instance.get()
//   } catch (error) {

//   }
// }
export async function login(data: z.infer<typeof loginFormSchema>) {
  try {
    const res = await instance.post("/login", data);
    localStorage.setItem(
      "token",
      encrypt(
        res.data?.data?.token,
        import.meta.env.VITE_TOKEN_SECRET as string
      )
    );
    return res.data?.data?.user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}
export async function signup({
  passwordConfirm,
  ...data
}: z.infer<typeof signupFormSchema>) {
  try {
    const res = await instance.post("/register", data);
    return res.data?.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}
export async function getPatients(page: number = 1) {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(`/patients?page=${page}`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}
export async function createPatient(data: z.infer<typeof patientSchema>) {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.post(`/patient/add`, data, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.post(`/logout`, undefined, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}
export async function getUserData() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error();
    const res = await instance.get(`/user`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    console.log(res.data?.data);
    store.dispatch(storeUser(res.data?.data));
    return res.data?.message;
  } catch (error: unknown) {
    redirect("/login");
    localStorage.removeItem("token");
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
    throw new Error("An error occurred");
  }
}
