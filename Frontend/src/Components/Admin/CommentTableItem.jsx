import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../../Context/AppContext";

const CommentTableItem = ({ comment, fetchData }) => {
  const { axios, token } = useAppContext(); // ✅ use token and axios from context

  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const commentDate = new Date(createdAt);

  // ✅ Approve comment
  const handleApprove = async () => {
    try {
      const { data } = await axios.post(
        "/api/admin/approve-comments",
        { id: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchData(); // Refresh comment list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Delete comment
  const handleDelete = async () => {
    try {
      const { data } = await axios.post(
        "/api/admin/delete-comments",
        { id: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchData(); // Refresh comment list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog:</b> {blog?.title || "Deleted Blog"}
        <br />
        <b className="font-medium text-gray-600">Name:</b> {name}
        <br />
        <b className="font-medium text-gray-600">Comment:</b> {content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">{commentDate.toLocaleDateString()}</td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="approve"
              onClick={handleApprove}
            />
          ) : (
            <p className="text-sm border border-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            alt="delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
