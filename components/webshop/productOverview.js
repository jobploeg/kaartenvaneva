"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { AddCart } from "../addCart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "../../components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function ProductOverview({ products }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  function AddToCart(id) {
    for (let i = 0; i < quantity; i++) {
      AddCart(id);
    }
    router.refresh();
  }

  const product = products[0];
  console.log(product);

  const imageURLs = product.imageURLs;
  const imageLength = imageURLs.length;
  const [currentImage, setCurrentImage] = useState(imageURLs[0]);

  function createMarkup() {
    return {
      __html: product.description,
    };
  }

  return (
    <div className="md:flex md:mt-32 md:m-0 m-5">
      <div className="md:w-2/3">
        <Image
          src={
            "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
            currentImage
          }
          alt={product.title}
          width={450}
          height={600}
          key={currentImage}
          className="rounded object-cover shadow h-72"
        />
        <div className="flex">
          {imageURLs.map((imageURL) => {
            return (
              <Image
                src={
                  "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                  imageURL
                }
                alt={product.title}
                width={450}
                height={450}
                key={imageURL}
                className={`rounded object-cover h-32 w-32 mt-4 mr-4 shadow hover:cursor-pointer ${
                  imageURL === currentImage ? "border border-black" : ""
                }
                ${imageLength === 1 ? "hidden" : "block "}
                `}
                onClick={() => setCurrentImage(imageURL)}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex flex-col  md:gap-5 gap-3 md:w-2/3  md:mx-10">
        <div className="flex flex-row justify-between text-4xl font-medium mt-10 md:mt-0">
          <h1 className="">{product.title}</h1>
          <p className="text-2xl flex items-center">
            € {product.price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-row mt-10 justify-between">
          <Select onValueChange={(e) => setQuantity(e)}>
            <SelectTrigger className="w-min px-5  mr-2">
              <SelectValue placeholder={quantity} />
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
            variant="outline"
            className=" border-black hover:bg-transparent w-fit"
            onClick={() => AddToCart(product.id) + router.refresh()}
          >
            <ShoppingCart className=" h-4 w-4 mr-4" /> Toevoegen aan winkelwagen
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
        <div className="mt-10 flex flex-col gap-3">
          <p className="font-medium">Categorie</p>
          <Separator />
          <p>{product.categories.name}</p>
        </div>
      </div>
    </div>
  );
}
