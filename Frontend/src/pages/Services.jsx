import React from "react";
import ServicePage1 from "../componets/ServicePage1";
import ServicePage2 from "../componets/ServicePage2";
import icon1 from "../assets/img/services/wedding-rings.svg";
import titleIcon from "../assets/img/services/commonicon.svg";
import img1 from "../assets/img/services/ser1.png";
import icon3 from "../assets/img/services/birthday-cakeicon.svg";
import icon2 from "../assets/img/services/restauranticon.svg";
import img2 from "../assets/img/services/ser2.png";
import img3 from "../assets/img/services/ser3.png";
import img4 from "../assets/img/services/ser4.png";
import icon4 from "../assets/img/services/bar.svg";
import icon6 from "../assets/img/services/outline.svg";
import img6 from "../assets/img/services/ser6.png";
import img5 from "../assets/img/services/ser5.png";
import icon5 from "../assets/img/services/cheersicon.svg";
import BookTable from "../componets/BookTable";
import Footer from "../componets/Footer";

const Services = () => {
  const data1 = [
    {
      icon: icon1,
      title: "Wedding Events",
      titleIcon: titleIcon,
      description:
        "Explicabo laborum facilis cupiditate sunt ducimus cupiditate quos. Quia ad vel et qui voluptas praesentium. Rerum eos cum. Sit quia quasi distinctio repellat in pariatur sit. Minus consequuntur atque voluptatem temporibus et qui optio commodi. Est non natus accusantium aperiam est deleniti.",
      img: img1,
    },
  ];
  const data2 = [
    {
      icon: icon2,
      title: "Holiday Parties",
      titleIcon: titleIcon,
      description:
        "Consequatur necessitatibus fugit sint. Facere aut aut commodi aut. Laudantium enim facere repellendus quod amet. Blanditiis et doloribus modi dolor voluptatibus ea.Autem tempora aut sint non. Fuga magni cupiditate porro aperiam eaque autem porro. Ut facilis animi. Voluptates repudiandae dolorum.",
      img: img2,
    },
  ];
  const data3 = [
    {
      icon: icon3,
      title: "Birthday Parties",
      titleIcon: titleIcon,
      description:
        "Unde sapiente aut molestias est voluptate autem molestiae blanditiis ullam. Quas non at qui est beatae omnis aliquam non iure. Neque qui soluta itaque nostrum vitae aut unde. Sit voluptate sapiente saepe rerum. Molestiae aspernatur deleniti modi vitae. At molestiae expedita nesciunt placeat magni atque",
      img: img3,
    },
  ];
  const data4 = [
    {
      icon: icon4,
      title: "",
      titleIcon: titleIcon,
      description:
        "Nostrum voluptas illo iusto ut. Et dolor ab sit earum ut. Quo et sapiente non voluptatem est facere et dicta. Esse modi libero saepe id et et. Voluptates unde nihil error ducimus excepturi placeat sunt. Et eaque excepturi ullam deserunt voluptatum non iusto nemo. Et delectus voluptatem modi quas totam.",
      img: img4,
    },
  ];
  const data5 = [
    {
      icon: icon5,
      title: "Corporate Events",
      titleIcon: titleIcon,
      description:
        "Officiis rerum aliquam rem. Minus sed omnis sed suscipit. Voluptatum natus aut minus qui id est et corporis maxime. Nihil est beatae dolorem qui similique. Sapiente quo non quis ducimus est.Quia consequuntur ullam. Commodi officia facilis iure. Molestiae vel dolore enim. Sequi et ea libero pariatur architecto ex.",
      img: img5,
    },
  ];
  const data6 = [
    {
      icon: icon6,
      title: "Private Party",
      titleIcon: titleIcon,
      description:
        "Nulla nihil magni sed iste unde nam id. Aut nesciunt deserunt eveniet in et similique laudantium eos amet. Neque minus autem nulla. Dolor voluptates recusandae voluptatum. Quos quos voluptas.Enim dolorem illo non magnam quia saepe quos dolor. Suscipit iste quasi. Unde non eum ea culpa nulla voluptatibus dolores et",
      img: img6,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <div
        className="w-full h-64 sm:h-72 md:h-80 lg:h-[400px] bg-cover bg-center flex flex-col justify-center items-center gap-2 sm:gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 29, 40, 0.55), rgba(16, 29, 40, 0.90)), url(../src/assets/img/footerbg.png)`,
        }}
      >
        <h1 className="text-[#c5a572] text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-center">
          Our Services
        </h1>
        <p className="text-[#b9b8b8] text-sm sm:text-base">Home / Services</p>
      </div>

      {/* ================= INTRO SECTION ================= */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mt-12 sm:mt-16 md:mt-20 mb-10 sm:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="text-[#c5a572] font-sans text-sm sm:text-base tracking-wider">
              OUR SERVICES
            </h1>
            <h2 className="text-3xl sm:text-4xl font-serif">We Hold Events</h2>
          </div>
          <div className="text-gray-600 max-w-xl text-sm sm:text-base leading-relaxed">
            <p>
              Iste sed saepe animi magnam voluptatibus voluptatibus natus
              quaerat. Sit sunt id rem. Doloribus et quam et tempora veritatis
              praesentium vero. Tempora repudiandae quia
            </p>
          </div>
        </div>
      </div>

      {/* ================= SERVICE BLOCKS ================= */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 space-y-0">
        {data1.map((item, index) => (
          <ServicePage1
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}

        {data2.map((item, index) => (
          <ServicePage2
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}

        {data3.map((item, index) => (
          <ServicePage1
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}

        {data4.map((item, index) => (
          <ServicePage2
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}

        {data5.map((item, index) => (
          <ServicePage1
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}

        {data6.map((item, index) => (
          <ServicePage2
            key={index}
            icon={item.icon}
            title={item.title}
            titleIcon={item.titleIcon}
            description={item.description}
            img={item.img}
          />
        ))}
      </div>

      {/* ================= CTA BANNER ================= */}
      <div
        className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-cover bg-center flex flex-col justify-center items-center gap-5 sm:gap-6 mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(16, 29, 40, 0.75), rgba(16, 29, 40, 0.75)), url(../src/assets/img/services/servicesbg.png)`,
        }}
      >
        <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[30px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 text-white text-center leading-relaxed max-w-5xl">
          With A Full Range Of Event Management Service And Super Menu, Our
          Client Achieve{" "}
          <span className="text-[#c5a572] font-serif">Successful</span> And
          Prosperous Events!
        </p>
        <button className="border border-white text-white px-6 py-2.5 text-base sm:text-lg md:text-xl hover:bg-white hover:text-[#101d28] transition-all duration-300">
          Read More
        </button>
      </div>

      {/* ================= HAPPY MOMENTS ================= */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-16 sm:pb-20">
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <h1 className="text-[#c5a572] font-sans text-sm sm:text-base tracking-wider">
            TAKE A TOUR
          </h1>
          <h1 className="text-3xl sm:text-4xl font-serif text-center">
            Our Happy Moments
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <img
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
            src="../src/assets/img/services/sg2.png"
            alt="Happy moment 1"
          />
          <img
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
            src="../src/assets/img/services/sg1.png"
            alt="Happy moment 2"
          />
          <img
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
            src="../src/assets/img/services/sg3.png"
            alt="Happy moment 3"
          />
          <img
            className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
            src="../src/assets/img/services/sg4.png"
            alt="Happy moment 4"
          />
        </div>
      </div>

      <BookTable />
      <Footer />
    </div>
  );
};

export default Services;