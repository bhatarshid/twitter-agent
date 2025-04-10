'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaTwitter } from 'react-icons/fa'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(5)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({values});
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-center gap-2 w-3/5 p-5'>
        <div className='text-4xl flex flex-col items-center justify-center gap-2'>
          <FaTwitter className='text-blue-400'/>
          <h1 className='text-2xl font-bold'>Twitter Automation Bot</h1>
          <p className='text-gray-400 text-sm text-center text-wrap'>Please enter your X credentials.<br /> We will use these to automate your Twitter account. The credentials will not be saved or stored.</p>     
        </div>
      </div>
      <div className='w-3/5 text-xl backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl fade-in stagger-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-3/4 mx-auto'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
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
                    <Input placeholder='Password' type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='cursor-pointer hover:bg-white hover:text-black'>Submit</Button>
          </form>
        </Form>
      </div>   
    </div>
  )
}

export default Page