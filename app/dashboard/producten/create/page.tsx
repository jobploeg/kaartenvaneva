import Form from "./form";
import { supabase } from "../../../../lib/supabaseClient"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type Categories = {
  id: string
  name: string
}

async function getCategories(): Promise<Categories[]> {
  const { data, error } = await supabase 
      .from('categories')
      .select('*')

  if (error) {
      toast.error("Er is een probleem met het ophalen van de producten. Probeer het later opnieuw.")
  }

  return data as Categories[]
}


export default async function Page() {

  const categories = await getCategories()

  return (
    <div className="md:p-16 flex flex-col justify-center items-center mt-10 md:mt-0 ">
      <div className="md:w-3/4 bg-white p-10 rounded-md w-5/6">
        <Form categories={categories} />
      </div>
      <ToastContainer />

    </div>
  );
}
