'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaTwitter } from 'react-icons/fa'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
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
    setLoading(true);
    navigation.push('/logs');
    axios.post('/api/run', values);
    setLoading(false);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-center gap-2 w-4/5 sm:w-3/5 p-5'>
        <div className='text-4xl flex flex-col items-center justify-center gap-2'>
          <FaTwitter className='text-blue-400'/>
          <h1 className='text-lg sm:text-2xl font-bold'>Twitter Automation Bot</h1>
          <p className='text-gray-400 text-[11px] sm:text-sm text-center text-wrap'>Please enter your X credentials.<br /> We will use these to automate your Twitter account. The credentials will not be saved or stored.</p>     
        </div>
      </div>
      <div className='w-4/5 sm:w-3/5 bg-[#1a1d26] text-xl backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl fade-in stagger-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 sm:w-3/4 mx-auto'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' className='w-full' {...field} />
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
            <Button 
              type="submit" 
              className='w-full cursor-pointer hover:bg-blue-700 bg-blue-600' 
              disabled={loading}
            >
              {loading ? <Loader className='animate-spin' /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>   
    </div>
  )
}

export default Page