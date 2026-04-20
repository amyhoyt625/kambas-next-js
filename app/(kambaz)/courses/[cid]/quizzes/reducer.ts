//Redux slice manages the global quizzes state by providing actions to 
//add, delete, update, replace, and toggle the published status of quizzes in a course


//REDUCER manage/update front end based on results from client 


import { createSlice } from "@reduxjs/toolkit";

// initial state is an empty array since quizzes are fetched from the database per course
const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // adds a new quiz to the list
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz];
    },
    // removes a quiz from the list by its id
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    // replaces a quiz in the list with the updated version
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      );
    },
    // replaces the entire quizzes array, used after fetching from the server
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    // flips published true/false without needing another server fetch
    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes, togglePublish } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;