import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import footerbg from "../assets/img/footerbg.png";
import { IoLocationOutline } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import Footer from "../componets/Footer";
import SEO from "../componets/SEO";
import { toast } from "../utils/toast";
import { contactSchema } from "../utils/validationSchemas";

// ─────────────────────────────────────────────────────────────
//  Contact Page  —  Zod + react-hook-form validation
// ─────────────────────────────────────────────────────────────

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", notes: "" },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      // TODO: wire up to your backend contact/email endpoint
      // e.g. await axios.post(`${API_BASE_URL}/contact`, data);
      await new Promise((r) => setTimeout(r, 800)); // simulate network
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Helper: shared input class with error state
  const inputClass = (fieldName) =>
    `border-b w-full py-2 outline-none transition-colors bg-transparent
     ${errors[fieldName] ? "border-red-500" : "border-gray-400 focus:border-[#c5a572]"}`;

  return (
    <div>
      <SEO
        title="Contact Us"
        description="Get in touch with Coffee Shop for inquiries, table reservations, feedback, and location details."
      />

      {/* ===== Hero Banner ===== */}
      <div
        className="
          w-full h-64 sm:h-80 md:h-96 lg:h-100
          bg-cover bg-center
          flex flex-col justify-center items-center gap-2 sm:gap-3 px-4
        "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55), rgb(16, 29, 40,0.90)), url(${footerbg})`,
        }}
      >
        <h1 className="text-[#c5a572] text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-center">
          Contact Us
        </h1>
        <p className="text-[#b9b8b8] text-sm sm:text-base md:text-md">
          Home / Contact
        </p>
      </div>

      {/* ===== Contact Info + Map ===== */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-25">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-25 mt-16 sm:mt-20 lg:mt-30 mb-16 sm:mb-20 lg:mb-25">
          {/* Left: Contact Info */}
          <div className="w-full lg:w-auto">
            <div className="flex flex-col gap-3 sm:gap-5">
              <h1 className="text-[#c5a572] font-sans tracking-wide">CONTACT US</h1>
              <h2 className="text-3xl sm:text-4xl font-serif">Get In Touch</h2>
            </div>

            <div className="text-[#6f6f6f] text-base sm:text-lg md:text-xl flex flex-col gap-4 sm:gap-5 mt-8 sm:mt-12 lg:mt-15">
              <p className="flex items-start gap-4 sm:gap-5">
                <IoLocationOutline className="text-xl sm:text-2xl shrink-0 mt-1" />
                <span>
                  2839 Old Dear Lane New York,
                  <br />
                  NY 10013 United States
                </span>
              </p>

              <h1 className="flex items-center gap-4 sm:gap-5">
                <BiPhoneCall className="text-xl sm:text-2xl shrink-0" />
                + (0712) 819 79 555
              </h1>

              <p className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
                <MdOutlineEmail className="text-xl sm:text-2xl shrink-0" />
                info@havnor.com
              </p>

              <p className="border-t border-gray-500 w-full max-w-xs lg:w-[25vw]"></p>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-xl sm:text-2xl text-black mb-1 sm:mb-2">
                  Opening Hours
                </p>
                <h1 className="text-sm sm:text-base">Mon - Fri 09:00 AM - 08:00 PM</h1>
                <h1 className="text-sm sm:text-base">Sat - Sun 09:00 AM - 05:00 PM</h1>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="w-full lg:w-[50vw]">
            <section className="w-full">
              <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-md">
                <iframe
                  title="Our Location"
                  src="https://maps.google.com/maps?q=Cheyenne%2C%20Wyoming&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  className="block w-full h-75 sm:h-100 lg:h-125"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ===== Contact Form Section ===== */}
      <div className="bg-[#f4eee4] w-full py-12 sm:py-16 lg:py-20 flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col justify-center items-center gap-3 px-4">
          <p className="text-[#c5a572] font-sans text-xl sm:text-2xl md:text-3xl tracking-wide">
            SEND A MESSAGE
          </p>
          <h2 className="font-serif text-center text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            Do you have anything in your mind to tell us? Please don't hesitate
            to get in touch with us via our contact form.
          </h2>
        </div>

        <div className="flex justify-center px-4 sm:px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6 sm:gap-8 w-full max-w-4xl"
          >
            {/* Name + Email */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <input
                  {...register("name")}
                  className={inputClass("name")}
                  type="text"
                  placeholder="Name*"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <input
                  {...register("email")}
                  className={inputClass("email")}
                  type="email"
                  placeholder="E-mail*"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone + Subject */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <input
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                    },
                  })}
                  maxLength={10}
                  inputMode="numeric"
                  className={inputClass("phone")}
                  type="tel"
                  placeholder="Phone (10 digits)*"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <input
                  {...register("subject")}
                  className={inputClass("subject")}
                  type="text"
                  placeholder="Subject*"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs">{errors.subject.message}</p>
                )}
              </div>
            </div>

            {/* Notes + Button */}
            <div className="flex flex-col gap-6 sm:gap-8 items-center">
              <input
                {...register("notes")}
                className={inputClass("notes")}
                type="text"
                placeholder="Notes (optional)"
              />
              <button
                type="submit"
                disabled={loading}
                className="
                  border text-base sm:text-lg
                  w-full sm:w-40
                  px-4 py-3
                  border-[#121D27] bg-[#121D27] text-white
                  hover:bg-white hover:text-[#121D27]
                  transition-all duration-300
                  cursor-pointer
                  disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
