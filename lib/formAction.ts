"use server";

import { auth } from "@/auth";

export const formAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    try {
        console.log(name)
        console.log(subject)
        console.log(formData)
        // await fetch("http://localhost:3000/api/post", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({}),
        // });
    } catch(error) {
        console.log(error);
    }
}