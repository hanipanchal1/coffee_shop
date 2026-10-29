import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Footer from "../componets/Footer";
import axios from "axios";
import { toast } from "../utils/toast";
import footerBg from "../assets/img/footerbg.png";

const BDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Comment, setcomment] = useState("");
  const [Name, setname] = useState("");
  const [Email, setemail] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetchComments();
    if (id) {
      fetchBlogDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchBlogDetails() {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:1000/blog/readbyIdblog/${id}`);
      setBlogData(res.data.blog);
    } catch (err) {
      console.error("Error fetching blog details:", err);
      toast.error("Failed to load blog details.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchComments() {
    try {
      const res = await axios.get("http://localhost:1000/comment/read");
      setCommentsList(res.data.readComment || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  }

  async function commentf(e) {
    e.preventDefault();
    if (!Comment || !Name || !Email) {
      toast.warning("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:1000/comment/create", {
        comments: Comment,
        name: Name,
        email: Email,
      });
      toast.success(res.data.msg || "Comment posted successfully!");
      setcomment("");
      setname("");
      setemail("");
      fetchComments();
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to post comment.";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] bg-cover bg-center flex flex-col justify-center items-center gap-2 sm:gap-3 px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 29, 40, 0.55), rgba(16, 29, 40, 0.90)), url(${footerBg})`,
        }}
      >
        <h1 className="text-[#c5a572] text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-center">
          Blogs Details
        </h1>
        <p className="text-[#b9b8b8] text-sm sm:text-base text-center">
          <Link to="/" className="hover:underline">Home</Link> /{" "}
          <Link to="/blog" className="hover:underline">Blogs</Link> / Blog Details
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 lg:mt-20 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* ========== LEFT / MAIN COLUMN ========== */}
          <div className="flex-1 w-full min-w-0">
            {loading ? (
              <div className="w-full py-16 sm:py-20 text-center text-lg sm:text-xl text-[#c5a572] animate-pulse">
                Loading blog details...
              </div>
            ) : !blogData ? (
              <div className="w-full py-16 sm:py-20 text-center">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#121D27]">
                  Blog not found
                </h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  The blog you are looking for does not exist or has been removed.
                </p>
                <Link
                  to="/blog"
                  className="inline-block mt-4 text-[#c5a572] underline font-medium"
                >
                  ← Back to Blogs
                </Link>
              </div>
            ) : (
              <>
                {/* Blog Image */}
                {blogData.image && (
                  <img
                    className="w-full h-56 sm:h-72 md:h-80 lg:h-[60vh] object-cover rounded"
                    src={
                      blogData.image.startsWith("http")
                        ? blogData.image
                        : `http://localhost:1000/uploads/${blogData.image}`
                    }
                    alt={blogData.title}
                  />
                )}

                {/* Blog Details */}
                <div className="flex flex-col gap-4 sm:gap-5 mt-6 sm:mt-8 lg:mt-10">
                  <h1 className="font-sans text-[#c5a572] text-base sm:text-[18px]">
                    {new Date(blogData.date || blogData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </h1>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121D27] leading-tight">
                    {blogData.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg md:text-[20px] text-gray-700 whitespace-pre-line leading-relaxed">
                    {blogData.description}
                  </p>
                </div>

                {/* Author Card */}
                {blogData.userId && (
                  <div className="border border-[#c5a572] mt-10 sm:mt-12 lg:mt-15 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 flex flex-col sm:flex-row gap-5 sm:gap-7 items-start sm:items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#121D27] text-[#c5a572] flex items-center justify-center text-xl sm:text-2xl font-serif font-bold shrink-0">
                      {blogData.userId.name?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl sm:text-2xl font-serif font-semibold text-[#121D27]">
                        {blogData.userId.name}
                      </h1>
                      <p className="text-[#646464] text-sm sm:text-[16px] break-all">
                        {blogData.userId.email}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-[#c5a572] font-semibold">
                        {blogData.userId.role || "Author"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Comments List */}
            <div className="mt-12 sm:mt-16 flex flex-col gap-4 sm:gap-5">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6">
                {commentsList.length > 0
                  ? `${commentsList.length} Comment${commentsList.length > 1 ? "s" : ""}`
                  : "0 Comments"}
              </p>

              {commentsList.length > 0 ? (
                commentsList.map((c, index) => (
                  <div
                    key={c._id || index}
                    className="bg-[#faf7f2] px-5 sm:px-8 lg:px-10 flex flex-col gap-2 py-4 sm:py-5 rounded"
                  >
                    <h1 className="text-xl sm:text-2xl font-serif font-semibold">
                      {c.name}
                    </h1>
                    <h2 className="text-[#646464] text-xs sm:text-[14px]">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "Recent"}
                    </h2>
                    <p className="text-[#646464] text-base sm:text-[18px] leading-relaxed">
                      {c.comments}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-serif text-xl sm:text-2xl text-[#121D27]">
                  No comments yet. Be the first to reply!
                </p>
              )}
            </div>

            {/* Leave a Reply Form */}
            <div className="mt-14 sm:mt-20">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-semibold">
                  Leave a Reply
                </h1>
                <p className="text-[#646464] text-sm sm:text-[16px] mt-1">
                  Your email address will not be published.
                </p>
              </div>

              <div className="py-6 sm:py-8">
                <form onSubmit={commentf} className="space-y-5">
                  <input
                    type="text"
                    className="w-full text-base sm:text-lg py-3 border-b border-[#c7c4c4] outline-none bg-transparent"
                    placeholder="Comments*"
                    value={Comment}
                    onChange={(e) => setcomment(e.target.value)}
                  />

                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                    <input
                      type="text"
                      className="w-full sm:w-1/2 text-base sm:text-lg py-3 border-b border-[#c7c4c4] outline-none bg-transparent"
                      placeholder="Name*"
                      value={Name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <input
                      type="email"
                      className="w-full sm:w-1/2 text-base sm:text-lg py-3 border-b border-[#c7c4c4] outline-none bg-transparent"
                      placeholder="E-mail*"
                      value={Email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto border text-base sm:text-lg px-6 sm:px-8 py-3 mt-2 border-[#121D27] bg-[#121D27] text-white hover:bg-white hover:text-[#121D27] transition-all duration-300 cursor-pointer"
                  >
                    Post Comments
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ========== RIGHT SIDEBAR ========== */}
          <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 lg:gap-8">
            {/* Search */}
            <div>
              <p className="text-lg sm:text-xl font-bold mb-2">Search</p>
              <div className="flex border-2 border-[#a7a4a4] p-2.5 sm:p-3 justify-between items-center rounded">
                <input
                  type="text"
                  placeholder="Search here...."
                  className="outline-none w-full text-sm bg-transparent"
                />
                <IoSearchOutline className="text-gray-500 text-lg shrink-0 ml-2" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="text-lg sm:text-xl font-bold mb-2">Categories</p>
              <div className="flex flex-col">
                {[
                  "American Food",
                  "Asian Food",
                  "Mexican Food",
                  "Birthday Events",
                  "Wedding Events",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="border-b border-[#9ca0a4] px-2 sm:px-3 py-3 text-[15px] sm:text-[17px] text-gray-700 hover:text-[#c5a572] cursor-pointer transition-colors"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            {/* Share Blog */}
            <div>
              <p className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Share Blog</p>
              <div className="flex gap-5 text-xl sm:text-2xl text-[#121D27]">
                <FaFacebookF className="cursor-pointer hover:text-[#c5a572] transition-colors" />
                <FaInstagram className="cursor-pointer hover:text-[#c5a572] transition-colors" />
                <FaLinkedinIn className="cursor-pointer hover:text-[#c5a572] transition-colors" />
                <FaTwitter className="cursor-pointer hover:text-[#c5a572] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BDetails;