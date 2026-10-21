import React, { useState } from "react";
import Team from "../componets/Team";
import Gallery from "../componets/Gallery";
import Footer from "../componets/Footer";
import MenuCard from "../componets/MenuCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import drinksImg from "../assets/img/drinks.png";
import dinnerImg from "../assets/img/dinner.png";
import lunchImg from "../assets/img/lunch.png";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [notes, setNotes] = useState("");

  async function booking(e) {
    e.preventDefault();

    if (!name || !email || !phone || !date || !time || !seats || !notes) {
      alert("Please fill in all fields.");
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

      alert(res.data.msg || "Booking created successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setSeats("");
      setNotes("");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Failed to submit booking.";
      alert(errorMessage);
    }
  }

  const navigate = useNavigate();

  const specialMenus = [
    {
      title: "DRINKS",
      bgImage: drinksImg,
      items: [
        "Beer",
        "Coffee",
        "Ice Tea",
        "Juice",
        "MilkTea",
        "Smoothie",
        "Soft Drink",
      ],
    },
    {
      title: "DINNER",
      bgImage: dinnerImg,
      items: [
        "Appetizers",
        "Bruschetta",
        "Chicken",
        "Rice & Flesh",
        "Seafood",
        "Sides",
        "Veal & Beef",
      ],
    },
    {
      title: "LUNCH",
      bgImage: lunchImg,
      items: [
        "Appetizers",
        "Cakes",
        "Fire It Up",
        "Pastas",
        "Salads",
        "Sandwiches",
        "Soups",
      ],
    },
  ];

  return (
    <div>
      <div className="bg-[url(../src/assets/img/bgcafe.png)] w-full h-[84vh] bg-cover bg-center">
        <div className="flex flex-col text-white items-center justify-center py-40 gap-3 ">
          <h1 className="text-[#c5a572] font-'Great Vibes' ,cursive text-4xl">
            Welcome to Oneline
          </h1>
          <h2 className="text-4xl font-serif">
            Feel the Authentic & Taste From Us
          </h2>
          <div className="text-[#c5a572] flex ">
            <samp>_________</samp>
            <img className="w-5" src="../src/assets/img/cafe.svg" alt="error" />
            <samp>_________</samp>
          </div>
          <h3 className="text-gray-300">18 Years to Master, Yours to Savor</h3>
          <button className="border px-4 py-1 text-gray-300">
            Book A Table
          </button>
        </div>
      </div>

      <div className="h-[85vh] flex justify-between items-center ml-40">
        <div className="flex flex-col gap-5">
          <h1 className="font-sans text-[#c5a572] text-md">OUR STORY</h1>
          <h1 className="font-serif text-3xl">
            A Brief History Of How We Started.
          </h1>
          <h1 className="font-sans text-sm text-gray-600">
            Iste sed saepe animi magnam voluptatibus voluptatibus <br />
            natus quaerat. Sit sunt id rem. Doloribus et quam et <br />
            tempora veritatis praesentium vero. Tempora repudiandae <br />
            quia.Dicta dolorum neque illum sit quam nemo labore <br />
            asperiores sed. Exercitationem voluptatem ut qui <br />
            accusamus veniam. Fugit voluptatem dignissimos aperiam <br />
            beatae labore esse.
          </h1>
          <button className="font-sans border px-4 py-1 text-[#c5a572] w-35">
            Book A Table
          </button>
        </div>
        <div className="flex justify-center items-center gap-5">
          <img
            className="h-70"
            src="../src/assets/img/ourstory1.png"
            alt="error"
          />
          <img
            className="h-90"
            src="../src/assets/img/ourstory2.png"
            alt="error"
          />
          <img
            className="w-40 mt-100"
            src="../src/assets/img/ourstorybg2.png"
            alt=""
          />
        </div>
      </div>

      <div className="bg-[url(../src/assets/img/ourserviceimg.png)] w-full h-screen bg-cover bg-center flex flex-col items-center justify-center ">
        <div className="">
          <h1 className="text-[#c5a572] font-sans text-md">OUR SERVICES</h1>
          <h1 className="text-4xl font-serif text-white">We Hold Events</h1>
        </div>

        <div className="flex gap-5 items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              className="w-16 -mb-4"
              src="../src/assets/img/holidayparies.svg"
              alt=""
            />

            <div className="border border-[#3f403a] px-10 pt-12 pb-10 text-center">
              <h2 className="text-3xl font-serif text-[#c5a363]">
                Holiday Parties
              </h2>
              <p className="mt-3 text-md text-gray-500">
                Itaque ducimus commodi omnis
                <br />
                adipisci et ullam in ut ut. Ab enim sed
                <br />
                et porro expedita. Optio id cum officiis
                <br />
                nemo omnis consequatur numquam
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="w-16 -mb-4"
              src="../src/assets/img/birthday.svg"
              alt=""
            />

            <div className="border border-[#3f403a] px-10 pt-12 pb-10 text-center">
              <h2 className="text-3xl font-serif text-[#c5a363]">
                Birthday Parties
              </h2>
              <p className="mt-3 text-md text-gray-500">
                Provident similique sed molestiae a.
                <br />
                Praesentium minus maiores qui.
                <br />
                Voluptas voluptatibus perferendis
                <br />
                corrupti in reiciendis neque dolorem
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="w-16 -mb-4"
              src="../src/assets/img/anniversaries.svg"
              alt=""
            />

            <div className="border border-[#3f403a] px-10 pt-12 pb-10 text-center">
              <h2 className="text-3xl font-serif text-[#c5a363]">
                Anniversaries
              </h2>
              <p className="mt-3 text-md text-gray-500">
                Modi necessitatibus velit culpa. Animi
                <br />
                est et eum quidem. Placeat atque
                <br />
                tenetur delectus laborum. Et modi
                <br />
                nihil.Voluptate necessitatibus atque
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen px-25 py-10">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#c5a572] font-sans">SPECIAL TODAY</h1>
            <h2 className="text-4xl font-serif">
              Feel The Authentic & Original <br />
              Taste From Us
            </h2>
          </div>
          <div className="text-gray-600">
            <p>
              Iste sed saepe animi magnam voluptatibus voluptatibus natus
              quaerat. Sit <br />
              sunt id rem. Doloribus et quam et tempora veritatis praesentium
              vero. <br />
              Tempora repudiandae quia
            </p>
          </div>
        </div>
        <div className="flex gap-10 justify-center items-center mt-10">
          {specialMenus.map((menu, index) => (
            <MenuCard
              key={index}
              title={menu.title}
              bgImage={menu.bgImage}
              items={menu.items}
              onExplore={() => navigate("/menu")}
            />
          ))}
        </div>
      </div>

      <div className="px-25">
        <div className="bg-[#f4eee4] w-full h-screen ml-r-25 flex flex-col gap-10 justify-center items-center">
          <div className="text-center flex flex-col ">
            <h1 className="text-[#c5a572] font-sans">RESERVATION</h1>
            <h2 className="text-4xl font-serif">Online Booking</h2>
          </div>
          <div className="">
            <form
              onSubmit={booking}
              className="flex flex-col justify-center items-center gap-5"
            >
              <div className="flex  gap-10">
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="text"
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="text"
                  placeholder="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex gap-10">
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="tel"
                  placeholder="Phone*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="date"
                  placeholder="Date*"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex gap-10">
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="time"
                  placeholder="Time*"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <input
                  className="border-b w-90 text-gray-500 h-12"
                  type="number"
                  min="1"
                  placeholder="Seats*"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>
              <input
                className="border-b w-190 text-gray-500 h-12"
                type="text"
                placeholder="Notes*"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button className="border px-5 py-2 flex justify-center bg-black text-white">
                Book a Table
              </button>
            </form>
          </div>
        </div>
      </div>

      <Team />

      <div className="px-25 h-screen flex justify-center items-center">
        <div className="bg-[url(../src/assets/img/testimonialbg.png)] w-full h-[80vh] bg-cover bg-center">
          <div className="flex flex-col justify-center items-center py-15 gap-3">
            <h1 className="text-[#c5a572] font-sans">TESTIMONIAL</h1>
            <h2 className="text-4xl font-serif text-white">
              In The Words Of Our Clinets
            </h2>
          </div>
          <div className="flex px-10 gap-10">
            <div className="w-79 bg-white p-4">
              <div className="border border-[#dfc9a4] p-4 text-center ">
                <img
                  className="flex justify-center items-center mx-auto w-8"
                  src="../src/assets/img/quote.svg"
                  alt="error"
                />
                <p className="text-[#888888] text-md font-sans">
                  " Harum quis facere a doloremque
                  <br />
                  dolore odio qui cupiditate.
                  <br />
                  Repellendus officiis culpa repellat
                  <br />
                  doloremque quo. Aut ad sunt
                  <br />
                  modi sit. "
                </p>
                <p className="text-[#4d5358] text-md mt-2">– Armani Murray</p>
              </div>
            </div>

            <div className="w-79 bg-white p-4">
              <div className="border border-[#dfc9a4] p-4 text-center ">
                <img
                  className="flex justify-center items-center mx-auto w-8"
                  src="../src/assets/img/quote.svg"
                  alt="error"
                />
                <p className="text-[#888888] text-md font-sans">
                  " Harum quis facere a doloremque
                  <br />
                  dolore odio qui cupiditate.
                  <br />
                  Repellendus officiis culpa repellat
                  <br />
                  doloremque quo. Aut ad sunt
                  <br />
                  modi sit. "
                </p>
                <p className="text-[#4d5358] text-md mt-2">– Armani Murray</p>
              </div>
            </div>

            <div className="w-79 bg-white p-4">
              <div className="border border-[#dfc9a4] p-4 text-center ">
                <img
                  className="flex justify-center items-center mx-auto w-8"
                  src="../src/assets/img/quote.svg"
                  alt="error"
                />
                <p className="text-[#888888] text-md font-sans">
                  " Harum quis facere a doloremque
                  <br />
                  dolore odio qui cupiditate.
                  <br />
                  Repellendus officiis culpa repellat
                  <br />
                  doloremque quo. Aut ad sunt
                  <br />
                  modi sit. "
                </p>
                <p className="text-[#4d5358] text-md mt-2">– Armani Murray</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-25 ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#c5a572] font-sans">LATEST BLOGS</h1>
          <h2 className="text-4xl font-serif text-center">
            Praesent Condimentum Rutrum Nibh, Nec <br />
            Ullamcorper Odio Laoreet Blandit.
          </h2>
        </div>
        <div className="flex flex-col gap-10 m-20">
          <div className="flex justify-between">
            <img
              className="w-75"
              src="../src/assets/img/blog1.png"
              alt="error"
            />
            <div className="bg-[#f4eee4] w-65 h-60 flex flex-col justify-center items-center gap-3 ">
              <img src="../src/assets/img/left-quote.svg" alt="error" />
              <h2 className="font-serif text-center ">
                Eum officia culpa expedita <br />
                mollitia corporis.
              </h2>
              <p className="text-[#888888]">Marshall Artis, Head Chef</p>
            </div>
            <img className="w-75" src="../src/assets/img/blog2.png" alt="" />
          </div>
          <div className="font-semi flex justify-between">
            <div className=" w-65 h-60 flex flex-col gap-2">
              <p className="text-[#b9b9b9]">21-04-2020 ~ Food</p>
              <h2 className="font-serif ">
                Macarons vs. Macaroons: What's the Difference There?
              </h2>
              <p className="text-[#888888]">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat aute duis aute
                lorem sit.
              </p>
              <p className="text-[#c5a572]">Read More → </p>
            </div>
            <img
              className="w-70"
              src="../src/assets/img/blog.png"
              alt="error"
            />
            <div className="w-65 h-60 flex flex-col gap-2">
              <p className="text-[#b9b9b9]">22-04-2020 ~ Food</p>
              <h2 className="font-serif ">
                Ut doloremque exercitationem molestias rerum?
              </h2>
              <p className="text-[#888888]">
                Alias suscipit iure voluptas ea et et voluptatibus. Animi
                assumenda libero.At natus id. Perferendis sunt repudiandae
                tenetur fugit.
              </p>
              <p className="text-[#c5a572]">Read More → </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="bg-[#f4eee4] w-65 h-60 flex flex-col justify-center items-center gap-3 ">
              <img src="../src/assets/img/left-quote.svg" alt="error" />
              <h2 className="font-serif text-center ">
                Nihil quas ut adipisci est <br />
                excepturi molestias.
              </h2>
              <p className="text-[#888888]">Dorian Hackett Sr.</p>
            </div>

            <div className="w-65 h-60 flex flex-col gap-2">
              <p className="text-[#b9b9b9]">22-04-2020 ~ Food</p>
              <h2 className="font-serif ">
                How to Make the Perfect Double Dutch in 5 Steps
              </h2>
              <p className="text-[#888888]">
                Id veritatis culpa voluptas explicabo eum in facilis cupiditate.
                Vel eos possimus accusamus qui nihil. Exercitationem asperiores
                dolor aut beatae.
              </p>
              <p className="text-[#c5a572]">Read More → </p>
            </div>

            <div className="bg-[#f4eee4] w-65 h-60 flex flex-col justify-center items-center gap-3 ">
              <img src="../src/assets/img/left-quote.svg" alt="error" />
              <h2 className="font-serif text-center ">
                Accusamus voluptatum <br />
                dolores tenetur et autem.
              </h2>
              <p className="text-[#888888]">Keegan Leuschke</p>
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
