import React from 'react'
import Footer from '../componets/Footer'

import img1 from '../assets/img/blog/blogimg3.png'
import img2 from '../assets/img/blog/blogimg10.png'
import img3 from '../assets/img/blog/blogimg4.png'
import img4 from '../assets/img/blog/blogimg5.png'
import img5 from '../assets/img/blog/blogimg11.png'
import img6 from '../assets/img/blog/blogimg12.png'
import img7 from '../assets/img/blog/blogimg2.png'
import img8 from '../assets/img/blog/blogimg6.png'
import img9 from '../assets/img/blog/blogimg9.png'
import img10 from '../assets/img/blog/blogimg7.png'
import img11 from '../assets/img/blog/blogimg1.png'
import img12 from '../assets/img/blog/blogimg8.png'
import BlogCard from '../componets/BlogCard'

const Blog = () => {
  const data = [
    {img:img1,date:"21-04-2020 ~ Food", title:"Macarons vs. Macaroons: What'sthe Difference There?", description:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"},
    {img:img2,date: "21-04-2020 ~ Food",title: "Laboriosam voluptatem eligendi omnis impedit repudiandae",description:"Doloremque quibusdam ut qui dicta debitis. Accusantium sequi repellendus omnis consectetur."},
    {img:img3,date: "21-04-2020 ~ Food",title: "Animi quis repellat consequatur et et cumque et cupiditate sunt.",description:"Beatae error perspiciatis libero architecto ut eveniet. Pariatur doloremque provident ratione nesciunt.",},
    {img:img4,date: "21-04-2020 ~ Food",title: "Eum debitis harum voluptates ex voluptates excepturi.",description: "Maxime autem est aspernatur vero. Voluptate quam error ut et modi perferendis laudantium esse"},
    {img:img5,date: "21-04-2020 ~ Food",title: "Quam hic corrupti molestias quisquam fugiat sed.",description: "Necessitatibus quae praesentium illo quia similique error fuga autem non. Omnis consequatur voluptas doloribus"},
    {img:img6,date: "21-04-2020 ~ Food",title: "Neque sint aut quia et qui expedita in.",description: "Enim nostrum dolores. Facere porro ad eligendi fuga debitis id accusantium. Maxime provident nihil porro qui modi"},
    {img:img7,date: "21-04-2020 ~ Food",title: "Maiores laudantium molestiae quaerat aut ea saepe.",description: "Vel et nihil architecto laborum. Omnis et et dolorem officiis neque. Quo modi delectus ut iste aut. Voluptatum sunt"},
    {img:img8,date: "21-04-2020 ~ Food",title: "Magnam dolores hic error fugit qui aperiam voluptatibus",description: "Dolorem similique aliquid corrupti. Ab iure ipsum voluptate ea veniam. At consectetur fugit mollitia voluptatem"},
    {img:img9,date: "21-04-2020 ~ Food",title: "Molestiae aspernatur numquam.",description: "Possimus reprehenderit ullam consectetur sequi doloribus quos est ut. Atque minima in non voluptate"},
    {img:img10,date: "21-04-2020 ~ Food",title: "Aliquam sed voluptas harum tempora.",description: "Ipsa dolorem ab recusandae aspernatur ut. Eos aut molestiae consequuntur sit voluptatem"},
    {img:img11,date: "21-04-2020 ~ Food",title: "Et beatae ullam facilis aperiam corporis enim et autem omnis.",description: "Tempora non dolorem iusto deserunt hic. Ut quod est blanditiis qui expedita ut. Molestiae ut qui. Accusamus odit"},
    {img:img12,date: "21-04-2020 ~ Food",title: "Non doloremque sed provident quisquam voluptatem quia",description: "Qui magnam iste quibusdam. Voluptas porro optio ipsa ut nihil maxime. Iste omnis impedit quam necessitatibus"}
  ]
  return (
    <div>
      <div className="">
      <div
        className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) `,
        }}
      >
        <h1 className="text-[#c5a572] text-5xl font-serif text-extrabold">
          Our Blogs
        </h1>
        <p className="text-[#b9b8b8] text-md">Home/Blogs</p>
      </div>
      </div>

      <div className="px-25">
        <div className="mb-10">
          <ul className='flex justify-between w-[30vw] text-[19px] mt-20  '>
            <li className='hover:border-b-2'>All</li>
            <li className='hover:border-b-2'>Events</li>
            <li className='hover:border-b-2'>Achievement</li>
            <li className='hover:border-b-2'>Latest News</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
        {
          data.map((item,index)=>(
            <BlogCard
            key={index}
            img={item.img}
            date={item.date}
            title={item.title}
            description={item.description}
            />
          ))
        }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Blog