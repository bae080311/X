import React, { useState } from "react";
import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
`;

const EditButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const EditInput = styled.textarea`
  font-size: 18px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #1d9bf0;
  margin-bottom: 10px;
  resize: none;
  margin-right: 10px;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweet);

  const onDelete = async () => {
    if (!user || user.uid !== userId) return;

    try {
      await deleteDoc(doc(db, "tweets", id));
      console.log(`Tweet with id ${id} deleted successfully.`);
    } catch (e) {
      console.error("Error deleting tweet:", e);
    }
  };

  const onEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || user.uid !== userId) return;

    try {
      const tweetDoc = doc(db, "tweets", id);
      await updateDoc(tweetDoc, { tweet: newTweet });
      console.log(`Tweet with id ${id} updated successfully.`);
      setIsEditing(false);
    } catch (e) {
      console.error("Error updating tweet:", e);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <EditForm onSubmit={onEdit}>
            <EditInput
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <EditButton type="submit">Save</EditButton>
          </EditForm>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId && (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? "Cancel" : "Edit"}
            </EditButton>
          </>
        )}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
