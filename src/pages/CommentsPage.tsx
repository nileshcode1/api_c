

import React, { useEffect, useState } from "react";
import { useAppState } from "../models/Data";
import { useAppController } from "../controllers/controller";

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const CommentsPage: React.FC = () => {
  const { state } = useAppState();
  const { loadComments } = useAppController();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const [sortField, setSortField] = useState<keyof Comment | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  if (!state.comments.length) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(state.comments.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (field: keyof Comment) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedComments = [...state.comments].sort((a: Comment, b: Comment) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredComments = sortedComments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.id.toString().includes(searchQuery) ||
      comment.postId.toString().includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComments = filteredComments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative inline-block text-left">
          <button
            className="mr-2 p-2 bg-gray-200 rounded text-xs"
            onClick={() => handleSort("postId")}
          >
            Sort Post ID
          </button>
          <button
            className="mr-2 p-2 bg-gray-200 rounded text-xs"
            onClick={() => handleSort("name")}
          >
            Sort Name
          </button>
          <button
            className="p-2 bg-gray-200 rounded text-xs"
            onClick={() => handleSort("email")}
          >
            Sort Email
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name, email, comment, ID"
          className="p-2 border rounded text-xs w-96"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-1 px-2 border-b">Post ID</th>
              <th className="py-1 px-2 border-b">Name</th>
              <th className="py-1 px-2 border-b">Email</th>
              <th className="py-1 px-2 border-b">Comment</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map((comment) => (
              <tr key={comment.id} className="h-12">
                <td className="py-1 px-2 border-b">{comment.postId}</td>
                <td className="py-1 px-2 border-b">
                  {truncateText(comment.name, 5)}
                </td>
                <td className="py-1 px-2 border-b">
                  {truncateText(comment.email, 5)}
                </td>
                <td className="py-1 px-2 border-b">
                  {truncateText(comment.body, 5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center text-xs">
        <button
          onClick={handlePreviousPage}
          className="p-2 bg-gray-200 rounded"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="p-2 bg-gray-200 rounded"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CommentsPage;
