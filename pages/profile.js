import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession, signOut } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useState } from "react";
import useSWR from "swr";

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

const IconLogOut = styled.div`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "brightness(0)"};
  }
`;

const ButtonBar = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadowButton};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};

  &:disabled {
    cursor: not-allowed;
    color: var(--primary);
    background-color: var(--secondary);
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function Profile({
  flashcards,
  collections,
  themeMode,
  onHandleToggleThemeMode,
}) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: images,
    isLoading: imagesLoading,
    error: imagesError,
    mutate: imagesMutate,
  } = useSWR("/api/images", fetcher);

  if (imagesError) return <div>failed to load</div>;
  if (imagesLoading) return <div>loading...</div>;

  console.log();

  let userId;
  let userName;
  let userImage;

  if (session) {
    userId = session.user.id;
    userName = session.user.name;
    userImage = session.user.image;
  } else {
    userId = 189611570;
    userName = "Dominik Muster";
    userImage = "/asset/user.png";
  }

  const myCollections = collections.filter(
    (collection) => collection.owner === userId
  ).length;
  const myFlashcards = flashcards.filter(
    (flashcard) => flashcard.owner === userId
  ).length;
  const myCorrectFlashcards = flashcards.filter(
    (flashcard) => flashcard.owner === userId && flashcard.isCorrect
  ).length;

  function placeholder() {
    setIsModalOpen(true);
  }

  {
    /* <ImageUpload></ImageUpload>
            <StyledImage
        alt={`image of ${image.title}`}
        src={image.url}
        fill
        style={{ objectFit: "contain" }}
      ></StyledImage> */
  }

  return (
    <Container>
      <StyledPageTitle>my profile</StyledPageTitle>
      {session && session.user.image && (
        <img
          src={session.user.image}
          alt="profile-image"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
      )}
      {!session && (
        <IconLogOut>
          <img src={userImage} alt="login-image" width={100} height={100} />
        </IconLogOut>
      )}
      <ButtonBar>
        <StyledButton onClick={() => placeholder()} disabled={!session}>
          image delete
        </StyledButton>
        <StyledButton onClick={() => placeholder()} disabled={!session}>
          image upload
        </StyledButton>
      </ButtonBar>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Image"
      >
        <ImageUpload
          onClose={() => setIsModalOpen(false)}
          imagesMutate={imagesMutate}
          userId={userId}
        ></ImageUpload>
      </Modal>

      <article>
        <h4>statistics</h4>
        <p>Name: {userName}</p>
        <p>number of my collections: {myCollections}</p>
        <p>number of my flashcards: {myFlashcards}</p>
        <p>number of correct flashcards: {myCorrectFlashcards}</p>
      </article>
      <ButtonBar>
        <ThemeSwitch
          themeMode={themeMode}
          onHandleToggleThemeMode={onHandleToggleThemeMode}
        />
        <StyledButton onClick={() => signOut()} disabled={!session}>
          Sign out
        </StyledButton>
      </ButtonBar>
    </Container>
  );
}
