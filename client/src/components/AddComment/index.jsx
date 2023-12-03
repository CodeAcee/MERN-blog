import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAddPostComment } from "../../redux/slices/comments";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddComment.module.scss";

export const AddComment = () => {
  const [text, setText] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.data);

  const handleSubmit = () => {
    dispatch(fetchAddPostComment({ id, text }));
    setText("");
  };

  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src={user.avatarURL}
      />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          onChange={(e) => setText(e.target.value)}
          multiline
          value={text}
          fullWidth
        />
        <Button onClick={handleSubmit} variant="contained">
          Отправить
        </Button>
      </div>
    </div>
  );
};
