import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/posts/populate");
    return data;
  }
);

export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPostsByTags",
  async (tag) => {
    const { data } = await axios.get(`/posts/tags/${tag}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchPostsById = createAsyncThunk(
  "posts/fetchPostsById",
  async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePosts",
  async (id) => await axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  selectedPost: {
    status: "loading",
    data: null,
  },
  postsByTag: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Get a posts
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // get Populate posts
    [fetchPopularPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // Get a tags
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // Delete Post
    [deletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
    // Post By id
    [fetchPostsById.pending]: (state) => {
      state.selectedPost.status = "loading";
    },
    [fetchPostsById.fulfilled]: (state, action) => {
      state.selectedPost.data = action.payload;
      state.selectedPost.status = "loaded";
    },
    [fetchPostsById.rejected]: (state) => {
      state.selectedPost.data = null;
      state.selectedPost.status = "error";
    },
    // Post by Tag

    [fetchPostsByTag.pending]: (state) => {
      state.postsByTag.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.postsByTag.items = action.payload;
      state.postsByTag.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.postsByTag.items = [];
      state.postsByTag.status = "error";
    },
  },
});

export const postsReducer = postSlice.reducer;
