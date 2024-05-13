import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreatePatientFormDialog from "@/components/CreatePatientFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
function PatientsControlBox() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounced = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
    if (!e.target.value) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, 350);

  return (
    <AnimatePresence initial={false} mode="wait">
      {!isSearchOpen && (
        <motion.div
          key="controls"
          className="flex gap-2 "
          transition={{ duration: 0.5 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          <Button
            onClick={() => {
              setIsSearchOpen(true);
            }}
            className="aspect-square p-2 rounded-full bg-white hover:bg-slate-300 text-gray-600"
          >
            <Search />
          </Button>

          <CreatePatientFormDialog />
        </motion.div>
      )}

      {isSearchOpen && (
        <motion.div
          key={"search"}
          transition={{ duration: 0.5 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="relative p-0 h-10"
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
      )}
    </AnimatePresence>
  );
}

export default PatientsControlBox;
