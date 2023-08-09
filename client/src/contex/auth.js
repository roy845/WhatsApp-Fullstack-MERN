import { useState, useContext, createContext, useRef, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [person, setPerson] = useState({});
  const [group, setGroup] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [users, setUsers] = useState([]);
  const [showLastConversations, setShowLastConversations] = useState(
    JSON.parse(localStorage.getItem("showLastConversations"))
  );

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
  }, []);

  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        person,
        setPerson,
        group,
        setGroup,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,
        users,
        setUsers,
        showLastConversations,
        setShowLastConversations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
