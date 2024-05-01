import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
    url: z.string().url(),
});

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });
    const [outUrl, setOutUrl] = useState("");

    const onSubmit = (data) => {
        axios
            .post(
                "https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten",
                {
                    url: data.url,
                }
            )
            .then(function (response) {
                console.log(response);
                setOutUrl(response.data.result_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col px-[30%] py-10">
                <div className="flex flex-col mb-6">
                    <div className="mb-3">Input URL:</div>
                    <input
                        {...register("url")}
                        type="text"
                        placeholder="https://www.example.com/"
                        className="border-2"
                    />
                    {errors.url && (
                        <div className="text-red-600 ml-2 mt-2">
                            Wrong format of URL
                        </div>
                    )}
                </div>
                <div className="flex flex-col mb-6">
                    <div className="mb-3">Output URL:</div>
                    <input
                        readOnly
                        type="text"
                        className="border-2"
                        value={outUrl}
                    />
                </div>
                <button
                    type="Submit"
                    className="border-2 h-10 w-[140px] hover:bg-slate-100"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default App;
