import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast";
import {
  MdOutlineDashboard,
  MdBookmarkAdded,
  MdLogout,
  MdRefresh,
  MdDeleteOutline,
  MdClose,
  MdAdd,
  MdEdit,
  MdMenu,
} from "react-icons/md";
import {
  FaRegUser,
  FaRegComment,
  FaUsers,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { AiOutlineUserAdd } from "react-icons/ai";
import { PiExport } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import DeleteConfirmModal from "../componets/DeleteConfirmModal";

// ─────────────────────────────────────────────────────────────
//  Admin Page – Only accessible to users with role='admin'
// ─────────────────────────────────────────────────────────────

const Admin = () => {
  const { user, token, logout, updateUser: updateAuthUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalComments: 0,
    totalMenu: 0,
    totalBlog: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [settingForm, setSettingForm] = useState({
    name: "",
    role: "admin",
  });
  const [settingLoading, setSettingLoading] = useState(false);

  // Sync settingForm with currently logged-in user
  useEffect(() => {
    if (user) {
      setSettingForm({
        name: user.name || "",
        role: user.role || "admin",
      });
    }
  }, [user, isSettingModalOpen]);

  // Scroll to top whenever tab changes in Admin dashboard
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [activeTab]);

  // Tab-specific detailed lists
  const [usersList, setUsersList] = useState([]);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    name: "",
    role: "user",
  });
  const [editUserLoading, setEditUserLoading] = useState(false);

  // ── Unified Custom Delete Confirmation Modal State ──
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: null, // "user" | "menu" | "blog" | "booking" | "comment"
    id: null,
    title: "Confirm Deletion",
    message: "Are you sure you want to delete this item?",
    itemName: "",
    loading: false,
  });

  function confirmDelete(type, id, itemName, title, message) {
    setDeleteModal({
      isOpen: true,
      type,
      id,
      itemName: itemName || "",
      title: title || "Confirm Deletion",
      message:
        message ||
        "Are you sure you want to delete this item? This action cannot be undone.",
      loading: false,
    });
  }

  async function handleExecuteDelete() {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));
    try {
      if (type === "user") {
        await axios.delete(`http://localhost:1000/admin/users/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        toast.success("User deleted successfully!");
        fetchTabData("users");
        fetchDashboardStats();
      } else if (type === "menu") {
        await axios.delete(`http://localhost:1000/menu/delete/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        toast.success("Menu item deleted successfully!");
        fetchTabData("menu");
        fetchDashboardStats();
      } else if (type === "blog") {
        await axios.delete(`http://localhost:1000/blog/delete/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        toast.success("Blog post deleted successfully!");
        fetchTabData("blog");
        fetchDashboardStats();
      } else if (type === "booking") {
        await axios.delete(`http://localhost:1000/booking/delete/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        toast.success("Booking deleted successfully!");
        fetchTabData("bookings");
        fetchDashboardStats();
      } else if (type === "comment") {
        await axios.delete(`http://localhost:1000/comment/delete/${id}`, {
          withCredentials: true,
        });
        toast.success("Comment deleted successfully!");
        fetchTabData("comments");
        fetchDashboardStats();
      }

      setDeleteModal({
        isOpen: false,
        type: null,
        id: null,
        title: "",
        message: "",
        itemName: "",
        loading: false,
      });
    } catch (err) {
      toast.error(
        "Failed to delete: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  }
  const [bookingsList, setBookingsList] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [menuFilter, setMenuFilter] = useState("All");

  // Blog Tab States
  const [blogList, setBlogList] = useState([]);

  // Real-time Search States across tabs
  const [usersSearch, setUsersSearch] = useState("");
  const [bookingsSearch, setBookingsSearch] = useState("");
  const [commentsSearch, setCommentsSearch] = useState("");
  const [menuSearch, setMenuSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");

  // ── High-Level Modal States ──
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [userLoading, setUserLoading] = useState(false);

  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "07:00 PM",
    seats: 2,
    notes: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  // Menu Modal State (Create & Edit)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: "",
    category: "Coffee",
    price: "",
    description: "",
    imageFile: null,
    imagePreview: "",
  });
  const [menuLoading, setMenuLoading] = useState(false);

  // Blog Modal State (Create & Edit)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogItem, setEditingBlogItem] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    imageFile: null,
    imagePreview: "",
  });
  const [blogLoading, setBlogLoading] = useState(false);

  // ── Universal XML Export Engine ──
  function escapeXml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function exportToXML(
    data,
    filename,
    rootTag = "Records",
    itemTag = "Record",
  ) {
    if (!data || !data.length) {
      toast.warning("No data available to export.");
      return;
    }
    const headers = Object.keys(data[0]);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n`;

    for (const row of data) {
      xml += `  <${itemTag}>\n`;
      for (const header of headers) {
        // Convert header to a valid XML tag name (no spaces/special chars)
        const tag = header.replace(/[^a-zA-Z0-9_]/g, "_");
        const val = row[header] ?? "";
        xml += `    <${tag}>${escapeXml(val)}</${tag}>\n`;
      }
      xml += `  </${itemTag}>\n`;
    }
    xml += `</${rootTag}>`;

    const blob = new Blob([xml], {
      type: "application/xml;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportUsers() {
    if (!usersList.length) return toast.warning("No users to export.");
    const data = usersList.map((u) => ({
      "User ID": u._id,
      Name: u.name || "Anonymous",
      Email: u.email,
      Role: u.role || "user",
      "Registered Date": u.createdAt
        ? new Date(u.createdAt).toLocaleDateString()
        : "N/A",
    }));
    exportToXML(data, "users_list", "Users", "User");
  }

  function exportBookings() {
    if (!bookingsList.length)
      return toast.warning("No table bookings to export.");
    const data = bookingsList.map((b) => ({
      "Booking ID": b._id,
      "Customer Name": b.name,
      Email: b.email,
      Phone: b.phone,
      Date: b.date ? new Date(b.date).toLocaleDateString() : "N/A",
      Time: b.time,
      Seats: b.seats,
      Notes: b.notes || "",
      "Created At": b.createdAt
        ? new Date(b.createdAt).toLocaleDateString()
        : "N/A",
    }));
    exportToXML(data, "table_bookings", "Bookings", "Booking");
  }

  function exportComments() {
    if (!commentsList.length) return toast.warning("No comments to export.");
    const data = commentsList.map((c) => ({
      "Comment ID": c._id,
      "Customer Name": c.name,
      Email: c.email,
      Comment: c.comments,
      Date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A",
    }));
    exportToXML(data, "customer_comments", "Comments", "Comment");
  }

  function exportMenu() {
    if (!menuList.length) return toast.warning("No menu items to export.");
    const data = menuList.map((m) => ({
      "Item ID": m._id,
      Name: m.name,
      Category: m.category,
      Price: `$${Number(m.price).toFixed(2)}`,
      Description: m.description,
      Image: m.image ? `http://localhost:1000/uploads/${m.image}` : "No image",
      "Created Date": m.createdAt
        ? new Date(m.createdAt).toLocaleDateString()
        : "N/A",
    }));
    exportToXML(data, "menu_items", "MenuItems", "MenuItem");
  }

  function exportBlog() {
    if (!blogList.length) return toast.warning("No blog posts to export.");
    const data = blogList.map((b) => ({
      "Blog ID": b._id,
      Title: b.title,
      Date: b.date ? new Date(b.date).toLocaleDateString() : "N/A",
      Author: b.userId?.name || "Admin",
      Description: b.description,
      Image: b.image ? `http://localhost:1000/uploads/${b.image}` : "No image",
      "Created Date": b.createdAt
        ? new Date(b.createdAt).toLocaleDateString()
        : "N/A",
    }));
    exportToXML(data, "blog_posts", "BlogPosts", "BlogPost");
  }

  // ── High-Level Action Handlers ──
  async function handleAddUser(e) {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.warning("Please fill in all user details.");
      return;
    }
    setUserLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:1000/auth/register",
        newUser,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        },
      );
      toast.success(res.data?.msg || "User registered successfully!");
      setNewUser({ name: "", email: "", password: "", role: "user" });
      setIsAddUserOpen(false);
      fetchTabData("users");
      fetchDashboardStats();
    } catch (err) {
      toast.error(
        "Failed to add user: " +
          (err.response?.data?.message ||
            err.response?.data?.msg ||
            err.message),
      );
    } finally {
      setUserLoading(false);
    }
  }

  async function handleAddBooking(e) {
    e.preventDefault();
    if (
      !newBooking.name ||
      !newBooking.email ||
      !newBooking.phone ||
      !newBooking.date ||
      !newBooking.time ||
      !newBooking.seats ||
      !newBooking.notes
    ) {
      toast.warning("Please fill in all booking fields.");
      return;
    }
    setBookingLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:1000/booking/create",
        newBooking,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        },
      );
      toast.success(res.data?.msg || "Table booking created successfully!");
      setNewBooking({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "07:00 PM",
        seats: 2,
        notes: "",
      });
      setIsAddBookingOpen(false);
      fetchTabData("bookings");
      fetchDashboardStats();
    } catch (err) {
      toast.error(
        "Failed to create booking: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setBookingLoading(false);
    }
  }

  function handleDeleteUser(userOrId, name = "") {
    const id = typeof userOrId === "object" ? userOrId?._id : userOrId;
    const displayName =
      typeof userOrId === "object"
        ? userOrId?.name || userOrId?.email || ""
        : name;
    confirmDelete(
      "user",
      id,
      displayName,
      "Delete User",
      "Are you sure you want to delete this user? Their account and access will be permanently removed.",
    );
  }

  // ── Settings / Admin Profile Update Handler (Name & Role only) ──
  async function handleUpdateSettings(e) {
    e.preventDefault();
    if (!settingForm.name.trim()) {
      toast.warning("Name cannot be empty.");
      return;
    }

    setSettingLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:1000/admin/settings",
        {
          name: settingForm.name.trim(),
          role: settingForm.role,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        },
      );

      toast.success(res.data?.msg || "Settings updated successfully!");

      if (res.data?.user) {
        updateAuthUser(res.data.user, res.data.token);
      }

      if (settingForm.role !== "admin") {
        toast.info("Role updated to User. Redirecting to home...");
        setIsSettingModalOpen(false);
        navigate("/");
        return;
      }

      setIsSettingModalOpen(false);
      fetchTabData("users");
    } catch (err) {
      toast.error(
        "Failed to update settings: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setSettingLoading(false);
    }
  }

  // ── Edit Specific User (Name & Role only) ──
  function handleOpenEditUser(u) {
    setEditingUser(u);
    setEditUserForm({
      name: u.name || "",
      role: u.role || "user",
    });
    setIsEditUserOpen(true);
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    if (!editUserForm.name.trim()) {
      toast.warning("Name cannot be empty.");
      return;
    }
    if (!editingUser) return;

    setEditUserLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:1000/admin/users/${editingUser._id}`,
        {
          name: editUserForm.name.trim(),
          role: editUserForm.role,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        },
      );

      toast.success(res.data?.msg || "User updated successfully!");

      const currentUserId = user?.id || user?._id;
      if (
        currentUserId &&
        currentUserId.toString() === editingUser._id.toString()
      ) {
        if (res.data?.token) {
          updateAuthUser(res.data.user, res.data.token);
        } else {
          updateAuthUser(res.data.user);
        }
        if (editUserForm.role !== "admin") {
          setIsEditUserOpen(false);
          navigate("/");
          return;
        }
      }

      setIsEditUserOpen(false);
      setEditingUser(null);
      fetchTabData("users");
    } catch (err) {
      toast.error(
        "Failed to update user: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setEditUserLoading(false);
    }
  }

  // ── Menu Modal & CRUD Handlers ──
  function openAddMenuModal() {
    setEditingMenuItem(null);
    setMenuForm({
      name: "",
      category: "Coffee",
      price: "",
      description: "",
      imageFile: null,
      imagePreview: "",
    });
    setIsMenuModalOpen(true);
  }

  function openEditMenuModal(item) {
    setEditingMenuItem(item);
    setMenuForm({
      name: item.name || "",
      category: item.category || "Coffee",
      price: item.price || "",
      description: item.description || "",
      imageFile: null,
      imagePreview: item.image
        ? `http://localhost:1000/uploads/${item.image}`
        : "",
    });
    setIsMenuModalOpen(true);
  }

  async function handleSaveMenu(e) {
    e.preventDefault();
    if (
      !menuForm.name ||
      !menuForm.category ||
      !menuForm.price ||
      !menuForm.description
    ) {
      toast.warning("Please fill in Name, Category, Price, and Description.");
      return;
    }
    setMenuLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", menuForm.name);
      formData.append("category", menuForm.category);
      formData.append("price", menuForm.price);
      formData.append("description", menuForm.description);
      if (menuForm.imageFile) {
        formData.append("image", menuForm.imageFile);
      }

      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      };

      if (editingMenuItem) {
        // UPDATE (PUT)
        await axios.put(
          `http://localhost:1000/menu/update/${editingMenuItem._id}`,
          formData,
          config,
        );
        toast.success("Menu item updated successfully!");
      } else {
        // CREATE (POST)
        await axios.post("http://localhost:1000/menu/create", formData, config);
        toast.success("Menu item created successfully!");
      }

      setIsMenuModalOpen(false);
      fetchTabData("menu");
      fetchDashboardStats();
    } catch (err) {
      toast.error(
        "Failed to save menu item: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setMenuLoading(false);
    }
  }

  function handleDeleteMenu(itemOrId, name = "") {
    const id = typeof itemOrId === "object" ? itemOrId?._id : itemOrId;
    const displayName =
      typeof itemOrId === "object"
        ? `${itemOrId?.name || "Menu item"}${itemOrId?.price ? ` ($${itemOrId.price})` : ""}`
        : name;
    confirmDelete(
      "menu",
      id,
      displayName,
      "Delete Menu Item",
      "Are you sure you want to delete this dish? It will be permanently removed from the menu.",
    );
  }

  // ── Blog Modal & CRUD Handlers ──
  function openAddBlogModal() {
    setEditingBlogItem(null);
    setBlogForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      imageFile: null,
      imagePreview: "",
    });
    setIsBlogModalOpen(true);
  }

  function openEditBlogModal(item) {
    setEditingBlogItem(item);
    setBlogForm({
      title: item.title || "",
      date: item.date
        ? new Date(item.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      description: item.description || "",
      imageFile: null,
      imagePreview: item.image
        ? `http://localhost:1000/uploads/${item.image}`
        : "",
    });
    setIsBlogModalOpen(true);
  }

  async function handleSaveBlog(e) {
    e.preventDefault();
    if (!blogForm.title || !blogForm.description) {
      toast.warning("Please fill in Title and Description.");
      return;
    }
    setBlogLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", blogForm.title);
      formData.append("date", blogForm.date);
      formData.append("description", blogForm.description);
      if (blogForm.imageFile) {
        formData.append("image", blogForm.imageFile);
      }

      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      };

      if (editingBlogItem) {
        await axios.put(
          `http://localhost:1000/blog/update/${editingBlogItem._id}`,
          formData,
          config,
        );
        toast.success("Blog post updated successfully!");
      } else {
        await axios.post("http://localhost:1000/blog/create", formData, config);
        toast.success("Blog post published successfully!");
      }

      setIsBlogModalOpen(false);
      fetchTabData("blog");
      fetchDashboardStats();
    } catch (err) {
      toast.error(
        "Failed to save blog: " +
          (err.response?.data?.msg ||
            err.response?.data?.message ||
            err.message),
      );
    } finally {
      setBlogLoading(false);
    }
  }

  function handleDeleteBlog(blogOrId, title = "") {
    const id = typeof blogOrId === "object" ? blogOrId?._id : blogOrId;
    const displayName =
      typeof blogOrId === "object" ? blogOrId?.title || "" : title;
    confirmDelete(
      "blog",
      id,
      displayName,
      "Delete Blog Post",
      "Are you sure you want to delete this blog post? This action cannot be undone.",
    );
  }

  // Fetch Dashboard Stats
  async function fetchDashboardStats() {
    setLoading(true);
    try {
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      };

      // Try dedicated admin stats endpoint first
      try {
        const res = await axios.get(
          "http://localhost:1000/admin/stats",
          config,
        );
        if (res.data?.stats) {
          setStats(res.data.stats);
          setRecentBookings(res.data.recentBookings || []);
          setRecentComments(res.data.recentComments || []);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Dedicated stats endpoint fallback:", err.message);
      }

      // Fallback: Fetch directly from existing routes in parallel
      const [bookRes, commRes, menuRes, blogRes] = await Promise.all([
        axios
          .get("http://localhost:1000/booking/read", config)
          .catch(() => ({ data: { readBooking: [] } })),
        axios
          .get("http://localhost:1000/comment/read", config)
          .catch(() => ({ data: { readComment: [] } })),
        axios
          .get("http://localhost:1000/menu/read", config)
          .catch(() => ({ data: { readMenu: [] } })),
        axios
          .get("http://localhost:1000/blog/read", config)
          .catch(() => ({ data: { readBlog: [] } })),
      ]);

      const bookings = bookRes.data.readBooking || [];
      const comments = commRes.data.readComment || [];
      const menus = menuRes.data.readMenu || menuRes.data.menuItems || [];
      const blogs = blogRes.data.readBlog || blogRes.data.blogs || [];

      setStats({
        totalUsers: 0,
        totalBookings: bookings.length,
        totalComments: comments.length,
        totalMenu: menus.length,
        totalBlog: blogs.length,
      });
      setRecentBookings(bookings.slice(0, 5));
      setRecentComments(comments.slice(0, 5));
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fetch Tab Specific Data on Tab Switch
  async function fetchTabData(tab) {
    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    };
    try {
      if (tab === "users") {
        const res = await axios.get(
          "http://localhost:1000/admin/users",
          config,
        );
        setUsersList(res.data.users || []);
      } else if (tab === "bookings") {
        const res = await axios.get(
          "http://localhost:1000/booking/read",
          config,
        );
        setBookingsList(res.data.readBooking || []);
      } else if (tab === "comments") {
        const res = await axios.get(
          "http://localhost:1000/comment/read",
          config,
        );
        setCommentsList(res.data.readComment || []);
      } else if (tab === "menu") {
        const res = await axios.get("http://localhost:1000/menu/read", config);
        setMenuList(res.data.readMenu || res.data.menuItems || []);
      } else if (tab === "blog") {
        const res = await axios.get("http://localhost:1000/blog/read", config);
        setBlogList(res.data.blogs || res.data.readBlog || []);
      }
    } catch (err) {
      console.error(`Error loading ${tab} data:`, err);
    }
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (activeTab !== "dashboard") {
      fetchTabData(activeTab);
    }
  }, [activeTab]);

  // Delete Handlers
  function handleDeleteBooking(bookingOrId, name = "") {
    const id = typeof bookingOrId === "object" ? bookingOrId?._id : bookingOrId;
    const displayName =
      typeof bookingOrId === "object"
        ? `${bookingOrId?.name || "Booking"}${bookingOrId?.date ? ` (${new Date(bookingOrId.date).toLocaleDateString()} - ${bookingOrId.time || ""})` : ""}`
        : name;
    confirmDelete(
      "booking",
      id,
      displayName,
      "Delete Booking",
      "Are you sure you want to cancel and delete this table reservation?",
    );
  }

  function handleDeleteComment(commentOrId, name = "") {
    const id = typeof commentOrId === "object" ? commentOrId?._id : commentOrId;
    const displayName =
      typeof commentOrId === "object"
        ? `"${commentOrId?.comments || commentOrId?.comment || "Feedback"}" by ${commentOrId?.name || "Customer"}`
        : name;
    confirmDelete(
      "comment",
      id,
      displayName,
      "Delete Comment",
      "Are you sure you want to delete this customer feedback comment?",
    );
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const navTabs = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      shortLabel: "Overview",
      icon: MdOutlineDashboard,
      count: null,
    },
    {
      id: "users",
      label: "Users",
      shortLabel: "Users",
      icon: FaRegUser,
      count: stats.totalUsers,
    },
    {
      id: "bookings",
      label: "Table Bookings",
      shortLabel: "Bookings",
      icon: MdBookmarkAdded,
      count: stats.totalBookings,
    },
    {
      id: "comments",
      label: "Comments",
      shortLabel: "Comments",
      icon: FaRegComment,
      count: stats.totalComments,
    },
    {
      id: "menu",
      label: "Menu Items",
      shortLabel: "Menu",
      icon: BiFoodMenu,
      count: stats.totalMenu,
    },
    {
      id: "blog",
      label: "Blogs",
      shortLabel: "Blogs",
      icon: GrBlog,
      count: stats.totalBlog,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans">
      {/* Top Banner Header */}
      <div className="w-full bg-[#121d27] border-b border-[#22313f] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 shadow-lg">
        {/* Left: Hamburger (mobile/tablet), Logo Icon & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#1a2836] text-[#c5a572] border border-[#c5a572]/30 hover:text-white transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <MdMenu className="text-xl" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl text-[#c5a572] font-serif font-semibold tracking-wide truncate">
              Admin Dashboard
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">
              Coffee House Control Center
            </p>
          </div>
        </div>

        {/* Right: Actions, User Info, Logout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
          <button
            onClick={() => setIsSettingModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#c5a572] hover:text-white bg-[#1a2836] border border-[#c5a572]/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition cursor-pointer"
            title="Settings"
          >
            <IoSettingsOutline /> <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={() => fetchTabData(activeTab)}
            title="Refresh Data"
            className="flex items-center gap-1.5 text-xs text-[#c5a572] hover:text-white bg-[#1a2836] border border-[#c5a572]/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <MdRefresh className="text-base" /> <span className="hidden sm:inline">Refresh</span>
          </button>
          <div className="text-right hidden md:block">
            <p className="text-sm text-white font-medium max-w-[140px] truncate">
              {user?.name || "Administrator"}
            </p>
            <p className="text-xs text-[#c5a572] uppercase tracking-wider">
              {user?.role || "admin"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-red-500/15 text-red-400 border border-red-500/30 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer"
            title="Logout"
          >
            <MdLogout className="text-base" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Quick Horizontal Scrollable Tabs (< lg only) */}
      <div className="lg:hidden bg-[#16222d] border-b border-[#22313f] px-3 py-2 flex items-center gap-2 overflow-x-auto overflow-y-hidden scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition cursor-pointer ${
                isActive
                  ? "bg-[#c5a572] text-[#121d27] font-semibold shadow-xs"
                  : "bg-[#1f2e3d] text-gray-300 hover:text-white hover:bg-[#273a4d]"
              }`}
            >
              <Icon className="text-sm" />
              <span>{tab.shortLabel}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                    isActive
                      ? "bg-[#121d27] text-[#c5a572]"
                      : "bg-black/40 text-gray-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer (Left Slide-In) */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#F4EEE4] z-50 flex flex-col justify-between py-6 px-4 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-3 mb-2 pb-2 border-b border-[#e3d7c5]">
            <span className="text-xs font-bold text-[#8a7a6c] uppercase tracking-wider">
              Menu Navigation
            </span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 text-gray-500 hover:text-black rounded-lg hover:bg-[#e7dcce] transition cursor-pointer"
              title="Close menu"
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-[#121d27] text-[#c5a572] shadow-md font-semibold"
                    : "text-[#443831] hover:bg-[#e7dcce] hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-lg" /> {tab.label}
                </div>
                {tab.count !== null && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-700 font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-3 rounded-xl bg-white/50 border border-[#e3d7c5] text-center text-xs text-[#705e4f]">
          Logged in as{" "}
          <strong className="text-[#121d27] block truncate mt-0.5">
            {user?.email}
          </strong>
        </div>
      </aside>

      {/* Main Layout: Left Sidebar (Desktop) + Right Content Area */}
      <div className="flex flex-1 min-w-0">
        {/* Desktop Sidebar (unchanged PC view!) */}
        <aside className="hidden lg:flex w-64 bg-[#F4EEE4] border-r border-[#e3d7c5] flex-col justify-between py-6 px-4 shadow-inner shrink-0">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#8a7a6c] uppercase tracking-wider px-3 mb-1">
              Menu Navigation
            </span>

            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#121d27] text-[#c5a572] shadow-md font-semibold"
                      : "text-[#443831] hover:bg-[#e7dcce] hover:text-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-lg" /> {tab.label}
                  </div>
                  {tab.count !== null && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-700 font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-3 rounded-xl bg-white/50 border border-[#e3d7c5] text-center text-xs text-[#705e4f]">
            Logged in as{" "}
            <strong className="text-[#121d27]">{user?.email}</strong>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* ══════════════════════════════════════════════════════
              TAB 1: DASHBOARD (TOTAL STATS ON ONE PAGE)
             ══════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <div>
              {/* Header Title */}
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-serif text-[#121d27] font-bold">
                    System Overview
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Live metrics for users, bookings, feedback, menu catalog,
                    and blogs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="text-xs font-semibold bg-[#121d27] text-[#c5a572] px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
                  >
                    Manage Menu
                  </button>
                  <button
                    onClick={() => setActiveTab("blog")}
                    className="text-xs font-semibold bg-[#c5a572] text-[#121d27] px-4 py-2 rounded-lg hover:bg-[#b59560] transition cursor-pointer"
                  >
                    Manage Blogs
                  </button>
                </div>
              </div>

              {/* 5 STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {/* 1. Total Users */}
                <div
                  onClick={() => setActiveTab("users")}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Users
                    </span>
                    <h3 className="text-3xl font-extrabold text-[#121d27] mt-1 group-hover:text-[#c5a572] transition">
                      {loading ? "..." : stats.totalUsers}
                    </h3>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                      Accounts
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-xl group-hover:scale-105 group-hover:bg-[#121d27] transition">
                    <FaUsers />
                  </div>
                </div>

                {/* 2. Total Table Bookings */}
                <div
                  onClick={() => setActiveTab("bookings")}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Bookings
                    </span>
                    <h3 className="text-3xl font-extrabold text-[#121d27] mt-1 group-hover:text-[#c5a572] transition">
                      {loading ? "..." : stats.totalBookings}
                    </h3>
                    <p className="text-[11px] text-[#c5a572] font-medium mt-0.5">
                      Reservations
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-xl group-hover:scale-105 group-hover:bg-[#121d27] transition">
                    <MdBookmarkAdded />
                  </div>
                </div>

                {/* 3. Total Comments */}
                <div
                  onClick={() => setActiveTab("comments")}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Comments
                    </span>
                    <h3 className="text-3xl font-extrabold text-[#121d27] mt-1 group-hover:text-[#c5a572] transition">
                      {loading ? "..." : stats.totalComments}
                    </h3>
                    <p className="text-[11px] text-blue-600 font-medium mt-0.5">
                      Feedback
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-xl group-hover:scale-105 group-hover:bg-[#121d27] transition">
                    <FaRegComment />
                  </div>
                </div>
              </div>

              {/* 2 PREVIEWS ON ONE PAGE: Recent Bookings & Comments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings Preview */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h4 className="font-serif font-bold text-lg text-[#121d27] flex items-center gap-2">
                      <MdBookmarkAdded className="text-[#c5a572]" /> Recent
                      Table Bookings
                    </h4>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs text-[#c5a572] hover:underline font-semibold cursor-pointer"
                    >
                      See All →
                    </button>
                  </div>

                  {recentBookings.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center">
                      No bookings found yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentBookings.map((b) => (
                        <div
                          key={b._id}
                          className="py-3 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-sm text-[#121d27]">
                              {b.name}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="text-[10px]" />
                                {b.date
                                  ? new Date(b.date).toLocaleDateString()
                                  : "N/A"}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock className="text-[10px]" /> {b.time}
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EEE4] text-[#121d27]">
                            {b.seats} Seats
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Comments Preview */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h4 className="font-serif font-bold text-lg text-[#121d27] flex items-center gap-2">
                      <FaRegComment className="text-[#c5a572]" /> Recent
                      Comments
                    </h4>
                    <button
                      onClick={() => setActiveTab("comments")}
                      className="text-xs text-[#c5a572] hover:underline font-semibold cursor-pointer"
                    >
                      See All →
                    </button>
                  </div>

                  {recentComments.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center">
                      No comments found yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentComments.map((c) => (
                        <div key={c._id} className="py-3">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm text-[#121d27]">
                              {c.name}
                            </p>
                            <span className="text-[11px] text-gray-400">
                              {c.createdAt
                                ? new Date(c.createdAt).toLocaleDateString()
                                : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 italic">
                            "{c.comments}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 2: USERS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === "users" && (
            <>
              <div className="text-[13px] flex items-center gap-2 bg-white text-[#121d27] px-3.5 py-2 rounded-xl transition font-medium shadow-xs mb-4 border border-[#e8dfd3]">
                <IoSearch className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={usersSearch}
                  onChange={(e) => setUsersSearch(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
                {usersSearch && (
                  <button
                    onClick={() => setUsersSearch("")}
                    className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#121d27]">
                      Registered Users
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manage all registered accounts
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportUsers}
                      className="text-xs flex items-center gap-1.5 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                      title="Export users to XML"
                    >
                      <PiExport className="text-[15px]" /> Export XML
                    </button>
                    <button
                      onClick={() => setIsAddUserOpen(true)}
                      className="text-xs flex items-center gap-1.5 bg-[#121d27] hover:bg-black text-[#c5a572] px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-sm"
                    >
                      <AiOutlineUserAdd className="text-[15px]" /> Add User
                    </button>
                    <button
                      onClick={() => fetchTabData("users")}
                      className="text-xs flex items-center gap-1 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                    >
                      <MdRefresh className="text-[15px]" /> Refresh
                    </button>
                  </div>
                </div>

                {(() => {
                  const filtered = usersList.filter(
                    (u) =>
                      !usersSearch ||
                      u.name
                        ?.toLowerCase()
                        .includes(usersSearch.toLowerCase()) ||
                      u.email
                        ?.toLowerCase()
                        .includes(usersSearch.toLowerCase()) ||
                      u.role?.toLowerCase().includes(usersSearch.toLowerCase()),
                  );

                  if (filtered.length === 0) {
                    return (
                      <p className="text-sm text-gray-400 py-8 text-center">
                        {usersSearch
                          ? `No users matching "${usersSearch}".`
                          : "No users found."}
                      </p>
                    );
                  }

                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Registered Date</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filtered.map((u) => (
                            <tr key={u._id} className="hover:bg-[#FAF7F2]/60">
                              <td className="py-3 px-4 font-semibold text-[#121d27]">
                                {u.name || "Anonymous"}
                              </td>
                              <td className="py-3 px-4">{u.email}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                    u.role === "admin"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {u.role || "user"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-gray-400">
                                {u.createdAt
                                  ? new Date(u.createdAt).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditUser(u)}
                                    className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition cursor-pointer"
                                    title="Edit user"
                                  >
                                    <MdEdit className="text-lg" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(u)}
                                    className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                                    title="Delete user"
                                  >
                                    <MdDeleteOutline className="text-lg" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 3: TABLE BOOKINGS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === "bookings" && (
            <>
              <div className="text-[13px] flex items-center gap-2 bg-white text-[#121d27] px-3.5 py-2 rounded-xl transition font-medium shadow-xs mb-4 border border-[#e8dfd3]">
                <IoSearch className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={bookingsSearch}
                  onChange={(e) => setBookingsSearch(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
                {bookingsSearch && (
                  <button
                    onClick={() => setBookingsSearch("")}
                    className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#121d27]">
                      Table Bookings
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manage all customer table reservations
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportBookings}
                      className="text-xs flex items-center gap-1.5 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                      title="Export bookings to XML"
                    >
                      <PiExport className="text-[15px]" /> Export XML
                    </button>
                    <button
                      onClick={() => setIsAddBookingOpen(true)}
                      className="text-xs flex items-center gap-1.5 bg-[#121d27] hover:bg-black text-[#c5a572] px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-sm"
                    >
                      <MdBookmarkAdded className="text-[15px]" /> Add Table
                      Booking
                    </button>
                    <button
                      onClick={() => fetchTabData("bookings")}
                      className="text-xs flex items-center gap-1 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                    >
                      <MdRefresh className="text-[15px]" /> Refresh
                    </button>
                  </div>
                </div>

                {(() => {
                  const filtered = bookingsList.filter(
                    (b) =>
                      !bookingsSearch ||
                      b.name
                        ?.toLowerCase()
                        .includes(bookingsSearch.toLowerCase()) ||
                      b.email
                        ?.toLowerCase()
                        .includes(bookingsSearch.toLowerCase()) ||
                      b.phone
                        ?.toLowerCase()
                        .includes(bookingsSearch.toLowerCase()) ||
                      b.notes
                        ?.toLowerCase()
                        .includes(bookingsSearch.toLowerCase()),
                  );

                  if (filtered.length === 0) {
                    return (
                      <p className="text-sm text-gray-400 py-8 text-center">
                        {bookingsSearch
                          ? `No bookings matching "${bookingsSearch}".`
                          : "No bookings found."}
                      </p>
                    );
                  }

                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Seats</th>
                            <th className="py-3 px-4">Notes</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filtered.map((b) => (
                            <tr key={b._id} className="hover:bg-[#FAF7F2]/60">
                              <td className="py-3 px-4">
                                <p className="font-semibold text-[#121d27]">
                                  {b.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {b.email}
                                </p>
                              </td>
                              <td className="py-3 px-4 font-mono text-xs">
                                {b.phone}
                              </td>
                              <td className="py-3 px-4 text-xs">
                                <p className="font-semibold">
                                  {b.date
                                    ? new Date(b.date).toLocaleDateString()
                                    : "N/A"}
                                </p>
                                <p className="text-gray-500">{b.time}</p>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F4EEE4] text-[#121d27]">
                                  {b.seats} Seats
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">
                                {b.notes}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleDeleteBooking(b)}
                                  className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                                  title="Delete booking"
                                >
                                  <MdDeleteOutline className="text-lg" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 4: COMMENTS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === "comments" && (
            <>
              <div className="text-[13px] flex items-center gap-2 bg-white text-[#121d27] px-3.5 py-2 rounded-xl transition font-medium shadow-xs mb-4 border border-[#e8dfd3]">
                <IoSearch className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={commentsSearch}
                  onChange={(e) => setCommentsSearch(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
                {commentsSearch && (
                  <button
                    onClick={() => setCommentsSearch("")}
                    className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#121d27]">
                      Customer Comments
                    </h3>
                    <p className="text-xs text-gray-500">
                      Reviews & comments posted by customers
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportComments}
                      className="text-xs flex items-center gap-1.5 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                      title="Export comments to XML"
                    >
                      <PiExport className="text-[15px]" /> Export XML
                    </button>
                    <button
                      onClick={() => fetchTabData("comments")}
                      className="text-xs flex items-center gap-1 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                    >
                      <MdRefresh className="text-[15px]" /> Refresh
                    </button>
                  </div>
                </div>

                {(() => {
                  const filtered = commentsList.filter(
                    (c) =>
                      !commentsSearch ||
                      c.name
                        ?.toLowerCase()
                        .includes(commentsSearch.toLowerCase()) ||
                      c.email
                        ?.toLowerCase()
                        .includes(commentsSearch.toLowerCase()) ||
                      c.comments
                        ?.toLowerCase()
                        .includes(commentsSearch.toLowerCase()),
                  );

                  if (filtered.length === 0) {
                    return (
                      <p className="text-sm text-gray-400 py-8 text-center">
                        {commentsSearch
                          ? `No comments matching "${commentsSearch}".`
                          : "No comments found."}
                      </p>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {filtered.map((c) => (
                        <div
                          key={c._id}
                          className="p-4 rounded-xl border border-gray-100 hover:border-[#c5a572]/50 bg-[#FAF7F2]/40 flex justify-between items-start"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-sm text-[#121d27]">
                                {c.name}
                              </h4>
                              <span className="text-xs text-gray-400">
                                {c.email}
                              </span>
                              <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">
                                {c.createdAt
                                  ? new Date(c.createdAt).toLocaleDateString()
                                  : ""}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2 font-serif italic">
                              "{c.comments}"
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteComment(c)}
                            className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition cursor-pointer"
                            title="Delete comment"
                          >
                            <MdDeleteOutline className="text-lg" />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 4: MENU ITEMS (MENU MANAGEMENT)
             ══════════════════════════════════════════════════════ */}
          {activeTab === "menu" && (
            <>
              <div className="text-[13px] flex items-center gap-2 bg-white text-[#121d27] px-3.5 py-2 rounded-xl transition font-medium shadow-xs mb-4 border border-[#e8dfd3]">
                <IoSearch className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
                {menuSearch && (
                  <button
                    onClick={() => setMenuSearch("")}
                    className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#121d27]">
                      Menu Management
                    </h3>
                    <p className="text-xs text-gray-500">
                      Manage coffee, snacks, food items, prices, and catalog
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportMenu}
                      className="text-xs flex items-center gap-1.5 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                      title="Export menu to XML"
                    >
                      <PiExport className="text-[15px]" /> Export XML
                    </button>
                    <button
                      onClick={openAddMenuModal}
                      className="text-xs flex items-center gap-1.5 bg-[#121d27] hover:bg-black text-[#c5a572] px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-sm"
                    >
                      <MdAdd className="text-[16px]" /> Add Menu Item
                    </button>
                    <button
                      onClick={() => fetchTabData("menu")}
                      className="text-xs flex items-center gap-1 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                    >
                      <MdRefresh className="text-[15px]" /> Refresh
                    </button>
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-gray-100 scrollbar-thin">
                  {[
                    "All",
                    "Coffee",
                    "Starters",
                    "BreakFast",
                    "Lunch",
                    "Dinner",
                    "Desserts",
                    "Mocktails",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setMenuFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        menuFilter === cat
                          ? "bg-[#121d27] text-[#c5a572] shadow-xs"
                          : "bg-[#FAF7F2] text-gray-600 hover:bg-[#F4EEE4]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Menu Items Table */}
                {(() => {
                  const filtered = menuList.filter((m) => {
                    const matchesCat =
                      menuFilter === "All" ||
                      m.category?.toLowerCase() === menuFilter.toLowerCase();
                    const matchesSearch =
                      !menuSearch ||
                      m.name
                        ?.toLowerCase()
                        .includes(menuSearch.toLowerCase()) ||
                      m.category
                        ?.toLowerCase()
                        .includes(menuSearch.toLowerCase()) ||
                      m.description
                        ?.toLowerCase()
                        .includes(menuSearch.toLowerCase());
                    return matchesCat && matchesSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 bg-[#FAF7F2]/40 rounded-xl border border-dashed border-[#e8dfd3]">
                        <BiFoodMenu className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium">
                          No menu items found{" "}
                          {menuSearch
                            ? `matching "${menuSearch}"`
                            : `in ${menuFilter === "All" ? "the catalog" : `"${menuFilter}"`}`}
                          .
                        </p>
                        <button
                          onClick={openAddMenuModal}
                          className="mt-3 text-xs font-semibold text-[#121d27] bg-[#c5a572] hover:bg-[#b59560] px-4 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          + Add First Item
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Description</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filtered.map((m) => (
                            <tr key={m._id} className="hover:bg-[#FAF7F2]/60">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {m.image ? (
                                    <img
                                      src={`http://localhost:1000/uploads/${m.image}`}
                                      alt={m.name}
                                      className="w-12 h-12 rounded-xl object-cover border border-[#e8dfd3] shadow-xs"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded-xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572]">
                                      <BiFoodMenu className="text-xl" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-semibold text-[#121d27]">
                                      {m.name}
                                    </p>
                                    <span className="text-[11px] text-gray-400">
                                      {m.createdAt
                                        ? new Date(
                                            m.createdAt,
                                          ).toLocaleDateString()
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#FAF7F2] border border-[#e8dfd3] text-[#705e4f]">
                                  {m.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-[#121d27]">
                                ${Number(m.price).toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">
                                {m.description}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openEditMenuModal(m)}
                                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                    title="Edit Item"
                                  >
                                    <MdEdit className="text-lg" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMenu(m)}
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                    title="Delete Item"
                                  >
                                    <MdDeleteOutline className="text-lg" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 5: BLOG MANAGEMENT (FULL HIGH-LEVEL CRUD)
             ══════════════════════════════════════════════════════ */}
          {activeTab === "blog" && (
            <>
              {/* Real-time Search Bar */}
              <div className="text-[13px] flex items-center gap-2 bg-white text-[#121d27] px-3.5 py-2 rounded-xl transition font-medium shadow-xs mb-4 border border-[#e8dfd3]">
                <IoSearch className="text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="outline-none w-full bg-transparent text-sm"
                />
                {blogSearch && (
                  <button
                    onClick={() => setBlogSearch("")}
                    className="text-xs text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e8dfd3] shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#121d27]">
                      Blog Management
                    </h3>
                    <p className="text-xs text-gray-500">
                      Create, update, organize, and publish coffee articles &
                      stories
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportBlog}
                      className="text-xs flex items-center gap-1.5 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                      title="Export blogs to XML"
                    >
                      <PiExport className="text-[15px]" /> Export XML
                    </button>
                    <button
                      onClick={openAddBlogModal}
                      className="text-xs flex items-center gap-1.5 bg-[#121d27] hover:bg-black text-[#c5a572] px-3.5 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-sm"
                    >
                      <MdAdd className="text-[16px]" /> Add Blog Post
                    </button>
                    <button
                      onClick={() => fetchTabData("blog")}
                      className="text-xs flex items-center gap-1 bg-[#F4EEE4] hover:bg-[#e7dcce] text-gray-700 px-3 py-1.5 rounded-lg transition font-medium cursor-pointer shadow-xs"
                    >
                      <MdRefresh className="text-[15px]" /> Refresh
                    </button>
                  </div>
                </div>

                {/* Blog Items Table */}
                {(() => {
                  const filtered = blogList.filter((b) => {
                    if (!blogSearch) return true;
                    const search = blogSearch.toLowerCase();
                    return (
                      b.title?.toLowerCase().includes(search) ||
                      b.description?.toLowerCase().includes(search) ||
                      (b.userId?.name &&
                        b.userId.name.toLowerCase().includes(search))
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 bg-[#FAF7F2]/40 rounded-xl border border-dashed border-[#e8dfd3]">
                        <GrBlog className="text-4xl text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium">
                          No blog posts found{" "}
                          {blogSearch
                            ? `matching "${blogSearch}"`
                            : "in the list"}
                          .
                        </p>
                        <button
                          onClick={openAddBlogModal}
                          className="mt-3 text-xs font-semibold text-[#121d27] bg-[#c5a572] hover:bg-[#b59560] px-4 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          + Publish First Post
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                          <tr>
                            <th className="py-3 px-4">Article</th>
                            <th className="py-3 px-4">Author</th>
                            <th className="py-3 px-4">Content Excerpt</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filtered.map((b) => (
                            <tr key={b._id} className="hover:bg-[#FAF7F2]/60">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {b.image ? (
                                    <img
                                      src={`http://localhost:1000/uploads/${b.image}`}
                                      alt={b.title}
                                      className="w-14 h-14 rounded-xl object-cover border border-[#e8dfd3] shadow-xs"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <div className="w-14 h-14 rounded-xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572]">
                                      <GrBlog className="text-xl" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-semibold text-[#121d27] line-clamp-1 max-w-xs">
                                      {b.title}
                                    </p>
                                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                                      <FaCalendarAlt className="text-[10px]" />
                                      {b.date
                                        ? new Date(b.date).toLocaleDateString()
                                        : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <p className="text-xs font-semibold text-[#121d27]">
                                  {b.userId?.name || "Admin"}
                                </p>
                                <span className="text-[10px] text-gray-400">
                                  {b.userId?.role || "Staff"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">
                                {b.description}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openEditBlogModal(b)}
                                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                    title="Edit Post"
                                  >
                                    <MdEdit className="text-lg" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlog(b)}
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                    title="Delete Post"
                                  >
                                    <MdDeleteOutline className="text-lg" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            </>
          )}
        </main>
      </div>

      {/* ══════════════════════════════════════════════════════
          MODAL: SETTINGS / ADMIN PROFILE
         ══════════════════════════════════════════════════════ */}
      {isSettingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsSettingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <IoSettingsOutline className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  Admin Settings
                </h3>
                <p className="text-xs text-gray-500">
                  Your account profile & info
                </p>
              </div>
            </div>

            {/* Avatar + Info */}
            <div className="flex flex-col items-center gap-3 py-4 px-2 bg-white rounded-xl border border-[#e8dfd3] mb-5">
              <div className="w-20 h-20 rounded-full bg-[#121d27] flex items-center justify-center text-[#c5a572] text-3xl font-bold font-serif shadow-md">
                {settingForm.name
                  ? settingForm.name.charAt(0).toUpperCase()
                  : user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "A"}
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#121d27] font-serif">
                  {settingForm.name || user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">{user?.email || "—"}</p>
                <span className="inline-block mt-1.5 text-[11px] font-semibold px-3 py-0.5 rounded-full bg-[#121d27] text-[#c5a572] capitalize">
                  {settingForm.role || user?.role || "admin"}
                </span>
              </div>
            </div>

            {/* Update Form: Name & Role only */}
            <form onSubmit={handleUpdateSettings} className="space-y-3 mb-4">
              {/* Name Field */}
              <div className="bg-white rounded-xl border border-[#e8dfd3] focus-within:ring-1 focus-within:ring-[#c5a572] px-3.5 py-2.5 transition">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={settingForm.name}
                  onChange={(e) =>
                    setSettingForm({ ...settingForm, name: e.target.value })
                  }
                  className="w-full bg-transparent font-semibold text-[#121d27] text-sm outline-none"
                />
              </div>

              {/* Email Field (Read-only) */}
              <div className="bg-gray-100/70 rounded-xl border border-[#e8dfd3] px-3.5 py-2.5 select-none">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium bg-gray-200/70 px-2 py-0.5 rounded">
                    Read-only
                  </span>
                </div>
                <p className="font-semibold text-gray-500 text-sm truncate">
                  {user?.email || "—"}
                </p>
              </div>

              {/* Role Field */}
              <div className="bg-white rounded-xl border border-[#e8dfd3] focus-within:ring-1 focus-within:ring-[#c5a572] px-3.5 py-2.5 transition">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                  Role
                </label>
                <select
                  value={settingForm.role}
                  onChange={(e) =>
                    setSettingForm({ ...settingForm, role: e.target.value })
                  }
                  className="w-full bg-transparent font-semibold text-[#121d27] text-sm outline-none cursor-pointer capitalize"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Update button */}
              <button
                type="submit"
                disabled={settingLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#c5a572] hover:bg-[#b59560] text-[#121d27] font-bold text-sm py-2.5 rounded-xl transition cursor-pointer shadow-md disabled:opacity-50"
              >
                <MdEdit className="text-base" />
                {settingLoading ? "Updating..." : "Update"}
              </button>
            </form>

            {/* Logout button */}
            <button
              type="button"
              onClick={() => {
                setIsSettingModalOpen(false);
                logout();
                navigate("/login");
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#121d27] hover:bg-black text-[#c5a572] font-semibold text-sm py-2.5 rounded-xl transition cursor-pointer"
            >
              <MdLogout className="text-lg" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: EDIT SPECIFIC USER (NAME & ROLE ONLY)
         ══════════════════════════════════════════════════════ */}
      {isEditUserOpen && editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setIsEditUserOpen(false);
                setEditingUser(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <MdEdit className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  Edit User
                </h3>
                <p className="text-xs text-gray-500">
                  Update name and role only
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={editUserForm.name}
                  onChange={(e) =>
                    setEditUserForm({ ...editUserForm, name: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">Read-only</span>
                </div>
                <input
                  type="email"
                  disabled
                  value={editingUser.email || ""}
                  className="w-full bg-gray-100/80 border border-[#e8dfd3] text-gray-500 rounded-xl px-3.5 py-2.5 text-sm font-medium cursor-not-allowed select-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Account Role
                </label>
                <select
                  value={editUserForm.role}
                  onChange={(e) =>
                    setEditUserForm({ ...editUserForm, role: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition cursor-pointer capitalize"
                >
                  <option value="user">User (Customer)</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditUserOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editUserLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-[#121d27] bg-[#c5a572] hover:bg-[#b59560] transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  {editUserLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: ADD NEW USER
         ══════════════════════════════════════════════════════ */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <AiOutlineUserAdd className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  Add New User
                </h3>
                <p className="text-xs text-gray-500">
                  Create a customer or admin account
                </p>
              </div>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Account Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition cursor-pointer"
                >
                  <option value="user">User (Customer)</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={userLoading}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#c5a572] bg-[#121d27] hover:bg-black transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  {userLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: ADD TABLE BOOKING
         ══════════════════════════════════════════════════════ */}
      {isAddBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsAddBookingOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <MdBookmarkAdded className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  Add Table Booking
                </h3>
                <p className="text-xs text-gray-500">
                  Record a new reservation for customer
                </p>
              </div>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={newBooking.name}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, name: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 234 567 890"
                    value={newBooking.phone}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, phone: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={newBooking.email}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, email: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, date: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3 py-2 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Time
                  </label>
                  <select
                    value={newBooking.time}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, time: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3 py-2.5 text-sm transition cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:30 PM">08:30 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={newBooking.seats}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        seats: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3 py-2 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Special Notes / Requests
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="e.g. Window side table, high chair, birthday greeting..."
                  value={newBooking.notes}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, notes: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2 text-sm transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddBookingOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#c5a572] bg-[#121d27] hover:bg-black transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  {bookingLoading ? "Booking..." : "Confirm Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: ADD / EDIT MENU ITEM
         ══════════════════════════════════════════════════════ */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <BiFoodMenu className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  {editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}
                </h3>
                <p className="text-xs text-gray-500">
                  {editingMenuItem
                    ? "Modify recipe, category, or pricing details"
                    : "Create a new dish or drink for your coffee menu"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveMenu} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vanilla Caramel Latte"
                    value={menuForm.name}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, name: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={menuForm.category}
                    onChange={(e) =>
                      setMenuForm({ ...menuForm, category: e.target.value })
                    }
                    className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition cursor-pointer"
                  >
                    <option value="Coffee">Coffee</option>
                    <option value="Starters">Starters</option>
                    <option value="BreakFast">BreakFast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Mocktails">Mocktails</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="e.g. 4.50"
                  value={menuForm.price}
                  onChange={(e) =>
                    setMenuForm({ ...menuForm, price: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Freshly pulled double espresso with silky steamed milk and bourbon vanilla syrup."
                  value={menuForm.description}
                  onChange={(e) =>
                    setMenuForm({ ...menuForm, description: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2 text-sm transition resize-none"
                />
              </div>

              {/* Image Upload with Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Item Image{" "}
                  {editingMenuItem ? "(Optional to change)" : "(Optional)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setMenuForm({
                        ...menuForm,
                        imageFile: file,
                        imagePreview: URL.createObjectURL(file),
                      });
                    }
                  }}
                  className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:text-[#c5a572] hover:file:bg-black file:cursor-pointer border-[#e8dfd3] bg-white p-1.5"
                />
                {menuForm.imagePreview && (
                  <div className="mt-2.5 flex items-center gap-3">
                    <img
                      src={menuForm.imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-[#c5a572]/40 shadow-xs"
                    />
                    <span className="text-xs text-gray-500">
                      {menuForm.imageFile
                        ? "Selected new file"
                        : "Current image"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={menuLoading}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#c5a572] bg-[#121d27] hover:bg-black transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  {menuLoading
                    ? "Saving..."
                    : editingMenuItem
                      ? "Update Item"
                      : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: ADD / EDIT BLOG POST
         ══════════════════════════════════════════════════════ */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#e3d7c5] rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200/60 transition cursor-pointer"
              title="Close"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#121d27] flex items-center justify-center text-[#c5a572]">
                <GrBlog className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#121d27]">
                  {editingBlogItem ? "Edit Blog Post" : "Add New Blog Post"}
                </h3>
                <p className="text-xs text-gray-500">
                  {editingBlogItem
                    ? "Modify title, date, content, or cover photo"
                    : "Publish a story, brew guide, or announcement"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Secret Art of Pour-Over Brewing"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, title: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Publish Date
                </label>
                <input
                  type="date"
                  required
                  value={blogForm.date}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, date: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2.5 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Article Description / Content
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share the full coffee story, brewing steps, or event highlights..."
                  value={blogForm.description}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, description: e.target.value })
                  }
                  className="w-full bg-white border border-[#e8dfd3] focus:ring-1 focus:ring-[#c5a572] outline-none rounded-xl px-3.5 py-2 text-sm transition resize-none"
                />
              </div>

              {/* Image Upload with Preview */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Cover Image{" "}
                  {editingBlogItem ? "(Optional to change)" : "(Optional)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setBlogForm({
                        ...blogForm,
                        imageFile: file,
                        imagePreview: URL.createObjectURL(file),
                      });
                    }
                  }}
                  className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:text-[#c5a572] hover:file:bg-black file:cursor-pointer border-[#e8dfd3] bg-white p-1.5"
                />
                {blogForm.imagePreview && (
                  <div className="mt-2.5 flex items-center gap-3">
                    <img
                      src={blogForm.imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-[#c5a572]/40 shadow-xs"
                    />
                    <span className="text-xs text-gray-500">
                      {blogForm.imageFile
                        ? "Selected new cover image"
                        : "Current cover image"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={blogLoading}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-[#c5a572] bg-[#121d27] hover:bg-black transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  {blogLoading
                    ? "Saving..."
                    : editingBlogItem
                      ? "Update Post"
                      : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: CUSTOM DELETE CONFIRMATION
         ══════════════════════════════════════════════════════ */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        itemName={deleteModal.itemName}
        loading={deleteModal.loading}
        onConfirm={handleExecuteDelete}
        onClose={() =>
          setDeleteModal((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
};

export default Admin;
