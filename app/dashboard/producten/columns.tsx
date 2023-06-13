"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Link from "next/link"

import { Button } from "../../../components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string
  title: string,
  categories: any,
  price: number,
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-1"
        >
          Titel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3">
        <Link href={`/dashboard/producten/${row.original.id}`}>
          <p className="hover:font-medium">{row.original.title}</p>
        </Link>
        </div>
      )
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Categorie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3">
        <Link href={`/dashboard/producten/${row.original.id}`}>
          <p className="hover:font-medium">{row.original.categories.name}</p>
        </Link>
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"

        >
          Prijs
          <ArrowUpDown className="ml-2 h-4 w-4" />
          
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
 
      return <div>
        <Link href={`/dashboard/producten/${row.original.id}`}>
          <p className="hover:font-medium">{formatted}</p>
        </Link></div>
    },

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id
 
      return (
        <div className="text-right pr-3 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-right shadow-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-right" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opties</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/dashboard/producten/${productId}`}>
                  bekijken
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/producten/${productId}/edit`}>
                Bewerken
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Verwijderen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }

]
