"use client";

import { getProducts } from "@/lib/supabaseAPI";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Link
        href={`/dashboard/producten/create`}
        className="flex justify-end text-center rounded-t-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
      >
        Nieuw product
      </Link>
      <table className=" divide-y-2 divide-gray-200 bg-white border">
        <thead className="text-xl">
          <tr>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Naam
            </th>

            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
              Categorie
            </th>
            <th className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
              Prijs
            </th>
          </tr>
        </thead>

        <tbody className=" divide-gray-200 text-lg ">
          {products.map((product) => (
            <tr className="odd:bg-gray-100" key={product.id}>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                {product.title}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                {product.category}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                € {product.price}
              </td>
              <td class="whitespace-nowrap pl-20 px-4 py-2 ">
                <Link
                  href={`/dashboard/producten/${product.id}`}
                  className="inline-block rounded bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Bekijken
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
