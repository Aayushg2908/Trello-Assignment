import axios from "axios";
import { cookies } from "next/headers";

export const getUser = async () => {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log("Something went wrong!");
    }
  }
};
