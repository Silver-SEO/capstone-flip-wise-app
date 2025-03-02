import styled from "styled-components";
import Button from "./Button";
import Image from "next/image";
import CheckUserExistence from "@/utils/CheckUserExistence";

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export default function ImageDelete({ onClose, userId, userImage }) {
  async function handleSubmitDelete() {
    //delete user image in database
    const userData = await CheckUserExistence({ userId });
    const user_Id = userData._id;
    try {
      const newImage = { image: null };

      const response = await fetch(`/api/users/${user_Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newImage),
      });
      if (!response.ok) {
        console.error("Failed to save user data");
        return null;
      }
      onClose();
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <>
      <StyledImageWrapper>
        <Image
          src={userImage}
          alt="Preview of the image to upload"
          width={300}
          height={300}
          style={{
            objectFit: "contain",
          }}
        />
      </StyledImageWrapper>
      <Button onClick={() => handleSubmitDelete()} buttonLabel="image delete" />
    </>
  );
}
