import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCommentByPosts = createAsyncThunk(
  "comments/fetchCommentByPosts",
  async (id) => {
    const { data } = await axios.get(`/comment/post/${id}`);
    return data;
  }
);

export const fetchLatestComments = createAsyncThunk(
  "comments/fetchLatestComments",
  async (id) => {
    const { data } = await axios.get("/comment/latest");
    return data;
  }
);

export const fetchAddPostComment = createAsyncThunk(
  "comments/fetchAddComment",
  async (obj) => {
    const { id, text } = obj;
    try {
      const { data } = await axios.post(`/comment/${id}`, {
        text,
      });
      console.log(data, "data from request");
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
  latestComments: {
    items: [],
    status: "loading",
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // Get a comment by posts
    [fetchCommentByPosts.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchCommentByPosts.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentByPosts.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [fetchAddPostComment.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchAddPostComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
      state.comments.status = "loaded";
    },
    [fetchAddPostComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },

    [fetchLatestComments.pending]: (state) => {
      state.latestComments.status = "loading";
    },
    [fetchLatestComments.fulfilled]: (state, action) => {
      state.latestComments.items = action.payload;
      state.latestComments.status = "loaded";
    },
    [fetchLatestComments.rejected]: (state) => {
      state.latestComments.items = [];
      state.latestComments.status = "error";
    },
  },
});

export const commentsReducer = commentSlice.reducer;
