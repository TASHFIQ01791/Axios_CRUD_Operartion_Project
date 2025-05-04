import { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";
import { PostList } from "./PostList";
import "../App.css";
import { Form } from "../components/Form";

export const Posts = () => {
  // declaring state
  const [data, setData] = useState([]);

  // add data state
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // declaring state for edit or update part
  const [updateDataApi, setUpdateDataApi] = useState({});

  // get the api data
  const getPostData = async () => {
    const res = await getPost();
    console.log(res);
    // console.log(res.data);
    setData(res.data);
  };
  //   use useEffect
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          addData={addData}
          setAddData={setAddData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol className="main-section">
          {data.map((currData) => {
            return (
              <li key={currData.id}>
                <PostList
                  currData={currData}
                  data={data}
                  setData={setData}
                  addData={addData}
                  setAddData={setAddData}
                  updateDataApi={updateDataApi}
                  setUpdateDataApi={setUpdateDataApi}
                />
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
