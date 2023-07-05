import React, { useEffect} from "react";
import { instance } from "./App";
import useStore from "./store.js/store";

const List = () => {
  const {list, setList} = useStore();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await instance.get("/unknown");
      if (res.status === 200) return setList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ol>
        {list &&
          list.map((data) => (
            <li key={data.id}>
              <div style={{display:'flex'}}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: `${data.color}`,
                  }}
                ></div>
                <span>{data.color}</span>
              </div>
            </li>
          ))}
      </ol>
    </>
  );
};

export default List;
