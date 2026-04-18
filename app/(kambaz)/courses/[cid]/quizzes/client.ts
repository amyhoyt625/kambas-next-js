import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;


export const findQuizzesForCourse = async (cid: string) => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
  return data;
};
export const createQuizForCourse = async (cid: string, quiz: any) => {
  const { data } = await axios.post(`${COURSES_API}/${cid}/quizzes`, quiz);
  return data;
};

//async (takes time so needs to be awaited)

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put( //sends an HTTP PUT request aka update existing data
    `${QUIZZES_API}/${quiz._id}` // builds url
    , quiz); // this gets sent to the server
  return data;
};
export const deleteQuiz = async (quizId: string) => {
  await axios.delete(`${QUIZZES_API}/${quizId}`);
};
export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};
export const publishQuiz = async (quizId: string) => {
  await axios.put(`${QUIZZES_API}/${quizId}/publish`);
};
export const unpublishQuiz = async (quizId: string) => {
  await axios.put(`${QUIZZES_API}/${quizId}/unpublish`);
};

export const getSubmission = async (quizId: string, userId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/submissions/${userId}`);
  return data;
};

export const createSubmission = async (quizId: string, submission: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}/submissions`, submission);
  return data;
};