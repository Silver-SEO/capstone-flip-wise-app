import styled from "styled-components";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import Link from "next/link";

const ModeList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
`;

const ModeItem = styled.li`
  width: 100%;
  height: 300px;
  max-width: 550px;
  margin: 48px auto;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  list-style: none;
  box-shadow: ${({ theme }) => theme.boxShadowCollectionCard};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.boxShadowCollectionCardHover};
  }
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
