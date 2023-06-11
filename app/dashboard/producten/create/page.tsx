import Form from "./form";
import { supabase } from "../../../../lib/supabaseClient"

export type Categories = {
  id: string
  name: string
}

async function getCategories(): Promise<Categories[]> {
  const { data, error } = await supabase 
      .from('categories')
      .select('*')

  if (error) {
      throw error
  }

  return data as Categories[]
}


export default async function Page() {

  const categories = await getCategories()

  return (
    <div className="md:p-16 flex flex-col justify-center items-center">
      <div className=" shadow-sm  rounded-md bg-white p-10 w-2/3">
        <Form categories={categories} />
      </div>
    </div>
  );
}
