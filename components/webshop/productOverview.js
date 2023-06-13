import Image from "next/image";

export default function ProductOverview({ products }) {
  const product = products[0];
  const imageURLs = product.imageURLs;
  console.log(product);
  return (
    <div className="m-10 flex gap-2 flex-col w-1/2">
      <h1 className="text-2xl font-medium mb-3">{product.title}</h1>
      <p>{product.description}</p>
      <p>€ {product.price}</p>
      <p>{product.categories.name}</p>
      {imageURLs.map((imageURL) => {
        console.log(imageURL);
        return (
          <Image
            src={
              "https://izfokcthbvgcezxcusgh.supabase.co/storage/v1/object/public/images/" +
              imageURL
            }
            alt={product.title}
            width={200}
            height={200}
            key={imageURL}
          />
        );
      })}
    </div>
  );
}
