import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import useNavigationHandler from "@/components/NavigationHandler";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 16px;
  margin-top: 12px;
`;

const StyledCollectionTitle = styled.h3`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 6px;
`;

export default function Archive({
  flashcards,
  collections,
  handleToggleCorrect,
  handleDeleteFlashcard,
  handleUpdateFlashcard,
}) {
  const router = useRouter();
  const [selectedCollections, setSelectedCollections] = useState([]);
  const { handleNavigate } = useNavigationHandler(selectedCollections);

  const options = collections.map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const handleCollectionChange = (selectedOptions) => {
    setSelectedCollections(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const { id } = router.query;

  const currentCollection = collections.find(
    (collection) => collection._id === (id ? String(id) : null)
  );

  if (!currentCollection) {
    return <p>Collection not found.</p>;
  }

  const filteredFlashcards = flashcards.filter(
    (flashcard) =>
      flashcard.collectionId === currentCollection._id && flashcard.isCorrect
  );

  return (
    <>
      <Container>
        <StyledPageTitle>Archive</StyledPageTitle>
        <CustomSelect
          options={options}
          selectedValues={selectedCollections}
          onChange={handleCollectionChange}
        />

        <Button
          onClick={handleNavigate}
          buttonLabel="Show collections"
          fontSize="13px"
          padding="5px 10px"
          margin="8px 0"
          disabled={selectedCollections.length === 0}
        />
      </Container>
      <StyledCollectionTitle>
        {currentCollection ? currentCollection.title : "All Cards"}
      </StyledCollectionTitle>
      <FlashcardList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
