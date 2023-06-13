import Image from "next/image";
import Link from "next/link";
import ProductInfo from "./ProductInfo";

export default function ProductCard({ data }) {
  const datalength = data.length;

  //make three columns
  const col1 = [];
  const col2 = [];
  const col3 = [];
  const col4 = [];

  for (let i = 0; i < datalength; i++) {
    if (i % 4 === 0) {
      col1.push(data[i]);
    } else if (i % 4 === 1) {
      col2.push(data[i]);
    } else if (i % 4 === 2) {
      col3.push(data[i]);
    } else if (i % 4 === 3) {
      col4.push(data[i]);
    }
  }
  return (
    <div>
      <div className="md:block hidden ">
        <div className="flex ">
          <ProductInfo data={col1} />

          <ProductInfo data={col2} />

          <ProductInfo data={col3} />

          <ProductInfo data={col4} />
        </div>
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-fluid gap-10 h-fit ">Comming soon</div>
      </div>
    </div>
  );
}
