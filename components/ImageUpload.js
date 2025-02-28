import styled from "styled-components";
import Button from "./Button";

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

export default function ImageUpload() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("data_", data);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Label htmlFor="imageUpload"></Label>
      <Input id="imageUpload" type="file" name="imageUpload" required />
      <ButtonContainer>
        <Button type="submit" buttonLabel="image upload" />
      </ButtonContainer>
    </StyledForm>
  );
}
