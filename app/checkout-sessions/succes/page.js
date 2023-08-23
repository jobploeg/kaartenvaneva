"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove("cart");

    router.refresh();
  }, []);

  return (
    <div className="flex justify-center pt-32 ">
      <h1 className="text-6xl">Betaling is geslaagd!</h1>
    </div>
  );
}
