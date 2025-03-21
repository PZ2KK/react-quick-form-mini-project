import { useState } from "react";
import movies from "../data/moviesData";
import { TbMovie } from "react-icons/tb";
import { TbLocation } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { FiCheckCircle } from "react-icons/fi";

const MovieSurvey = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        movie: "",
        comments: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormData({ name: "", email: "", movie: "", comments: "" });
        setErrors({});
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (
            !formData.name 
            || (!formData.email ||!emailRegex.test(formData.email)) 
            || !formData.movie
        ) {
            setErrors({
                name: !formData.name ? "โปรดใส่ชื่อของคุณ" : "",
                email: !formData.email ? "โปรดใส่อีเมลของคุณ" : !emailRegex.test(formData.email) ? "รูปแบบอีเมลไม่ถูกต้อง" : "",
                movie: !formData.movie ? "กรุณาเลือกหนังที่คุณชอบ" : "",
            });
            return;
        }

        setSubmitted(true);
    };

  // ------------------------------------------------ Start here ------------------------------------------------
  return (
    <>
      {/* Main Box */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-6">
        <div className="w-[446px] bg-white shadow-xl rounded-b-xl">
          {/* Header */}
          <div className="flex items-center h-[79px] p-5 bg-gradient-to-r from-[#7E22CE] to-[#4F46E5]">
            <h1 className="flex items-center font-bold text-white text-2xl">
              <span className="pr-1">
                <TbMovie color="white" size="28px" />
              </span>
              Movie Survey
            </h1>
          </div>

          {submitted ? (
            // Success Form
            <div className="flex flex-col bg-white p-6">
              <div className="bg-green-50 rounded-md border border-green-200 p-4 mb-6">
                <p className="flex items-center gap-2 pb-3">
                  <FiCheckCircle color="green" size="20" />
                  <span className="text-lg text-green-800">
                    {" "}
                    ส่งแบบสำรวจสำเร็จ!{" "}
                  </span>
                </p>

                <div className="text-sm">
                    <p className="text-gray-500 pb-3 ">
                        <span className="pr-[160px]">ชื่อ:</span>
                        <span className=" text-black ml-auto">{formData.name}</span></p>
                    <p className="text-gray-500 pb-3 ">
                        <span className="pr-[148px]">อีเมล:</span>
                        <span className="text-black">{formData.email}</span></p>
                    <p className="text-gray-500 pb-3 ">
                        <span className="pr-[114px]">หนังที่เลือก:</span>
                        <span className="text-purple-600">{formData.movie}</span></p>
                    <p className={`text-gray-500 flex flex-col ${formData.comments ? "" : "hidden"}`}>
                        <hr className="border-gray-200 p-2" />
                        <span className="">ความคิดเห็น:</span>
                        <span className="text-black bg-gray-50 rounded-md h-auto items-center py-3 px-3 break-words">{formData.comments}</span></p>
                </div>
              </div>

              <button
                className="flex flex-row justify-center items-center min-h-10 cursor-pointer bg-black rounded-md"
                onClick={handleReset}
              >
                <TfiReload color="white" size="16px" />{" "}
                <span className="text-white ml-2">ทำแบบสำรวจใหม่</span>
              </button>
            </div>
          ) : (
            // Survey Form
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                {/* Name */}
                <label className="px-6 py-6">
                  <p className="pb-2 text-sm">
                    ชื่อ <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-md h-auto p-2 border 
                        ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="กรุณากรอกชื่อของคุณ"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm pt-3">{errors.name}</p>
                  )}
                </label>

                {/* Email */}
                <label className="px-6 pb-6">
                  <p className="pb-2 text-sm">
                    อีเมล <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md h-auto p-2 border 
                        ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm pt-3">{errors.email}</p>
                  )}
                </label>

                {/* Movie */}
                <div className="flex flex-col px-6 pb-6">
                  <p className="pb-3 text-sm">
                    เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
                  </p>
                  <div
                    className={`rounded-md
                        ${errors.movie ? "border border-red-500" : ""}`}
                  >
                    {movies.map((movie) => (
                      <label
                        className="flex gap-3 hover:bg-[#F1F5F9] rounded-md hover:cursor-pointer p-2"
                        key={movie.id}
                      >
                        <input
                          type="radio"
                          name="movie"
                          value={movie.title}
                          checked={formData.movie === movie.title}
                          onChange={handleChange}
                          className="accent-black w-4"
                        />

                        <div className="text-">
                          <p>
                            {movie.title} <span>({movie.year})</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Director: {movie.director}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.movie && (
                    <p className="text-red-500 text-sm pt-3">{errors.movie}</p>
                  )}
                </div>

                {/* Comments */}
                <div className="px-6 pb-6 text-sm">
                    <p className="pb-3">
                        ความคิดเห็นเกี่ยวกับหนัง
                    </p>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="border border-gray-200 w-full min-h-[100px] h-auto rounded-md pt-2 pl-2"
                    placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                  ></textarea>
                </div>

                {/* Footer */}
                <hr className="border-gray-200" />
                <div className="flex justify-between px-6 py-6">

                  <button
                    className="flex items-center cursor-pointer border border-gray-200 py-2 px-4 rounded-lg text-sm"
                    onClick={handleReset}>
                    <TfiReload color="black" size="14px" className="mr-2" />
                    รีเซ็ต
                  </button>

                  <button
                    className="flex items-center cursor-pointer border bg-gradient-to-r from-[#7E22CE] to-[#4F46E5] py-2 px-4 rounded-lg text-white text-sm"
                    type="submit">
                    <TbLocation color="white" size="18px" />
                    ส่งแบบสำรวจ
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieSurvey;