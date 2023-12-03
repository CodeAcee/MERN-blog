import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";

const CommentListItem = ({ isLoading, user, text }) => (
  <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar alt={user.fullName || ""} src={user.avatarUrl || ""} />
        )}
      </ListItemAvatar>
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" height={25} width={120} />
          <Skeleton variant="text" height={18} width={230} />
        </div>
      ) : (
        <ListItemText primary={user.fullName} secondary={text} />
      )}
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
);

const CommentList = ({ isLoading, items }) => (
  <List>
    {isLoading
      ? Array.from({ length: 5 }).map((_, index) => (
          <CommentListItem key={index} isLoading={true} />
        ))
      : items.map((obj, index) => (
          <CommentListItem
            key={index}
            isLoading={false}
            user={obj.user}
            text={obj.text}
          />
        ))}
  </List>
);

export const CommentsBlock = ({ isLoading, items, children }) => (
  <SideBlock title="Комментарии">
    <CommentList isLoading={isLoading} items={items} />
    {children}
  </SideBlock>
);
