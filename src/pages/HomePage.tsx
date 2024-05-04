import CreatePatientFormDialog from "@/components/CreatePatientFormDialog";
import PatientCard from "@/components/PatientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, Search, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounced = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set("search", e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, 500);
  const sortFilter: "name-asc" | "name-dsc" | undefined =
    // prettier-ignore
    (searchParams.get("sort") === "name-asc") ||
    (searchParams.get("sort") === "name-dsc")
      ? searchParams.get("sort") as "name-asc" | "name-dsc"
      : undefined;

  return (
    <div className="mt-10 space-y-4">
      <div className="flex justify-between gap-10 items-center flex-wrap overflow-hidden">
        <h1 className="lg:text-5xl md:text-4xl sm:text-2xl text-xl font-bold text-xl">
          Patients
        </h1>
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
                onClick={() => setIsSearchOpen(true)}
                className="aspect-square p-2 rounded-full bg-white hover:bg-slate-300 text-gray-600"
              >
                <Search />
              </Button>
              <Select
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
              </Select>

              <CreatePatientFormDialog />
            </motion.div>
          )}
          {isSearchOpen && (
            <motion.label
              key={"search"}
              transition={{ duration: 0.5 }}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              htmlFor="search"
              className="border rounded-md overflow-hidden flex relative items-center"
            >
              <Input
                id="search"
                placeholder="Search"
                onChange={debounced}
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <X
                size={16}
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 hover:text-red-600 cursor-pointer top-1/2 -translate-y-1/2"
              />
            </motion.label>
          )}
        </AnimatePresence>
      </div>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 py-3">
        {/* Patients Container  */}
        {Array.from({ length: 100 }, (_, i) => (
          <PatientCard key={i} />
        ))}
      </section>
    </div>
  );
}
