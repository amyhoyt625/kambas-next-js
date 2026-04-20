//API: handles all communication btwn frontend and backend for quizzess
// and submissions using HTTP requests

//provide reusable functions for CRUD


//CLIENT handles communication with backend API

import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

//API endpoints
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

//Quiz CRUD operations

//get all quizzes for a specific course
export const findQuizzesForCourse = async (cid: string) => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
  return data;
};

//create new quiz for course
export const createQuizForCourse = async (cid: string, quiz: any) => {
  const { data } = await axios.post(`${COURSES_API}/${cid}/quizzes`, quiz);
  return data;
};

//async (takes time so needs to be awaited)

//update an existing quiz
export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put( //sends an HTTP PUT request aka update existing data
    `${QUIZZES_API}/${quiz._id}` // builds url
    , quiz); // this gets sent to the server
  return data;
};

//delete a quiz
export const deleteQuiz = async (quizId: string) => {
  await axios.delete(`${QUIZZES_API}/${quizId}`);
};

//get a single quiz by id
export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

//publish 
export const publishQuiz = async (quizId: string) => {
  await axios.put(`${QUIZZES_API}/${quizId}/publish`);
};

//unpublish
export const unpublishQuiz = async (quizId: string) => {
  await axios.put(`${QUIZZES_API}/${quizId}/unpublish`);
};

//get user's submission for a quiz
export const getSubmission = async (quizId: string, userId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/submissions/${userId}`);
  return data;
};

//create new submission when press submit button 
export const createSubmission = async (quizId: string, submission: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}/submissions`, submission);
  return data;
};