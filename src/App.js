import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const instance = axios.create({
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
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    makeRequest({
      method: "get",
      path: "/users?page=2",
      onSuccess: (res) => setData(res.data.data),
      onFail: (error) => console.error(error),
    });
  }, []);

  const postUserData = () => {
    makeRequest({
      method: "post",
      path: "/users",
      data: { name: "morpheus", job: "leader" },
      onSuccess: (res) => {
        if (res.status === 201) console.log("성공");
      },
      onFail: (error) => console.error(error),
    });
  };

  const deleteUserData = () => {
    makeRequest({
      method: "delete",
      path: "/users/2",
      onSuccess: (res) => {
        if (res.status === 204) console.log("성공임둥");
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

  return (
    <>
      <ul>{data && data.map((item) => <li key={item.id}>{item.email}</li>)}</ul>
      <button onClick={postUserData}>post데이터</button>
      <button onClick={deleteUserData}>delete데이터</button>
      <form onSubmit={loginSubmit}>
        <input type="email" placeholder="email" onChange={emailChange} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}

export default App;
