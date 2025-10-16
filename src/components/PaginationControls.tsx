type Props = {
  page: number;
  setPage: (p: number) => void;
  pages: number;
};

export default function PaginationControls({ page, setPage, pages }: Props) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div>
        <button
          className="px-3 py-1 mr-2 border rounded"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="px-3 py-1 border rounded"
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div className="text-sm">
        Page {page} / {pages}
      </div>
    </div>
  );
}
