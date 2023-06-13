import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import { supabase } from "../../../lib/supabaseClient"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
async function getData(): Promise<Products[]> {
  const { data, error } = await supabase 
    .from('products')
    .select('title, categories:categories (name), price, id')
  if (error) {
    toast.error("Er is iets misgegaan, probeer het later opnieuw")
    return []
  }

  return data  as Products[]
}

export default async function Page() {
  const data = await getData()

  console.log(data)
  return (
    <div className="mx-auto py-10 md:px-16">
      <div className="flex justify-between pb-10 md:-mt-2">
      <h1 className="text-4xl font-semibold">Producten</h1>
      <Button variant="default">
        <Link href="/dashboard/producten/create">
          Product toevoegen
        </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
      <ToastContainer />
      
    </div>
  );
}
