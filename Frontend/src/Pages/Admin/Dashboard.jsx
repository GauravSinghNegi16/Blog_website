import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItems from "../../Components/Admin/BlogTableItems";
import toast from "react-hot-toast";
import { useAppContext } from "../../../Context/AppContext";

const Dashboard = () => {
  const { axios, token } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  // ✅ Fetch Dashboard Data
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDashboardData({
          blogs: data.DashboardData.blogs ?? 0,
          comments: data.DashboardData.comments ?? 0,
          drafts: data.DashboardData.draft ?? 0,
          recentBlogs: data.DashboardData.recentBlogs ?? [],
        });
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  return (
    <div className="flex-1 p-4 md:p-10">
      {/* === Top Cards === */}
      <div className="flex flex-wrap gap-4">
        {/* Blogs Count */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="Blogs" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Comments Count */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="Comments" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* Drafts Count */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="Drafts" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* === Latest Blogs Table === */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">S.no</th>
                <th scope="col" className="px-2 py-4">Blog Title</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItems
                    key={blog._id}
                    blog={blog}
                    fetchData={fetchData}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
