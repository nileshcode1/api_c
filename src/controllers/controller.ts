import { useAppState } from "../models/Data";

export const useAppController = () => {
  const { dispatch } = useAppState();

  const loadUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const loadComments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      dispatch({ type: "SET_COMMENTS", payload: data });
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return { loadUser, loadComments };
};
