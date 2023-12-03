import React, { useEffect } from "react";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsById } from "../redux/slices/posts";
import { fetchCommentByPosts } from "../redux/slices/comments";

export const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.posts.selectedPost);
  const { comments } = useSelector((state) => state.comments);

  const isPostLoading = data === null;
  const isCommentsLoading = comments.status === "loading";

  useEffect(() => {
    dispatch(fetchPostsById(id));
    dispatch(fetchCommentByPosts(id));
  }, []);

  if (isPostLoading) {
    return <Post isLoading={isPostLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageURL}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock isLoading={isCommentsLoading} items={comments.items}>
        <AddComment />
      </CommentsBlock>
    </>
  );
};
