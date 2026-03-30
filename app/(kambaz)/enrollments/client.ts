import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, { userId, courseId });
  return data;
};
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
};