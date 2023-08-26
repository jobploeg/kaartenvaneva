"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      Cookies.remove("cart");

      router.refresh();
    }
  }, [router, searchParams]);

  if (searchParams.get("canceled")) {
    return (
      <div className="flex justify-center pt-32 ">
        <h1 className="text-5xl">
          Je bestelling is niet gelukt,
          <br /> probeer het later opnieuw
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-32 ">
      <h1 className="text-6xl">Betaling is geslaagd!</h1>
    </div>
  );
}
