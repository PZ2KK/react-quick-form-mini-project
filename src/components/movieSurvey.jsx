import { useState } from "react"
import movies from "../data/moviesData"
import { TbMovie } from "react-icons/tb";
import { TiLocationArrowOutline } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";

const MovieSurvey = () => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        movie:"",
        comment:"",
    })

    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name]:e.target.value})
    }

    return (
        <>
        {/* Main Box */}
        <div>
            {/* Header */}
            <div className="">
                <h1 className="flex"> <TbMovie color="white" size="25px"/> Movie Survey</h1>
            </div>

            {/* Form */}
            <form >
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
                            placeholder="กรุณากรอกชื่อของคุณ"/>
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
                            placeholder="example@email.com"/>
                    </label>

                    {/* Movie */}
                    <div className="flex flex-col">
                        <p>เลือกหนังที่คุณชอบ <span className="text-red-500">*</span></p>
                        {movies.map((movie) => (
                            <label key={movie.id}>
                                <input
                                    type="radio"
                                    name="movie"
                                    value={movie.title}
                                    checked={formData.movie === movie.title}
                                    onChange={handleChange}
                                />
                                {movie.title}
                            </label>
                        ))}
                    </div>
                    {/* Comment */}
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
                    <button className="flex cursor-pointer">
                        <TfiReload color="white" size="16px"/> รีเซ็ต
                    </button>
                    <button className="flex cursor-pointer" type="submit">
                            <TiLocationArrowOutline color="white" size="25px"/>ส่งแบบสำรวจ
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default MovieSurvey;