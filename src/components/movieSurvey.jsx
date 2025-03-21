import { useState } from "react"
import movies from "../data/moviesData"
import { TbMovie } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { FiCheckCircle } from "react-icons/fi";

const MovieSurvey = () => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        movie:"",
        comments:"",
    })

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
        setErrors({...errors, [e.target.name]:""})
    }

    const handleReset = () => {
        setFormData({ name: "", email: "", movie: "", comments: "" });
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.name || !formData.email || !formData.movie) {
            setErrors({
              name: !formData.name ? "โปรดใส่ชื่อของคุณ" : "",
              email: !formData.email ? "โปรดใส่อีเมลของคุณ" : !emailRegex.test(formData.email) ? "รูปแบบอีเมลไม่ถูกต้อง": "",
              movie: !formData.movie ? "กรุณาเลือกหนังที่คุณชอบ" : "",
            });
            return;
        }

        setSubmitted(true);
    };

    return (
    <>
        {/* Main Box */}    
        <div className="flex flex-col items-center w-full pt-10">
            <div className="w-[446px]">
                {/* Header */}
                <div className="flex items-center h-[79px] p-5 bg-gradient-to-r from-[#7E22CE] to-[#4F46E5]">
                    <h1 className="flex font-bold text-white"> 
                        <TbMovie color="white" size="25px"/> 
                        Movie Survey
                    </h1>
                </div>

                {submitted ? (
                // Success Form
                    <div className="">
                        <p className="flex items-center gap-2">
                        <FiCheckCircle /> <span>ส่งแบบสำรวจสำเร็จ!</span>
                        </p>
                        <p>ชื่อ: {formData.name}</p>
                        <p>อีเมล: {formData.email}</p>
                        <p>หนังที่เลือก: {formData.movie}</p>
                        <p>ความคิดเห็น: {formData.comments}</p>
                        <button
                        className="cursor-pointer"
                        onClick={handleReset}
                        >
                        <TfiReload color="white" size="16px"/> <span>ทำแบบสำรวจใหม่</span>
                        </button>
                    </div>
                ) : (
                // Survey Form
                    <form onSubmit={handleSubmit}>
                        <div>
                            {/* Name */}
                            <label>
                                <p>ชื่อ <span className="text-red-500">*</span></p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border"
                                    placeholder="กรุณากรอกชื่อของคุณ"
                                    />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </label>

                            {/* Email */}
                            <label>
                                <p>Email <span className="text-red-500">*</span></p>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border"
                                    placeholder="example@email.com"
                                    />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </label>

                            {/* Movie */}
                            <div className="flex flex-col">
                                <p>เลือกหนังที่คุณชอบ <span className="text-red-500">*</span></p>
                                {movies.map((movie) => (
                                    <label className="flex gap-3 hover:bg-[#F1F5F9] rounded-md" key={movie.id}>
                                        <input
                                            type="radio"
                                            name="movie"
                                            value={movie.title}
                                            checked={formData.movie === movie.title}
                                            onChange={handleChange}
                                            />
                                        <div>
                                        <p>{movie.title} <span>({movie.year})</span></p> 
                                        <p className="text-gray-600">{movie.director}</p>
                                        </div>
                                    </label>
                                ))}
                                {errors.movie && <p className="text-red-500 text-sm">{errors.movie}</p>}
                            </div>

                            {/* Comments */}
                            <div>
                                <p>ความคิดเห็นเกี่ยวกับหนัง</p>
                                <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                className="border"
                                placeholder="พิมพ์ความคิดเห็นของคุณที่นี่...">
                                </textarea>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between">
                            <button 
                                className="flex cursor-pointer"
                                onClick={handleReset}>
                                    <TfiReload color="white" size="16px"/> รีเซ็ต
                            </button>
                            <button className="flex cursor-pointer" type="submit">
                                    <TiLocationArrowOutline color="white" size="25px"/>ส่งแบบสำรวจ
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </>
    );
};

export default MovieSurvey;