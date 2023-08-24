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

export default function Sort() {
  const router = useRouter();
  let current;

  if (Cookies.get("sort")) {
    let tempCurrent = Cookies.get("sort");

    switch (tempCurrent) {
      case "date":
        current = "Relevantie";
        break;

      case "asc":
        current = "Prijs laag - hoog";
        break;
      case "desc":
        current = "Prijs hoog - laag";
        break;
      case "name":
        current = "Naam a - b";
        break;
      default:
        current = "Relevantie";
    }
  }

  function handleSelect(value) {
    Cookies.set("sort", value);
    router.refresh();
  }

  return (
    <div className="flex md:items-center -mt-5">
      <label htmlFor="SortBy" className="mr-2  hidden md:block">
        Sorteren op:
      </label>
      <Select onValueChange={(value) => handleSelect(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={current} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Relevantie</SelectItem>
          <SelectItem value="asc">Prijs laag - hoog</SelectItem>
          <SelectItem value="desc">Prijs hoog - laag</SelectItem>
          <SelectItem value="name">Naam a - b</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
