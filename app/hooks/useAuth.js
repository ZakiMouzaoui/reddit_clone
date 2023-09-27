import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { auth } from "../firebase/client";
import { useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useRecoilState(userAtom);

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //       if (authUser) {
  //         // User is authenticated
  //         setUser(authUser);
  //       } else {
  //         // User is not authenticated
  //         setUser(null);
  //       }
  //     });

  //     return () => unsubscribe();
  //   }, [setUser]);

  return user;
}
