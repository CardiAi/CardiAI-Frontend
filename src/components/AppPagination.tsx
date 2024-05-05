import { IPatientsMeta } from "@/Interfaces";
import { cn } from "@/lib/utils";

import { useSearchParams } from "react-router-dom";

function AppPagination({ meta }: { meta: IPatientsMeta }) {
  const { links, current_page, last_page } = meta;
  const [searchParams, setSearchParams] = useSearchParams();
  const mappedLinks = links.map((link) => {
    const { url, ...res } = link;
    const page = url?.split("=")[1];
    return { page, ...res };
  });
  const trimmedLinks = mappedLinks.slice(1, -1);

  return (
    <ul className="flex justify-center items-center gap-2">
      {mappedLinks[0].page && (
        <li
          onClick={() => {
            searchParams.set("page", mappedLinks[0].page || "1");
            setSearchParams(searchParams);
          }}
          className="bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white"
        >
          {"<<"}
        </li>
      )}
      {trimmedLinks.length <= 6 ? (
        trimmedLinks.map((link) => (
          <li
            onClick={() => {
              searchParams.set("page", link.page || "1");
              setSearchParams(searchParams);
            }}
            className={cn(
              "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
              link.active && "bg-primary-blue text-white"
            )}
            key={link.label}
          >
            {link.label}
          </li>
        ))
      ) : (
        <>
          {current_page <= 3 ? (
            <>
              {trimmedLinks.slice(0, 3).map((link) => (
                <li
                  onClick={() => {
                    searchParams.set("page", link.page || "1");
                    setSearchParams(searchParams);
                  }}
                  className={cn(
                    "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                    link.active && "bg-primary-blue text-white"
                  )}
                  key={link.label}
                >
                  {link.label}
                </li>
              ))}
              <span className="text-primary-blue">...</span>
              <li
                onClick={() => {
                  searchParams.set(
                    "page",
                    trimmedLinks[trimmedLinks.length - 1].page || "1"
                  );
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                  trimmedLinks[trimmedLinks.length - 1].active &&
                    "bg-primary-blue text-white"
                )}
              >
                {trimmedLinks[trimmedLinks.length - 1].label}
              </li>
            </>
          ) : current_page > 3 && current_page <= last_page - 3 ? (
            <>
              <li
                onClick={() => {
                  searchParams.set("page", trimmedLinks[0].page || "1");
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                  trimmedLinks[0].active && "bg-primary-blue text-white"
                )}
              >
                {trimmedLinks[0].label}
              </li>
              <span className="text-primary-blue">...</span>
              {trimmedLinks
                .slice(current_page - 2, current_page + 1)
                .map((link) => (
                  <li
                    onClick={() => {
                      searchParams.set("page", link.page || "1");
                      setSearchParams(searchParams);
                    }}
                    className={cn(
                      "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                      link.active && "bg-primary-blue text-white"
                    )}
                    key={link.label}
                  >
                    {link.label}
                  </li>
                ))}
              <span className="text-primary-blue">...</span>
              <li
                onClick={() => {
                  searchParams.set(
                    "page",
                    trimmedLinks[trimmedLinks.length - 1].page || "1"
                  );
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                  trimmedLinks[trimmedLinks.length - 1].active &&
                    "bg-primary-blue text-white"
                )}
              >
                {trimmedLinks[trimmedLinks.length - 1].label}
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  searchParams.set("page", trimmedLinks[0].page || "1");
                  setSearchParams(searchParams);
                }}
                className={cn(
                  "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                  trimmedLinks[0].active && "bg-primary-blue text-white"
                )}
              >
                {trimmedLinks[0].label}
              </li>
              <span className="text-primary-blue">...</span>

              {trimmedLinks.slice(-3).map((link) => (
                <li
                  onClick={() => {
                    searchParams.set("page", link.page || "1");
                    setSearchParams(searchParams);
                  }}
                  className={cn(
                    "bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white w-6 text-center",
                    link.active && "bg-primary-blue text-white"
                  )}
                  key={link.label}
                >
                  {link.label}
                </li>
              ))}
            </>
          )}
        </>
      )}
      {mappedLinks[mappedLinks.length - 1].page && (
        <li
          onClick={() => {
            searchParams.set(
              "page",
              mappedLinks[mappedLinks.length - 1].page || "1"
            );
            setSearchParams(searchParams);
          }}
          className="bg-secondary-blue p-1 rounded-md text-primary-blue cursor-pointer hover:bg-primary-blue hover:text-white"
        >
          {">>"}
        </li>
      )}
    </ul>
  );
}

export default AppPagination;
