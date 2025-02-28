import styled from "styled-components";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSession, signOut } from "next-auth/react";
import ImageUpload from "@/components/ImageUpload";
import ImageDelete from "@/components/ImageDelete";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useState } from "react";
import useSWR from "swr";
import CheckUserExistence from "@/utils/CheckUserExistence";

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

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function Profile({
  flashcards,
  collections,
  themeMode,
  onHandleToggleThemeMode,
}) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userImage, setUserImage] = useState("/asset/user.png");
  const [profileModalMode, setprofileModalMode] = useState("upload");

  const {
    data: images,
    isLoading: imagesLoading,
    error: imagesError,
    mutate: imagesMutate,
  } = useSWR("/api/images", fetcher);

  if (imagesError) return <div>failed to load</div>;
  if (imagesLoading) return <div>loading...</div>;

  let userId;
  let userName;

  async function CheckUserImage(userId) {
    const userIsAvailable = await CheckUserExistence({ userId });
    if (userIsAvailable.image) {
      setUserImage(userIsAvailable.image.url);
      return;
    } else {
      setUserImage(session.user.image);
      return;
    }
  }

  if (session) {
    userId = session.user.id;
    userName = session.user.name;
    CheckUserImage(userId);
  } else {
    userId = 189611570;
    userName = "Dominik Muster";
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

  return (
    <Container>
      <StyledPageTitle>my profile</StyledPageTitle>
      {session && (
        <img
          src={userImage}
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
        <StyledButton
          onClick={() => {
            setIsModalOpen(true);
            setprofileModalMode("delete");
          }}
          disabled={!session || userImage === session.user.image}
        >
          image delete
        </StyledButton>
        <StyledButton
          onClick={() => {
            setIsModalOpen(true);
            setprofileModalMode("upload");
          }}
          disabled={!session}
        >
          image upload
        </StyledButton>
      </ButtonBar>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={profileModalMode === "upload" ? "Upload Image" : "Delete Image"}
      >
        {profileModalMode === "upload" && (
          <ImageUpload
            onClose={() => setIsModalOpen(false)}
            imagesMutate={imagesMutate}
            userId={userId}
          ></ImageUpload>
        )}
        {profileModalMode === "delete" && (
          <ImageDelete
            onClose={() => setIsModalOpen(false)}
            imagesMutate={imagesMutate}
            userId={userId}
            userImage={userImage}
          ></ImageDelete>
        )}
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
