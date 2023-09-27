"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { theme } from "./chakra/theme";
import NavBar from "./components/NavBar/NavBar";
import { useSetRecoilState } from "recoil";
import { auth } from "./firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthUser } from "@react-query-firebase/auth";
import { userAtom } from "./atoms/userAtom";
import { useEffect } from "react";

export function Providers({ children }) {
  // const [_, loading] = useAuthState(auth);
  const { isLoading } = useAuthUser(["user"], auth);
  // const setUser = useSetRecoilState(userAtom);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {isLoading === true ? (
          <Center height={"100vh"}>
            <Spinner size={"lg"} color="red.500"></Spinner>
          </Center>
        ) : (
          <>
            <NavBar></NavBar>

            {children}
          </>
        )}
      </ChakraProvider>
    </CacheProvider>
  );
}
