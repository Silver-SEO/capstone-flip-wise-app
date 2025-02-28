import CollectionList from "@/components/CollectionList";
import styled from "styled-components";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
`;

const StyledPageTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 400;
  margin-bottom: 54px;
  margin-top: 6px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Homepage({
  flashcards,
  collections,
  handleCreateCollection,
  handleDeleteCollection,
  handleUpdateCollection,
}) {
  const image = { title: "Bildtitel", url: "/asset/info.png" };
  return (
    <>
      <Container>
        <StyledPageTitle>List of collections</StyledPageTitle>
      </Container>
      <ImageUpload></ImageUpload>
      {/*       <StyledImage
        alt={`image of ${image.title}`}
        src={image.url}
        fill
        style={{ objectFit: "contain" }}
      ></StyledImage> */}
      <CollectionList
        flashcards={flashcards}
        collections={collections}
        handleCreateCollection={handleCreateCollection}
        handleDeleteCollection={handleDeleteCollection}
        handleUpdateCollection={handleUpdateCollection}
      />
    </>
  );
}
