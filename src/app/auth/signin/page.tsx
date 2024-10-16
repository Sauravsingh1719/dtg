"use client"

import { handleCredentialsSignin } from "@/app/actions/authActions";
import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

export default function SignIn() {

    const [ globalError, setGlobalError ] = useState<string>("")
    const form = useForm<z.infer<typeof signInSchema>> ({
        resolver: zodResolver(signInSchema),
        defaultValues :{
            email: '',
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
                const result = await handleCredentialsSignin(values)

        }catch (error) {
            console.log("An unexpected error occured. please try again.")
        }

    };
    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-black">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton pending={form.formState.isSubmitting}/>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


