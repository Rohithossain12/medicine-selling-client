import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_API,
        import.meta.env.VITE_EMAIL_TEMPLATE_API,
        e.target,
        import.meta.env.VITE_PUBLIC_API_KEY
      )
      .then(
        (result) => {
          toast.success("Your message has been sent successfully!");
          console.log(result);
          formRef.current.reset();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };

  return (
    <div className="bg-blue-50 py-10 rounded-lg mb-10">
      <h1 className="text-xl lg:text-3xl md:text-2xl text-blue-600 font-bold mb-8 text-center">
        Contact Information
      </h1>
      <div className="container mx-auto rounded-lg p-8">
        <div className="space-y-6 lg:flex lg:space-x-8 lg:space-y-0 lg:justify-between">
          {/* Left Section: Contact Info */}
          <div className="lg:w-1/2 space-y-6">
            {/* Location */}
            <div className="flex items-center space-x-4">
              <MdLocationOn className="text-3xl text-red-500" />
              <div>
                <h2 className="text-xl font-semibold text-blue-600 ">
                  Location
                </h2>
                <p className="text-lg text-gray-800">
                  Pabna, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <MdEmail className="text-3xl text-yellow-500" />
              <div>
                <h2 className="text-xl text-blue-600 font-semibold">
                  Email Address
                </h2>
                <p className="text-lg text-gray-800 ">
                  You can reach me at my email :{" "}
                  <a href="mailto:rafidislamrohit576@gmail.com" className="">
                    rafidislamrohit576@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <MdPhone className="text-3xl text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  Phone Number
                </h2>
                <p className="text-lg text-gray-800">
                  Feel free to call me at :{" "}
                  <a href="tel:+8801646151022" className="">
                    +8801646151022
                  </a>
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-4">
              <FaWhatsapp className="text-3xl text-green-500" />
              <div>
                <h2 className="text-xl text-blue-600 font-semibold">
                  WhatsApp
                </h2>
                <p className="text-lg text-gray-800 ">
                  You can also message me on WhatsApp:{" "}
                  <a
                    href="https://wa.me/01761667914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    +8801761667914
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="input input-bordered text-gray-800 w-full mb-4"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="input input-bordered w-full mb-4 text-gray-800 "
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full mb-4 text-gray-800"
                required
              />
              <button
                type="submit"
                className="btn border-blue-600 text-blue-600 font-bold  hover:bg-blue-600 hover:text-white transition w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ContactUs;
