"use client";
import Image from "next/image";
import Link from "next/link";

export default function ImageView({ data }) {
  return (
    <ul className="grid grid-4 md:grid-4 flex-row gap-6 h-fit mr-6">
      {data.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`}>
            <Image
              src={
                "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
                product.imageURLs[0]
              }
              alt={product.title}
              height={300}
              width={300}
              className=" rounded w-auto  object-fill shadow-lg"
            />

            <div>
              <h3>{product.title}</h3>

              <p>
                <span className="sr-only"> Prijs </span>

                <span>€ {product.price}</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
