"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChangeEvent } from "react";
import { debounce } from "../lib/utils";

export default function Search({ placeholder }: { placeholder: string }) {
  const serachParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChangeHandler = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const params = new URLSearchParams(serachParams);
    if (val) {
      params.set("query", val);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log("Search input changed:", event.target.value);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={onChangeHandler}
        defaultValue={serachParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
