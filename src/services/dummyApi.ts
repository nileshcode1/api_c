export const fetchUserData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

export const fetchCommentsData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
};
