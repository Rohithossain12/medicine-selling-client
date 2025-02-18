import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CustomerTestimonials = () => {
  const [testimonials, setTestimonials] = useState();

  useEffect(() => {
    fetch("customerTestimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <div className="mt-10 mb-10 bg-blue-50 p-8 rounded-lg ">
      <h2 className="text-xl lg:text-3xl md:text-2xl font-bold text-center text-blue-600 mb-8">
        What Our Customers Say
      </h2>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        transitionTime={500}
        showStatus={false}
      >
        {testimonials?.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Profile Section */}
            <div className="flex items-center justify-center mb-6">
            <div>  <img
                src={testimonial?.image}
                alt={testimonial?.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
              /></div>
            </div>
            {/* Feedback */}
            <p className="text-gray-700 italic text-center mb-4">
              "{testimonial?.feedback}"
            </p>
            {/* Name & Location */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-blue-600">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial?.location}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomerTestimonials;
