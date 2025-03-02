import styled from "styled-components";
import Button from "./Button";
import CheckUserExistence from "@/utils/CheckUserExistence";

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export default function ProfileDelete({ onClose, userId, userImage, signOut }) {
  async function handleDeleteProfile(userId) {
    const userData = await CheckUserExistence({ userId });
    const user_id = userData._id;
    const response = await fetch(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete user");
      return;
    }
    signOut();
    onClose();
    return;
  }

  return (
    <>
      <StyledImageWrapper>
        <img
          src={userImage}
          alt="Preview of the image to upload"
          width={300}
          height={300}
          style={{
            objectFit: "contain",
          }}
        />
      </StyledImageWrapper>
      <Button
        onClick={() => handleDeleteProfile(userId)}
        buttonLabel="profile delete"
      />
    </>
  );
}
