import React, { useState, useEffect } from "react";
import Team from "../componets/Team";
import Gallery from "../componets/Gallery";
import Footer from "../componets/Footer";
import MenuCard from "../componets/MenuCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast";

// ── Asset imports (Vite-safe) ──
import bgCafe from "../assets/img/bgcafe.png";
import cafeIcon from "../assets/img/cafe.svg";
import ourstory1 from "../assets/img/ourstory1.png";
import ourstory2 from "../assets/img/ourstory2.png";
import ourstorybg2 from "../assets/img/ourstorybg2.png";
import ourServiceImg from "../assets/img/ourserviceimg.png";
import holidayIcon from "../assets/img/holidayparies.svg";
import birthdayIcon from "../assets/img/birthday.svg";
import anniversariesIcon from "../assets/img/anniversaries.svg";
import testimonialBg from "../assets/img/testimonialbg.png";
import quoteIcon from "../assets/img/quote.svg";
import leftQuote from "../assets/img/left-quote.svg";
import blog1 from "../assets/img/blog1.png";
import blog2 from "../assets/img/blog2.png";
import blogImg from "../assets/img/blog.png";
import dinnerImg from "../assets/img/gallery/g4.png";
import lunchImg from "../assets/img/G1.png";
import breakfastImg from "../assets/img/sp3.png";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [notes, setNotes] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getmenu();
  }, []);

  useEffect(() => {
    console.log("Updated menu state:", menu);
  }, [menu]);

  async function getmenu() {
    try {
      const response = await axios.get("http://localhost:1000/menu/read");
      const fetchedMenu = response.data.readMenu || [];
      setMenu(fetchedMenu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  async function booking(e) {
    e.preventDefault();

    if (!name || !email || !phone || !date || !time || !seats || !notes) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1000/booking/create", {
        name,
        email,
        phone,
        date,
        time,
        seats: Number(seats),
        notes,
      });

      toast.success(res.data.msg || "Booking created successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setSeats("");
      setNotes("");
      getmenu();
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to submit booking.";
      toast.error(errorMessage);
    }
  }

  const navigate = useNavigate();

  const specialMenus = [
    {
      category: "breakfast",
      title: "BREAKFAST",
      bgImage: breakfastImg,
      fallback: ["Pancake Stack", "Avocado Toast", "Eggs Benedict", "French Toast", "Fruit Bowl"],
    },
    {
      category: "lunch",
      title: "LUNCH",
      bgImage: lunchImg,
      fallback: ["Club Sandwich", "Caesar Salad", "Pasta Primavera", "Tomato Basil Soup", "Grilled Burger"],
    },
    {
      category: "dinner",
      title: "DINNER",
      bgImage: dinnerImg,
      fallback: ["Ribeye Steak", "Grilled Salmon", "Chicken Marsala", "Mushroom Risotto", "Seafood Platter"],
    },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ===================================================================
          HERO SECTION
          Desktop: 84vh tall   |   Tablet: 75vh   |   Mobile: 70vh
         =================================================================== */}
      <div
        className="w-full h-[70vh] sm:h-[75vh] lg:h-[84vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgCafe})` }}
      >
        <div className="flex flex-col text-white items-center justify-center h-full px-6 sm:px-8 gap-3 text-center">
          <h1 className="text-[#c5a572] text-3xl sm:text-4xl font-['Great_Vibes']">
            Welcome to Oneline
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif max-w-2xl leading-snug">
            Feel the Authentic & Taste From Us
          </h2>
          <div className="text-[#c5a572] flex items-center gap-2">
            <span>_________</span>
            <img className="w-5" src={cafeIcon} alt="" />
            <span>_________</span>
          </div>
          <h3 className="text-gray-300 text-sm sm:text-base">18 Years to Master, Yours to Savor</h3>
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-gray-300 px-5 py-2 text-gray-300 hover:bg-white hover:text-black transition-all mt-2 cursor-pointer"
          >
            Book A Table
          </button>
        </div>
      </div>

      {/* ===================================================================
          OUR STORY
          Desktop: side-by-side   |   Mobile/Tablet: stacked vertically
         =================================================================== */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 px-6 sm:px-8 md:px-12 lg:px-20 xl:ml-40 py-16 lg:h-[85vh]">
        <div className="flex flex-col gap-4 sm:gap-5 max-w-xl text-center lg:text-left">
          <h1 className="font-sans text-[#c5a572] text-sm sm:text-md tracking-wide">OUR STORY</h1>
          <h1 className="font-serif text-2xl sm:text-3xl">
            A Brief History Of How We Started.
          </h1>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            Iste sed saepe animi magnam voluptatibus voluptatibus natus quaerat.
            Sit sunt id rem. Doloribus et quam et tempora veritatis praesentium
            vero. Tempora repudiandae quia. Dicta dolorum neque illum sit quam
            nemo labore asperiores sed. Exercitationem voluptatem ut qui
            accusamus veniam. Fugit voluptatem dignissimos aperiam beatae labore
            esse.
          </p>
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-sans border border-[#c5a572] px-5 py-2 text-[#c5a572] w-fit mx-auto lg:mx-0 hover:bg-[#c5a572] hover:text-white transition-all cursor-pointer"
          >
            Book A Table
          </button>
        </div>

        <div className="flex justify-center items-end gap-3 sm:gap-5 relative">
          <img className="h-48 sm:h-60 lg:h-70 object-cover rounded-sm" src={ourstory1} alt="Our story 1" />
          <img className="h-56 sm:h-72 lg:h-90 object-cover rounded-sm" src={ourstory2} alt="Our story 2" />
          <img className="hidden lg:block w-40 absolute -bottom-10 right-0" src={ourstorybg2} alt="" />
        </div>
      </div>

      {/* ===================================================================
          OUR SERVICES
          Desktop: 3 cols   |   Tablet: 3 cols   |   Mobile: 1 col stacked
         =================================================================== */}
      <div
        className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-16 sm:py-20 px-6 sm:px-8"
        style={{ backgroundImage: `url(${ourServiceImg})` }}
      >
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-[#c5a572] font-sans text-sm sm:text-md tracking-wide">OUR SERVICES</h1>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mt-2">We Hold Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-5 max-w-6xl w-full">
          {[
            { icon: holidayIcon, title: "Holiday Parties", text: "Itaque ducimus commodi omnis adipisci et ullam in ut ut. Ab enim sed et porro expedita. Optio id cum officiis nemo omnis consequatur numquam" },
            { icon: birthdayIcon, title: "Birthday Parties", text: "Provident similique sed molestiae a. Praesentium minus maiores qui. Voluptas voluptatibus perferendis corrupti in reiciendis neque dolorem" },
            { icon: anniversariesIcon, title: "Anniversaries", text: "Modi necessitatibus velit culpa. Animi est et eum quidem. Placeat atque tenetur delectus laborum. Et modi nihil. Voluptate necessitatibus atque" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <img className="w-14 sm:w-16 -mb-4 z-10" src={item.icon} alt="" />
              <div className="border border-[#3f403a] px-6 sm:px-8 pt-12 pb-8 text-center bg-black/20 backdrop-blur-sm w-full">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#c5a363]">{item.title}</h2>
                <p className="mt-3 text-sm sm:text-md text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================
          SPECIAL TODAY  (MenuCards)
          Desktop: 3 cards in a row   |   Tablet: 2   |   Mobile: 1 centered
         =================================================================== */}
      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-25 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div className="flex flex-col gap-3 sm:gap-5">
            <h1 className="text-[#c5a572] font-sans tracking-wide">SPECIAL TODAY</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif">
              Feel The Authentic & Original <br className="hidden sm:block" />
              Taste From Us
            </h2>
          </div>
          <div className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
            <p>
              Iste sed saepe animi magnam voluptatibus voluptatibus natus
              quaerat. Sit sunt id rem. Doloribus et quam et tempora veritatis
              praesentium vero. Tempora repudiandae quia
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-10 justify-center items-center mt-8">
          {specialMenus.map((special, index) => {
            const dbItems = menu
              .filter(
                (item) =>
                  item.category &&
                  item.category.trim().toLowerCase() === special.category.toLowerCase()
              )
              .map((item) => item.name);

            const cardItems = dbItems.length > 0 ? dbItems : special.fallback;

            return (
              <MenuCard
                key={index}
                title={special.title}
                bgImage={special.bgImage}
                items={cardItems}
                onExplore={() => navigate("/menu")}
              />
            );
          })}
        </div>
      </div>

      {/* ===================================================================
          RESERVATION / BOOKING
         =================================================================== */}
      <div id="booking">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-25 py-12">
          <div className="bg-[#f4eee4] w-full py-12 sm:py-16 lg:py-20 flex flex-col gap-8 sm:gap-10 justify-center items-center rounded-sm">
            <div className="text-center px-4">
              <h1 className="text-[#c5a572] font-sans tracking-wide">RESERVATION</h1>
              <h2 className="text-3xl sm:text-4xl font-serif mt-2">Online Booking</h2>
            </div>

            <form onSubmit={booking} className="flex flex-col justify-center items-center gap-5 w-full max-w-4xl px-6 sm:px-8">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full">
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="text"
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="email"
                  placeholder="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full">
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="tel"
                  placeholder="Phone*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full">
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <input
                  className="border-b border-gray-400 w-full sm:w-1/2 text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                  type="number"
                  min="1"
                  placeholder="Seats*"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>

              <input
                className="border-b border-gray-400 w-full text-gray-600 h-12 bg-transparent outline-none focus:border-[#c5a572] transition-colors"
                type="text"
                placeholder="Notes*"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button
                type="submit"
                className="border border-black px-8 py-3 bg-black text-white hover:bg-white hover:text-black transition-all mt-4 cursor-pointer"
              >
                Book a Table
              </button>
            </form>
          </div>
        </div>
      </div>

      <Team />

      {/* ===================================================================
          TESTIMONIALS
          Desktop: 3 cols   |   Tablet: 3 cols   |   Mobile: 1 col stacked
         =================================================================== */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-25 py-12 sm:py-16">
        <div
          className="w-full bg-cover bg-center py-12 sm:py-16 rounded-sm"
          style={{ backgroundImage: `url(${testimonialBg})` }}
        >
          <div className="flex flex-col justify-center items-center gap-2 mb-10 px-4">
            <h1 className="text-[#c5a572] font-sans tracking-wide">TESTIMONIAL</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white text-center">
              In The Words Of Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-10">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-3 sm:p-4">
                <div className="border border-[#dfc9a4] p-4 sm:p-5 text-center h-full flex flex-col justify-center items-center gap-3">
                  <img className="mx-auto w-8 mb-1" src={quoteIcon} alt="" />
                  <p className="text-[#888888] text-sm sm:text-md font-sans leading-relaxed">
                    "Harum quis facere a doloremque dolore odio qui cupiditate.
                    Repellendus officiis culpa repellat doloremque quo. Aut ad
                    sunt modi sit."
                  </p>
                  <p className="text-[#4d5358] text-sm mt-2">– Armani Murray</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================
          LATEST BLOGS
          Desktop: 3 cols grid   |   Mobile: single col stacked
         =================================================================== */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-25 py-12 sm:py-16">
        <div className="flex flex-col justify-center items-center mb-10 sm:mb-14 px-4">
          <h1 className="text-[#c5a572] font-sans tracking-wide">LATEST BLOGS</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mt-2 max-w-3xl">
            Praesent Condimentum Rutrum Nibh, Nec Ullamcorper Odio Laoreet Blandit.
          </h2>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Row 1 — Image / Quote / Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <img className="w-full h-56 sm:h-64 object-cover rounded-sm" src={blog1} alt="Blog 1" />
            <div className="bg-[#f4eee4] h-56 sm:h-64 flex flex-col justify-center items-center gap-3 p-6 rounded-sm">
              <img src={leftQuote} alt="" className="w-8" />
              <h2 className="font-serif text-center text-lg">
                Eum officia culpa expedita mollitia corporis.
              </h2>
              <p className="text-[#888888] text-sm">Marshall Artis, Head Chef</p>
            </div>
            <img className="w-full h-56 sm:h-64 object-cover rounded-sm" src={blog2} alt="Blog 2" />
          </div>

          {/* Row 2 — Text / Image / Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-[#b9b9b9] text-sm">21-04-2020 ~ Food</p>
              <h2 className="font-serif text-lg sm:text-xl">
                Macarons vs. Macaroons: What's the Difference There?
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute duis aute lorem sit.
              </p>
              <p
                className="text-[#c5a572] cursor-pointer hover:underline"
                onClick={() => navigate('/blog')}
              >
                Read More →
              </p>
            </div>
            <img className="w-full h-56 sm:h-64 object-cover rounded-sm" src={blogImg} alt="Blog 3" />
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-[#b9b9b9] text-sm">22-04-2020 ~ Food</p>
              <h2 className="font-serif text-lg sm:text-xl">
                Ut doloremque exercitationem molestias rerum?
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                Alias suscipit iure voluptas ea et et voluptatibus. Animi assumenda libero. At natus id. Perferendis sunt repudiandae tenetur fugit.
              </p>
              <p
                className="text-[#c5a572] cursor-pointer hover:underline"
                onClick={() => navigate('/blog')}
              >
                Read More →
              </p>
            </div>
          </div>

          {/* Row 3 — Quote / Text / Quote */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f4eee4] h-56 sm:h-64 flex flex-col justify-center items-center gap-3 p-6 rounded-sm">
              <img src={leftQuote} alt="" className="w-8" />
              <h2 className="font-serif text-center text-lg">
                Nihil quas ut adipisci est excepturi molestias.
              </h2>
              <p className="text-[#888888] text-sm">Dorian Hackett Sr.</p>
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <p className="text-[#b9b9b9] text-sm">22-04-2020 ~ Food</p>
              <h2 className="font-serif text-lg sm:text-xl">
                How to Make the Perfect Double Dutch in 5 Steps
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                Id veritatis culpa voluptas explicabo eum in facilis cupiditate. Vel eos possimus accusamus qui nihil. Exercitationem asperiores dolor aut beatae.
              </p>
              <p
                className="text-[#c5a572] cursor-pointer hover:underline"
                onClick={() => navigate('/blog')}
              >
                Read More →
              </p>
            </div>

            <div className="bg-[#f4eee4] h-56 sm:h-64 flex flex-col justify-center items-center gap-3 p-6 rounded-sm">
              <img src={leftQuote} alt="" className="w-8" />
              <h2 className="font-serif text-center text-lg">
                Accusamus voluptatum dolores tenetur et autem.
              </h2>
              <p className="text-[#888888] text-sm">Keegan Leuschke</p>
            </div>
          </div>
        </div>
      </div>

      <Gallery />
      <Footer />
    </div>
  );
};

export default Home;
