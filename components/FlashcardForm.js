import { collections } from "@/lib/db/collections";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export default function FlashcardForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit(data);
    //event.target.reset();
    //event.target.elements.role.focus();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="question">Question:</label>
      <input
        id="question"
        type="text"
        name="question"
        placeholder="Question*"
        required
      ></input>
      <label htmlFor="answer">Answer:</label>
      <input
        id="answer"
        type="text"
        name="answer"
        placeholder="Answer*"
        required
      ></input>
      <label htmlFor="collections-select">Collection:</label>
      <select
        name="collectionId"
        id="collections-select"
        defaultValue=""
        required
      >
        <option value="" disabled>
          --Please select a collection--
        </option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.title}
          </option>
        ))}
      </select>
      <button type="submit">create</button>
    </StyledForm>
  );
}
