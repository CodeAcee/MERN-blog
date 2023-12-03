import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPopularPosts } from "../../redux/slices/posts";
import { useLocation } from "react-router-dom";
import { Post } from "../Post";
export const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const location = useLocation();

  const isPostsLoading = posts.status === "loading";

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        dispatch(fetchPosts());
        break;
      case "/popular":
        dispatch(fetchPopularPosts());
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <Grid xs={8} item>
      {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) =>
        isPostsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            key={item._id}
            id={item._id}
            title={item.title}
            imageUrl={item.imageURL}
            user={item.user}
            createdAt={item.createdAt}
            viewsCount={item.viewsCount}
            commentsCount={3}
            tags={item.tags}
            isEditable={userData?.user._id === item.user._id}
          />
        )
      )}
    </Grid>
  );
};
