// import { ChangeEvent, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import CreatePatientFormDialog from "@/components/CreatePatientFormDialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useDebouncedCallback } from "use-debounce";
// import {
//   Select,
//   SelectValue,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
// import {
// ArrowDown, ArrowUp,
// Search,
// X,
// } from "lucide-react";
function PatientsControlBox() {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const debounced = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value) {
  //     searchParams.set("search", e.target.value);
  //     setSearchParams(searchParams);
  //   } else {
  //     searchParams.delete("search");
  //     setSearchParams(searchParams);
  //   }
  // }, 500);
  // const sortFilter: "name-asc" | "name-dsc" | undefined =
  //   // prettier-ignore
  //   (searchParams.get("sort") === "name-asc") ||
  //   (searchParams.get("sort") === "name-dsc")
  //     ? searchParams.get("sort") as "name-asc" | "name-dsc"
  //     : undefined;

  return (
    <AnimatePresence initial={false} mode="wait">
      {
        // !isSearchOpen &&
        <motion.div
          key="controls"
          className="flex gap-2 "
          transition={{ duration: 0.5 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          {/* <Button
            onClick={() => {
              setIsSearchOpen(true);
            }}
            className="aspect-square p-2 rounded-full bg-white hover:bg-slate-300 text-gray-600"
          >
            <Search />
          </Button> */}
          {/* <Select
                value={sortFilter}
                onValueChange={(d) => {
                  searchParams.set("sort", d);
                  setSearchParams(searchParams);
                }}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">
                    <div className="flex justify-between gap-2 items-center">
                      Name <ArrowUp size={16} />
                    </div>
                  </SelectItem>
                  <SelectItem value="name-dsc">
                    <div className="flex justify-between gap-2 items-center">
                      Name <ArrowDown size={16} />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select> */}

          <CreatePatientFormDialog />
        </motion.div>
      }

      {/* {isSearchOpen && (
        <motion.div
          key={"search"}
          transition={{ duration: 0.5 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="relative p-0"
        >
          <label
            htmlFor="search"
            className="border rounded-md overflow-hidden flex items-center p-0"
          >
            <Input
              id="search"
              placeholder="Search"
              onChange={debounced}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
            />
          </label>

          <X
            size={16}
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-2 hover:text-red-600 cursor-pointer top-1/2 -translate-y-1/2"
          />
        </motion.div>
      )} */}
    </AnimatePresence>
  );
}

export default PatientsControlBox;
