"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string
  title: string,
  category: string,
  price: number,
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "category",
    header: "Categorie",
  },
  {
    accessorKey: "price",
    header: "Prijs",
  },

]
