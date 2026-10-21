import React, { useState } from "react";
import CategoryCard from "../componets/CategoryCard";
import MenuList from "../componets/MenuList";
import Footer from "../componets/Footer";

import startersImg from "../assets/img/menu/menu6.png";
import breakfastImg from "../assets/img/menu/menu1.png";
import lunchImg from "../assets/img/menu/menu3.png";
import dinnerImg from "../assets/img/menu/menu5.png";
import dessertsImg from "../assets/img/menu/menu4.png";
import coffeeImg from "../assets/img/menu/menu7.png";
import mocktailsImg from "../assets/img/menu/menu2.png";
import icon from '../assets/img/menu/title.png'
import bgimg from '../assets/img/menu/bgmenuimg.png'
import icon2 from '../assets/img/menu/title2.png'
import BookTable from "../componets/BookTable";

const categories = [
  { id: "starters", name: "Starters", image: startersImg },
  { id: "breakfast", name: "Breakfast", image: breakfastImg },
  { id: "lunch", name: "Lunch", image: lunchImg },
  { id: "dinner", name: "Dinner", image: dinnerImg },
  { id: "desserts", name: "Desserts", image: dessertsImg },
  { id: "coffee", name: "Coffee", image: coffeeImg },
  { id: "mocktails", name: "Mocktails", image: mocktailsImg },
];

const id = { title: "STARTERS", img: icon };
const list1 = [
  { title: "Harum Deunt Exercitationem", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$20" },
  { title: "Et Officiis Eaque", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$50" },
  { title: "Architecto Nesciunt Tenetur ", description: "Eum id harum, Dolores enim, Omnis autem.", price: " $40" },
  { title: "In Suscipit Sequi", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$250" },
  { title: "Rerum Possimus Possimus ", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$150" }
];

const list2 = [
  { title: "Molestias Quod Voluptatem", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$250" },
  { title: "Dolore Qui Maiores", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$300" },
  { title: "Doloremque Esse Aspernatur", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$20" },
  { title: "Aut Fuga Cupiditate", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$50" },
  { title: "Beatae Nulla Illo", description: "Eum id harum, Dolores enim, Omnis autem.", price: "$60" }
];

const id2 = {bgimg:bgimg, title:"LUNCH", img: icon2 };
const list3 = [
  {title: "Perferendis Et Excepturi",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$20"},
  {title: "Eveniet Iste Accusantium",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$250"},
  {title: "Nam Nostrum Qui",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$300"},
  {title: "Soluta Labore Aut",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$20"},
  {title: "Laboriosam Culpa Molestiae",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$50"},
];
const list4 = [
  {title: "Fugit Cupiditate Sint",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$30"},
  {title: "Ducimus Omnis Explicabo",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$20"},
  {title: "Numquam Aut Doloremque",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$50"},
  {title: "Non Qui Dolorum",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$70"},
  {title: "Error Omnis Nihil",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$40"},
];

const id3 = { title: "DESSERTS", img: icon };
const list5 = [
  {title: "Dolor Ut Tempore",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$10"},
  {title: "Deleniti Nemo Molestiae",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$90"},
  {title: "Ut Laudantium Eum",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$210"},
  {title: "Numquam Esse Molestias",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$20"},
  {title: "Distinctio Non Quas",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$100"},
];
const list6 = [
  {title: "Veniam Ut Aut",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$250"},
  {title: "Iste Ut Sit",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$50"},
  {title: "Sit Consequatur Qui",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$30"},
  {title: "Eos Et Quas",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$40"},
  {title: "Est Temporibus Enim",description: "Eum id harum, Dolores enim, Omnis autem.",price: "$10"},
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("Starters");

  return (
    <div>
      <div
        className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/menu/g4.png) `,
        }}
      >
        <h1 className="text-[#c5a572] text-5xl font-serif text-extrabold">
          Our Menu
        </h1>
        <p className="text-[#b9b8b8] text-md">Home/Menu</p>
      </div>

      <div className="px-25 my-14">
        <div className="flex gap-4 justify-center items-center flex-wrap xl:flex-nowrap">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              isActive={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            />
          ))}
        </div>
      </div>

      <div className="px-25 my-14">
        <div className="flex flex-col items-center justify-center mb-10 ">
          <h1 className="text-3xl font-serif text-[#c5a572] tracking-wider">{id.title}</h1>
          <img src={id.img} alt="divider" className="w-42" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-10">
            {list1.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {list2.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

        </div>
      </div>
      
      <div
        className="w-full px-25 py-20 my-14 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${id2.bgimg})` }}
      >
        <div className="flex flex-col items-center justify-center mb-10 ">
          <h1 className="text-3xl font-serif text-[#c5a572] tracking-wider">{id2.title}</h1>
          <img src={id2.img} alt="error" className="w-35" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-10">
            {list3.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {list4.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="px-25 my-14">
        <div className="flex flex-col items-center justify-center mb-10 ">
          <h1 className="text-3xl font-serif text-[#c5a572] tracking-wider">{id3.title}</h1>
          <img src={id3.img} alt="divider" className="w-42" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-10">
            {list5.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

          <div className="flex flex-col gap-10">
            {list6.map((list, index) => (
              <MenuList
                key={index}
                title={list.title}
                description={list.description}
                price={list.price}
              />
            ))}
          </div>

        </div>
      </div>

      <div className="bg-[#f4eee4] w-full h-72 flex px-25 justify-between items-center">
            <div className="pr-25">
              <h1 className="text-[#c5a572] text-3xl font-serif">Special Menu</h1>
              <p className="text-[#888888] text-[18px]">Occaecati Cum,<br />Sunt Ducimus,<br />Perspiciatis.</p>
            </div>
            <div className="flex ">
              <img className="w-69 h-72" src="src/assets/img/menu/smi1.png" alt="error" />
              <img className="w-69 h-72" src="src/assets/img/menu/smi2.png" alt="error" />
            </div>
            <div className="pl-10">
              <h1 className="text-[#c5a572] text-3xl font-serif">Coffee Of The Day</h1>
              <p className="text-[#888888] text-[18px]">Architecto Mollitia, <br />Asperiores Earum.</p>
            </div>
      </div>

      <BookTable/>

      <Footer />
    </div>
  );
};

export default Menu;