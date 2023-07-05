import React, { useEffect } from "react";
import { instance } from "./App";
import useStore from "./store.js/store";

const Profile = () => {
  const {delay, setDelay} = useStore();

  useEffect(() => {
    fetchDelay();
  }, []);

  const fetchDelay = async () => {
    try {
      const res = await instance.get("/users?delay=3");
      if (res.status === 200) return setDelay(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {delay &&
          delay.map((data) => (
            <div key={data.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "10px" }}>
              <img src={data.avatar} alt="avatar" style={{ width: "100px", height: "100px" }} />
              <span>{data.first_name}</span>
            </div>
          ))}
      </div>
    </>
  );
};
export default Profile;
