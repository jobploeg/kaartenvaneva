"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Filter({ categories }) {
  const router = useRouter();
  let current;

  if (Cookies.get("category")) {
    current = Cookies.get("category");
  }

  if (!current) {
    current = "Alle kaarten";
  }

  function handleSelect(value) {
    Cookies.set("category", value);
    router.refresh();
  }
  return (
    <div className="mb-5">
      <Select onValueChange={(value) => handleSelect(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={current} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Alle kaarten">Alle kaarten</SelectItem>

          {categories.map((category) => {
            return (
              <SelectItem
                value={category.name}
                key={category.id}
                onClick={() => {
                  localStorage.setItem("category", category.name);
                }}
              >
                {category.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
