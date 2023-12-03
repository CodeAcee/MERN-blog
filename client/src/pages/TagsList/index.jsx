import React, { useEffect } from "react";
import { fetchPostsByTag } from "../../redux/slices/posts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Post } from "../../components/Post";
import styles from "./TagsList.module.scss";

export const TagsList = () => {
  const { items: postsItems, status: postsStatus } = useSelector(
    (state) => state.posts.postsByTag
  );
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { tag } = useParams();

  const isPostsLoading = postsStatus === "loading";

  useEffect(() => {
    dispatch(fetchPostsByTag(tag));
  }, [dispatch, tag]);

  return (
    <>
      <h1 className={styles.title}> Requests for tag #{tag}</h1>
      <Grid container>
        <Grid xs={12} item>
          {isPostsLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : postsItems.map((item) => (
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
              ))}
        </Grid>
      </Grid>
    </>
  );
};
