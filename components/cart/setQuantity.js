"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { AddCart, RemoveItem } from "../../components/addCart";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function SetQuantity({ quantity, products }) {
  const router = useRouter();

  function handleQuantity(id, oldQuantity, quantity) {
    let newQuantity;

    if (quantity < oldQuantity) {
      newQuantity = oldQuantity - quantity;

      //remove newQuantity amounts of id in cookie
      for (let i = 0; i < newQuantity; i++) {
        RemoveItem(id);
      }
    } else {
      newQuantity = quantity - oldQuantity;

      for (let i = 0; i < newQuantity; i++) {
        AddCart(id);
      }
    }
    router.refresh();
  }

  function deleteItem(id, quantity) {
    for (let i = 0; i < quantity; i++) {
      RemoveItem(id);
    }
    router.refresh();
  }

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="mb-5 flex gap-2 flex-row  border rounded border-gray-300 p-4"
        >
          <div className="mt-1.5 mr-7">
            <Image
              src={
                "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                product.imageURLs[0]
              }
              alt={product.title}
              height={110}
              width={110}
              loading="lazy"
              className="object-cover bg-center rounded w-32 h-20"
            />
          </div>
          <div className="md:pr-10 ">
            <Link href={`/product/${product.id}`}>
              <h1 className="text-2xl mb-1 hover:underline">{product.title}</h1>
            </Link>
            <p className="mb-1">{product.description}</p>
            <p className="text-lg font-semibold mb-1">
              € {product.price.toFixed(2)}{" "}
            </p>
            <div className="flex mt-5">
              <Select
                onValueChange={(value) =>
                  handleQuantity(product.id, quantity[product.id], value)
                }
              >
                <SelectTrigger className="w-min px-10 border-gray-800 mb-3 ">
                  <SelectValue placeholder={quantity[product.id]} />
                </SelectTrigger>
                <SelectContent>
                  {[...(Array(11) + 1)].map((x, i) => (
                    <SelectItem value={i} key={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="none"
                onClick={() => deleteItem(product.id, quantity[product.id])}
                className="mx-5 shadow-none"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}
