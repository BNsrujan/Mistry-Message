'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { signUpSchema } from "@/schemas/sighUpSchema";

export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debouncedUsername = useDebounceValue(username, 300);
    const router = useRouter();
    const { toast } = useToast();

    // const form 

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    return (
        <div>page</div>
    )

}