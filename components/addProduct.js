"use client";
import { getCategories } from "@/lib/supabaseAPI";
import { useState, useEffect } from "react";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  return <div></div>;
}
