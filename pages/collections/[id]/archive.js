import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
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

  const { id } = router.query;

  // Finde die aktuelle Collection
  const currentCollection = collections.find(
    (collection) => collection.id === (id ? String(id) : null)
  );

  // Filtere die Flashcards
  const filteredFlashcards = currentCollection
    ? flashcards.filter(
        (flashcard) => flashcard.collectionId === currentCollection.id
      )
    : flashcards;

  const flashcardLink = id ? `/collections/${id}/flashcards` : "/";

  return (
    <>
      <Container>
        <StyledPageTitle>Archive</StyledPageTitle>
      </Container>
      <StyledCollectionTitle>
        {currentCollection ? currentCollection.title : "All Cards"}
      </StyledCollectionTitle>
      <Link href={flashcardLink}>back to flashcards</Link>
      <ArchiveList
        flashcards={filteredFlashcards}
        collections={collections}
        handleToggleCorrect={handleToggleCorrect}
        handleDeleteFlashcard={handleDeleteFlashcard}
        handleUpdateFlashcard={handleUpdateFlashcard}
      />
    </>
  );
}
