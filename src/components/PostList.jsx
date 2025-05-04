import { useEffect } from "react";
import { deletePost } from "../api/PostApi";

export const PostList = ({
  currData,
  data,
  setData,
  // eslint-disable-next-line no-unused-vars
  addData,
  setAddData,
  updateDataApi,
  setUpdateDataApi,
}) => {
  const { id, title, body } = currData;

  // delete post funtion
  const handleDeletePost = async (id) => {
    const res = await deletePost(id);
    console.log(res);
    if (res.status === 200) {
      const updatedPosts = data.filter((currPost) => currPost.id !== id);
      setData(updatedPosts);
    }
  };

  // update and edit specific portion
  const handleUpdatePost = (currData) => {
    setUpdateDataApi(currData);
  };
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title,
        body: updateDataApi.body,
      });
  }, [setAddData, updateDataApi]);

  return (
    <>
      <p>{title}</p>
      <p>{body}</p>
      <button onClick={() => handleUpdatePost(currData)}>Edit</button>
      <button className="btn-delete" onClick={() => handleDeletePost(id)}>
        Delete
      </button>
    </>
  );
};
