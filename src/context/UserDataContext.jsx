import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";

// Create context
const UserDataContext = createContext(null);

// Provider
export const UserDataProvider = ({ children }) => {

    const [uid, setUid] = useState(null);
    const [profile, setProfile] = useState(null);
    const [todos, setTodos] = useState(null);
    const [quickList, setQuickList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);

        // Listen to login/logout
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
                setProfile(null);
                setTodos(null);
                setQuickList(null);
                setLoading(false);
            }
        });
        return () => unsubAuth();
    }, []);

    useEffect(() => {
        if (!uid) return;

        const db = getDatabase(app);

        const profileRef = ref(db, `users/${uid}/profile`);
        const todosRef = ref(db, `users/${uid}/todos`);
        const quickListRef = ref(db, `users/${uid}/quickList`);

        const unsubProfile = onValue(profileRef, (snap) => {
            setProfile(snap.val());
        });

        const unsubTodos = onValue(todosRef, (snap) => {
            setTodos(snap.val());
        });

        const unsubQuickList = onValue(quickListRef, (snap) => {
            setQuickList(snap.val());
        });

        setLoading(false);

        return () => {
            unsubProfile();
            unsubTodos();
            unsubQuickList();
        };
    }, [uid]);

    return (
        <UserDataContext.Provider value={{ uid, profile, todos, quickList, loading }}>
            {!loading && children}
        </UserDataContext.Provider>
    );
};

// Hook
export const useUserData = () => {
    return useContext(UserDataContext);
};

export default UserDataContext;