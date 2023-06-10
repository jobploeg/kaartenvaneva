import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import { supabase } from "../../../lib/supabaseClient"
 
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.

  const { data, error } = await supabase 
    .from('products')
    .select('*')
 
  if (error) {
    throw error
  }

  return data as Products[]
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
