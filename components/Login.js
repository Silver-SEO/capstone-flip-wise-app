import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { useState } from "react";
import Link from "next/link";

const IconLogIn = styled.span`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
`;

const IconLogOut = styled.span`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "brightness(0)"};
  }
`;

const StyledButton = styled.button`
  height: 20px;
  background-color: ${({ theme }) => theme.cardPrimary};
  color: ${({ theme }) => theme.cardPrimaryText};
  cursor: pointer;
`;

export default function Login({ handleCreateUser, CheckUserExistence }) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    async function controlUserExistence() {
      if (session) {
        const userId = session.user.id;
        const userIsAvailable = (await CheckUserExistence({ userId }))
          ? true
          : false;
        if (!userIsAvailable) {
          const userId = session.user.id;
          handleCreateUser({ userId });
        }
      }
    }
    controlUserExistence();
  }, [session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [isModalOpen]);

  function handleSignOut() {
    signOut();
    setIsModalOpen(true);
  }

  if (session) {
    return (
      <>
        <Link href={`/profile`}>
          <IconLogIn>
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Profilbild"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                src="/asset/user.png"
                alt="login/image"
                width={40}
                height={40}
              />
            )}
          </IconLogIn>
        </Link>
        <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="You are now logged out."
        ></Modal>
      </>
    );
  }

  return (
    <Link href={`/profile`}>
      <IconLogOut>
        <img src="/asset/user.png" alt="login/image" width={40} height={40} />
      </IconLogOut>
      <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
    </Link>
  );
}
