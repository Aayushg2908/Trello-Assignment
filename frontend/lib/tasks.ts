import axios from "axios";
import { cookies } from "next/headers";

export const getTasks = async () => {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/tasks`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return response.data.tasks;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    } else {
      console.log("Something went wrong!");
    }
  }
};
