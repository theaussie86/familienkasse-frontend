import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADvOZSUXeQijF9ZDJ6subgjIKeKnezNGY",
  authDomain: "weissteiner-familienkasse.firebaseapp.com",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export type AuthContext = {
  user: UserCredential["user"] | null;
  setUser: (user: UserCredential["user"] | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  signIn: () => void;
  logOut: () => void;
  idToken: string | null;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserCredential["user"] | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    try {
      const credentials = await signInWithPopup(auth, provider);
      setUser(credentials.user);
      console.log(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        user.getIdToken().then((idToken) => {
          setIdToken(idToken);
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, signIn, logOut, idToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
