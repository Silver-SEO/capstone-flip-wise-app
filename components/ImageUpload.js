import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import Image from "next/image";

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 4px 24px 4px 24px;
  padding: 0 0 16px 0;
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.modalText};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 32px 0 8px 0;
  gap: 8px;
`;

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export default function ImageUpload({ onClose, imagesMutate, userId }) {
  const [uploadMode, setUploadMode] = useState("upload");
  const [image, setImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Upload not available");
      return;
    }
    setUploadMode("confirm");
    try {
      const { height, width, url } = await response.json();

      const newImage = { userId: userId, image: { height, width, url } };

      await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newImage),
      });

      imagesMutate();
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmitConfirm() {
    onClose();
  }

  function handleChange(event) {
    setImage(event.target.files[0]);
  }

  return (
    <>
      {uploadMode === "upload" && (
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="imageUpload"></Label>
          <Input
            id="imageUpload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <ButtonContainer>
            <Button type="submit" buttonLabel="image upload" />
          </ButtonContainer>
        </StyledForm>
      )}
      {uploadMode === "confirm" && (
        <>
          <StyledImageWrapper>
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview of the image to upload"
              sizes="300px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </StyledImageWrapper>
          <Button onClick={handleSubmitConfirm} buttonLabel="confirm image" />
        </>
      )}
    </>
  );
}
