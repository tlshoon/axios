import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import useStore from "./store.js/store";

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: { "X-Custom-Header": "foobar" },
});

async function makeRequest({ method, path, data, onSuccess, onFail }) {
  try {
    const res = await instance[method](path, data);
    onSuccess && onSuccess(res);
  } catch (error) {
    onFail && onFail(error);
  }
}

function App() {
  const {
    data,
    setData,
    email,
    setEmail,
    password,
    setPassword,
    singleUser,
    setSingleUser,
    name,
    setName,
    job,
    setJob,
    id,
    setId,
  } = useStore();

  useEffect(() => {
    fetchUser();
    fetchSingleUser();
  }, []);

  const fetchUser = () => {
    makeRequest({
      method: "get",
      path: "/users?page=2",
      onSuccess: (res) => setData(res.data.data),
      onFail: (error) => console.error(error),
    });
  };

  const fetchSingleUser = async () => {
    try {
      const res = await instance.get("/users/2");
      if (res.status === 200) {
        setSingleUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postUserData = () => {
    makeRequest({
      method: "post",
      path: "/users",
      data: { name: "morpheus", job: "leader" },
      onSuccess: (res) => {
        if (res.status === 201) console.log("POST 성공");
      },
      onFail: (error) => console.error(error),
    });
  };

  const deleteUserData = () => {
    makeRequest({
      method: "delete",
      path: "/users/2",
      onSuccess: (res) => {
        if (res.status === 204) console.log("삭제 성공");
      },
      onFail: (error) => console.log(error),
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    makeRequest({
      method: "post",
      path: "/register",
      data: { email, password },
      onSuccess: (res) => console.log(res.data.token),
      onFail: (error) => console.log(error),
    });
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const postName = async (e) => {
    e.preventDefault();
    try {
      const req = await instance.post("/users", {
        name,
        job,
      });
      if (req.status === 201) {
        setId(req.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul>{data && data.map((item) => <li key={item.id}>{item.email}</li>)}</ul>
      <button onClick={postUserData}>post데이터</button>
      <button onClick={deleteUserData}>delete데이터</button>
      <form onSubmit={loginSubmit}>
        <input type="email" placeholder="email" onChange={emailChange} />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      <div>{singleUser && singleUser.first_name}</div>

      <form onSubmit={postName}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="job"
          onChange={(e) => setJob(e.target.value)}
        />
        <button type="submit">이름, 직업 버튼</button>
      </form>
      {id && (
        <>
          <div>{id.id}</div>
          <div>{id.createdAt}</div>
        </>
      )}
    </>
  );
}

export default App;
