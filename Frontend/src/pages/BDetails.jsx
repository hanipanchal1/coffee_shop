import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Footer from '../componets/Footer';
const BDetails = () => {
  return (
    <div>
      <div
        className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) `,
        }}
      >
        <h1 className="text-[#c5a572] text-5xl font-serif text-extrabold">Blogs Details</h1>
        <p className="text-[#b9b8b8] text-md">Home / Blogs / Blog Details</p>
      </div>

      <div className="px-25 mt-20">
      <div className="flex gap-10">
        <div className="">
          <img className='w-[55vw] h-[60vh]' src="../src/assets/img/B1.png" alt="error" />

          <div className="flex flex-col gap-5 mt-10 w-[55vw]">
            <h1 className='font-sans text-[#c5a572] text-[18px]'>21-04-2020 ~ Food</h1>
            <h2 className="font-serif text-3xl">Macarons vs. Macaroons: What's the Difference There?</h2>
            <p className="font-sans text-[20px] text-gray-600">Aut sit est est. Tenetur ad reiciendis veniam omnis eligendi porro illo natus. Quae vitae unde beatae et rem. Hic autem voluptas nisi est dolore hic autem sapiente.Deleniti odit iusto consequatur perferendis distinctio velit. Delectus non aperiam rerum molestiae iure ratione totam totam dolores. Ipsam explicabo perferendis. Facere aperiam accusantium aliquid asperiores sunt cumque eos inventore.Amet omnis dolore quo expedita. Veniam soluta esse magnam rerum doloribus numquam. Qui eveniet quam sint explicabo tempora quisquam aspernatur. Quia rerum ipsam sed aut itaque expedita recusandae numquam quaerat. Voluptatem aliquam id odit deleniti et. Aliquam et excepturi dolores quo.Ipsum sint ullam quidem omnis aut debitis velit. Rerum voluptas esse et nobis quis saepe iste. Debitis eligendi repellendus similique laborum. Ab nam dignissimos beatae.Magnam at unde eos nostrum quibusdam eius. Modi nobis voluptatem libero incidunt possimus rerum aut enim nulla. Tempore maxime quaerat. Dolor accusantium et sunt sit optio praesentium quae voluptatem.</p>
            <h2 className="font-serif text-3xl">Nam libero tempore, cum soluta eligendi optio</h2>
            <p className="font-sans text-[20px] text-gray-600">Eaque aut odio expedita. Accusantium a dignissimos officiis. Aspernatur a vel. Maxime ea occaecati ab nobis. Quo ex non vitae voluptate temporibus sed qui. Sed distinctio molestiae eveniet in dolor consequuntur quod debitis magni.Error qui eum animi autem quos ipsam nihil. Id possimus ipsam quis. Quo sed nemo aut perspiciatis voluptas nam optio. Maiores beatae officiis vel molestias esse cumque veniam consequuntur incididunt.</p>
          </div>
          <div className="flex w-[55vw] items-center justify-center gap-10 py-12">
            <img className='w-[26vw] h-[54vh] bg-cover bg-center' src="../src/assets/img/blog/blogimg6.png" alt="error" />
            <img className='w-[26vw] h-[54vh] bg-cover bg-center' src="../src/assets/img/blog/blogimg8.png" alt="error" />
          </div>
          <div className="w-[55vw]">
            <p className="font-sans text-[20px] text-gray-600">Aut rem rerum at fugiat. Dolores numquam ipsam corporis. Enim et fugit eligendi. Blanditiis harum non eaque aspernatur. Mollitia et distinctio voluptatem error hic numquam ea sunt aut. Pariatur non similique et.Et iure enim dolore. Aspernatur soluta neque mollitia quia accusantium provident non explicabo quia. Praesentium et odit commodi dolores possimus quisquam expedita ipsum.Voluptas vel vero officia alias ut. Assumenda nihil est consequatur nesciunt cupiditate eum in libero dolor. Soluta odio voluptatem dolores molestiae dolorem nesciunt. Aspernatur similique repellendus beatae.Repellendus recusandae voluptate reiciendis sequi alias eos. Quasi enim ratione voluptates a unde sint provident eveniet omnis. Esse illo qui aut alias hic enim.</p>
          </div>

          <div className="border flex gap-7 border-[#c5a572] px-10 py-10">
            <div className="">
              <img className='w-40 h-35 bg-center bg-cover ' src="../src/assets/img/team3.png" alt="error" />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className='text-3xl font-serif'>Emilie D'Amore</h1>
              <p className='text-[#646464] text-[18px]'>Praesentium et odit commodi dolores possimus <br />quisquam expedita ipsum.Voluptas vel vero oficia alias</p>
              <p className='text-xl flex gap-3'>
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
                <FaTwitter />
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            <p className='text-5xl font-serif mb-10'>2 Comments</p>
            <div className="bg-[#faf7f2] px-15 flex flex-col gap-3 py-5">
              <h1 className='text-4xl font-serif'>Emilie D'Amore</h1>
              <h1 className='text-[#646464] text-[14px]'>21-04-2020 at 03:00 PM</h1>
              <p className='text-[#646464] text-[18px]'>Praesentium et odit commodi dolores possimus quisquam <br />expedita ipsum.Voluptas vel vero oficia alias ut.</p>
            </div>
            <div className="ml-10 w-[55vw]">
            <div className="bg-[#faf7f2] px-15 flex flex-col gap-3 py-5">
              <h1 className='text-4xl font-serif'>Katheryn Kerluke</h1>
              <h1 className='text-[#646464] text-[14px]'>21-04-2020 at 03:00 PM</h1>
              <p className='text-[#646464] text-[18px]'>Sed quo quod aut saepe. Occaecati nobis sit et quia quia impedit debitis culpa. Modi ab omnis nulla.</p>
            </div>
            </div>
          </div>

          <div className="mt-25">
            <div className="">
              <h1 className='text-4xl font-serif'>Leave a Reply</h1>
              <p className='text-[#646464] text-[18px]'>Your email address will not be published.</p>
            </div>
            <div className="py-10">
              <form action="Comments">
                <input type="text" className='w-[55vw] text-xl py-3 border-b border-[#c7c4c4] outline-none'  placeholder='Comments'/>
                <div className="flex gap-10">
                  <input type="text" className='w-[26vw] text-xl py-3 border-b border-[#c7c4c4] outline-none' placeholder='Name*'/>
                  <input type="text" className='w-[26vw] text-xl py-3 border-b border-[#c7c4c4] outline-none' placeholder='E-mail*'/>
                </div>
          <button className="border text-zxl w-35 px-3 py-2 mt-10 border-[#121D27] bg-[#121D27] text-[white] hover:bg-[white] hover:text-[#121D27] transition-all duration-300">Post Comments</button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-80">
          <p className='text-xl font-bold'>Search</p>
          <div className=" flex border-2 border-[#a7a4a4] p-2 justify-between items-center px-5">
            <input type="text" className='' placeholder='Search here.... ' /> <IoSearchOutline />
          </div>
          <p className='text-xl mt-3 font-bold'>Categories</p>
          <div className="flex items-center">
            <select className='' name="category" id="category"></select>
            <p className='border-b w-80 px-3 py-2 text-[19px] border-[#9ca0a4]'>American Food</p>
          </div>
          <div className="flex items-center">
            <select className='' name="category" id="category"></select>
            <p className='border-b w-80 px-3 py-2 text-[19px] border-[#9ca0a4]'>Asian Food</p>
          </div>
          <div className="flex items-center">
            <select className='' name="category" id="category"></select>
            <p className='border-b px-3 w-80 py-2 text-[19px] border-[#9ca0a4]'>Mexican Food</p>
          </div>
          <div className="flex items-center">
            <select className='' name="category" id="category"></select>
            <p className='border-b w-80 px-3 py-2 text-[19px] border-[#9ca0a4]'>Birthday Events</p>
          </div>
          <div className="flex items-center">
            <select className='' name="category" id="category"></select>
            <p className='border-b w-80 px-3 py-2 text-[19px] border-[#9ca0a4]'>Wedding Events</p>
          </div>

          <div className="py-10">
            <p className='text-xl font-bold'>Recent Post</p>
            <div className="flex gap-5 py-6 border-b-2 border-[#c1c1c1]">
              <div className="">
                <img className='w-30' src="../src/assets/img/blog_details/bd2.png" alt="error" />
              </div>
              <div className="text-[19px] ">
                <p className='font-sans'>Healthy Cooking Is A <br />Must For</p>
                <h1 className='text-[#929292] font-sans'>17th Jan 2020</h1>
              </div>
            </div>
            <div className="flex gap-5 py-6 border-b-2 border-[#c1c1c1]">
              <div className="">
                <img className='w-30' src="../src/assets/img/blog_details/bd4.png" alt="error" />
              </div>
              <div className="text-[19px] ">
                <p className='font-sans'>Gourmet Cooking For<br />Pleasure</p>
                <h1 className='text-[#929292] font-sans'>15th Jan 2020</h1>
              </div>
            </div>
            <div className="flex gap-5 py-6 border-b-2 border-[#c1c1c1]">
              <div className="">
                <img className='w-30' src="../src/assets/img/blog_details/bd3.png" alt="error" />
              </div>
              <div className="text-[19px] ">
                <p className='font-sans'>How To Cook With Fresh <br />Herbs</p>
                <h1 className='text-[#929292] font-sans'>08th Jan 2020</h1>
              </div>
            </div>
            <div className="flex gap-5 py-6">
              <div className="">
                <img className='w-30' src="../src/assets/img/blog_details/bd1.png" alt="error" />
              </div>
              <div className="text-[19px] ">
                <p className='font-sans'>Cooking With The Power <br />Of The</p>
                <h1 className='text-[#929292] font-sans'>01th Jan 2020</h1>
              </div>
            </div>
          </div>
          <div className="">
            <p className='text-xl font-bold '>Share Blog</p>
            <p className='flex gap-5 text-2xl mt-7'>
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
                <FaTwitter />
            </p>
          </div>
        </div>
      </div>
        </div>

        <Footer/>
    </div>
  )
}

export default BDetails