import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchUsersByPage } from "./utils/FetchUtil";
import UserCard from "./UserCard";
import useLazyLoad from "./useLazyLoad";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
function App() {
  const userFetchURL = process.env.REACT_APP_USER_FETCH_URL;
  const [usersList, setUsersList] = useState<User[]>([]);
  // const loading = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const targetRef = useRef(null);

  const fetchUsers = async (url: string, page: string) => {
    if (!hasMore) {
      return;
    }
    // loading.current = true;
    const response = await fetchUsersByPage(userFetchURL, page);
    const users = response.data;
    console.log(`page=${page}`);
    console.log(users.length);
    if (users.length === 0) {
      // loading.current = false;
      setHasMore(false);
      return;
    }
    setUsersList((prevUsersList) => [...prevUsersList, ...users]);
    return;
  };
  useLazyLoad(targetRef, fetchUsers, {
    threshold: 0.5,
  });

  useEffect(() => {
    fetchUsers(userFetchURL, "1");
  }, []);

  useEffect(() => {
    console.log(usersList);
    // loading.current = false;
  }, [usersList]);

  return (
    <section className={"flex flex-col justify-center"}>
      <h1
        className={
          "text-center h-16 text-2xl font-medium content-center bg-zinc-100 border-b-4"
        }
      >
        Users
      </h1>

      {/*{loading ? (*/}
      {/*  <div className={"flex justify-center "}>*/}
      {/*    <img className={"h-48 w-48 "} src={"/logo192.png"} alt={""}></img>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {usersList.length !== 0 && (
        <ul>
          {usersList.map((user, index) => (
            <UserCard
              user={user}
              key={user.id}
              ref={index === usersList.length - 1 ? targetRef : null}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default App;
