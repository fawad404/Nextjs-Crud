"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdTopic(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if(!title || !description){
            alert("title and description is required");
            return;
        }

        try{
            const res = await fetch(`${apiUrl}/api/topics`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description }),
            });

            if(res.ok){
                router.push('/');
            }else{
                throw new Error("Failed to create a topics");
            }
        }catch(err){
            console.log(err);
        }
    };
    return(
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-3">
        <input 
        onChange={(e) =>setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2" 
        type="text" 
        placeholder="Topic Title" />

<input 
    onChange={(e) =>setDescription(e.target.value)}
    value={description}
        className="border border-slate-500 px-8 py-2" 
        type="text" 
        placeholder="Topic Description" />

        <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Add Topic</button>
        </form>
    )
}
