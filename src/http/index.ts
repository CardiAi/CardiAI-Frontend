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
export async function getPatients(page: number = 1, search?: string) {
  try {
    const token = localStorage.getItem("token");
    const searchParams = new URLSearchParams();
    if (search) searchParams.set("search", search);
    searchParams.set("page", page.toString());
    const res = await instance.get(`/patients?${searchParams}`, {
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
export async function createPatient(
  data: Partial<
    z.infer<typeof patientSchema> & {
      isEditing: boolean;
      patientID: string | undefined;
    }
  >
) {
  try {
    const token = localStorage.getItem("token");
    if (data.isEditing) {
      const res = await instance.put(`/patient/edit/${data.patientID}`, data, {
        headers: {
          Authorization: `Bearer ${decrypt(
            token || "",
            import.meta.env.VITE_TOKEN_SECRET as string
          )}`,
        },
      });
      return res.data?.data;
    }
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
export async function getPatientData(id: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(`/patient/show/${id}`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    if (res.data?.success) return res.data?.data;
    throw new Error(res.data?.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;

      throw new Error(err.response?.data?.message);
    }
  }
}
export async function getPatientRecords(id: string, page: number = 1) {
  try {
    const token = localStorage.getItem("token");
    const searchParams = new URLSearchParams();
    if (page) searchParams.set("page", page.toString());

    const res = await instance.get(`/patient/${id}/records?${searchParams}`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    if (res.data?.success && !res.data.message) return res.data?.data;
    if (res.data?.success && res.data.message) return null;
    throw new Error(res.data?.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;

      throw new Error(err.response?.data?.message);
    }
  }
}
export async function createRecord(
  patientID: string,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }
) {
  try {
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) return;
      data[key] = null;
    });
    const token = localStorage.getItem("token");
    const res = await instance.post(`/patient/${patientID}/record/add`, data, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;

      throw new Error(err.response?.data?.message);
    }
  }
}
export async function deletePatient(id: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.delete(`/patient/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;

      throw new Error(err.response?.data?.message);
    }
  }
}
export async function getRecord(id: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await instance.get(`/record/show/${id}`, {
      headers: {
        Authorization: `Bearer ${decrypt(
          token || "",
          import.meta.env.VITE_TOKEN_SECRET as string
        )}`,
      },
    });
    return res.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message);
    }
  }
}
