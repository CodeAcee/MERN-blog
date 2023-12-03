import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchTags } from "../redux/slices/posts";
import { PostList } from "../components/PostsList";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchLatestComments } from "../redux/slices/comments";

export const Home = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.posts);
  const { items, status } = useSelector(
    (state) => state.comments.latestComments
  );
  const location = useLocation();

  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchLatestComments());
  }, []);

  const tabs = [
    { label: "Новые", value: "/", index: 0 },
    { label: "Популярные", value: "/popular", index: 1 },
  ];

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        aria-label="basic tabs example"
        value={location.pathname}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            component={Link}
            to={tab.value}
            {...a11yProps(tab.index)}
          />
        ))}
      </Tabs>
      <Grid container spacing={4}>
        <PostList />
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
