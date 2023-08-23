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
        <div key={product.id} className="mb-5 flex gap-2 flex-col">
          <h1 className="text-2xl">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-lg font-semibold">€ {product.price.toFixed(2)} </p>
          <div className="flex">
            <Select
              onValueChange={(value) =>
                handleQuantity(product.id, quantity[product.id], value)
              }
            >
              <SelectTrigger className="w-min px-10 bg-gray-200 mb-3 ">
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
              variant="destructive"
              onClick={() => deleteItem(product.id, quantity[product.id])}
              className="mx-10"
            >
              Verwijderen
            </Button>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}
