// import { useState } from "react";
import { postData, updateData } from "../api/PostApi";

export const Form = ({
  data,
  setData,
  addData,
  setAddData,
  updateDataApi,
  setUpdateDataApi,
}) => {
  //   when time to imput change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const name = e.target.name;
    // const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // add post data
  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);
    // this will add data to api means it return promise
    if (res.status === 201) {
      setData([...data, res.data]);

      // clearing input box
      setAddData({ title: "", body: "" });
    }
  };
  // update post data
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((currElem) => {
            return currElem.id === res.data.id ? res.data : currElem;
          });
        });
        // clearing input box
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  let isEmpty = Object.keys(updateDataApi).length === 0;

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Add Title"
          autoComplete="off"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          name="body"
          id="body"
          placeholder="Add Post"
          autoComplete="off"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};
