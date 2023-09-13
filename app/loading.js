import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex mt-32 justify-center h-screen">
      <div className="text-center">
        <Loader className="mt-20 h-16 w-16 animate-spin text-[#e85a4f]" />
      </div>
    </div>
  );
}
