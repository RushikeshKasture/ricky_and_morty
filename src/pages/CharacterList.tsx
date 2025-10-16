/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../api/Api";
import CharacterTable from "../components/CharacterTable";
import PaginationControls from "../components/PaginationControls";

export default function CharacterList() {
  const navigate = useNavigate();
  const search = (useSearch({ from: "/" }) as { page?: number }) ?? {};
  const [page, setPage] = useState(search.page ?? 1);

  const { data, status, refetch, isFetching } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    navigate({ search: { page } } as any);
    localStorage.setItem("rm_current_page", String(page));
  }, [page, navigate]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rick & Morty — Characters</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => refetch()}
            className="px-3 py-1 border rounded shadow-sm bg-white"
            aria-label="Refresh page"
          >
            Refresh
          </button>
          {isFetching && <span className="text-sm italic">Updating…</span>}
        </div>
      </header>

      {status === "pending" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching characters.</div>}

      {data && (
        <>
          <CharacterTable data={data.results} />

          <PaginationControls
            page={page}
            setPage={setPage}
            pages={data.info.pages}
          />
        </>
      )}
    </div>
  );
}
