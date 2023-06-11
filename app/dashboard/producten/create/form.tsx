"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { supabase } from "../../../../lib/supabaseClient"
import { Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../../components/ui/select"
import { Button } from "../../../../components/ui/button"
import { Textarea } from "../../../../components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form"
import { Input } from "../../../../components/ui/input"
import { Key, useState } from "react"

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),    

    price: z.string().refine((val) => {
        return !isNaN(Number(val))
    }, "Price must be a number"),
})

export default function ProfileForm({ categories }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "", 
            price: "",
            category: "",  
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // save the form data to supabase
        const { data, error } = await supabase
            .from("products")
            .insert([
                {
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    category: values.category,
                },
            ])
        if (error) {
            throw error
        } else {
            form.reset()
        }
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Titel</FormLabel>
              <FormControl>
                <Input placeholder="Titel" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
         control={form.control}
         name="description"
         render={({ field }) => (
           <FormItem>
             <FormLabel >Beschrijving</FormLabel>
             <FormControl>
               <Textarea placeholder="Beschrijving"  required {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
        <FormField
         control={form.control}
         name="price"
         render={({ field }) => (
           <FormItem>
             <FormLabel >Prijs</FormLabel>
             <FormControl>
               <Input placeholder="€"  {...field} />
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
        <FormField
         control={form.control}
         name="category"
         render={({ field }) => (
           <FormItem>
             <FormLabel >Categorie</FormLabel>
             <FormControl>
             <Select onValueChange={field.onChange} {...field}>
               <SelectTrigger className="w-[180px]">
                   <SelectValue placeholder="Categorie" />
               </SelectTrigger>
               <SelectContent >
                   {categories.map((category: { id: Key; name: string }) => (
                       <SelectItem key={category.id} value={category.name} >{category.name} </SelectItem>
                   ))}
               </SelectContent>
               </Select>
             </FormControl>
             <FormMessage />
           </FormItem>
         )}
       />
         
        <Button type="submit">Toevoegen</Button>
      </form>
    </Form>
  )
}
