import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthProvider } from "../context/MainProvider";
import man2 from "../assets/man2.jpeg";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currUser } = useContext(AuthProvider);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      const allUsersFromSearch = [];
      querySnapshot.forEach((doc) => {
        allUsersFromSearch.push(doc.data());
      });
      setUser(allUsersFromSearch);
    } catch (err) {
      alert(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedID =
      currUser.uid > user.uid
        ? currUser.uid + user.uid
        : user.uid + currUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        await updateDoc(doc(db, "userChats", currUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currUser.uid,
            displayName: currUser.displayName,
            photoURL: currUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      alert(err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="border-b">
      <div className="px-2 py-1">
        <input
          type="text"
          placeholder="Search friends"
          className="text-white text-md placeholder:text-white font-semibold outline-0 border w-full h-[40px] rounded-full px-3"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          value={username}
        />
      </div>
      {user && (
        <>
          {user.map((item) => (
            <div
              className="cursor-pointer p-2 flex items-center gap-2 text-white hover:bg-purple-400"
              onClick={handleSelect}
            >
              <img
                // src={item.photoURL}
                src={man2}
                className="h-[50px] w-[50px] object-cover rounded-full"
              />
              <div>
                <span className="text-xl">{item.displayName}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Search;
