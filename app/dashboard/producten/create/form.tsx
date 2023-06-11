"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
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
import { use } from "react"



const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    category: z.string().optional(),
    imageURLs: z.string().url().optional(),

})

export default function ProfileForm({ categories }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",  
            price: 5,
            category: "",
            imageURLs: "", 
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                <Input placeholder="Prijs" {...field} />
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
                <Textarea placeholder="Beschrijving" {...field} />
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
                <Textarea placeholder="€" {...field} />
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
              <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageURLs"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Afbeeldingen (Comming soon)</FormLabel>
              <FormControl>
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
