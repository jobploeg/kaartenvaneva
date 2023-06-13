import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function Sort() {
  return (
    <div className="flex justify-center items-center">
      <label htmlFor="SortBy" className="mr-2">
        Sorteren op:{" "}
      </label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Relevantie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="titleAsc ">Relevantie</SelectItem>
          <SelectItem value="asc">Prijs laag - hoog</SelectItem>
          <SelectItem value="desc">Prijs hoog - laag</SelectItem>
          <SelectItem value="Populair ">Meest Populair</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
