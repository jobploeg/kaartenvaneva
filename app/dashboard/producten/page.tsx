import { Products, columns } from "./columns"
import { DataTable } from "./data-table"
import { supabase } from "../../../lib/supabaseClient"
 
async function getData(): Promise<Products[]> {
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
    <div className="mx-auto py-10 md:px-16">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
