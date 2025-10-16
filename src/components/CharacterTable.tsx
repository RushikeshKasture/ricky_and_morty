import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Character } from "../api/Api";
import { Link } from "@tanstack/react-router";

type Props = { data: Character[] };

const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: (info) => (
      <img
        src={info.getValue() as string}
        alt="avatar"
        className="w-12 h-12 rounded"
      />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "species", header: "Species" },
  { accessorKey: "status", header: "Status" },
  {
    accessorFn: (row) => row.origin?.name,
    id: "origin",
    header: "Origin",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = Number(row.original.id);
      return (
        <Link
          to="/character/$id"
          params={{ id: String(id) }}
          className="text-sm underline"
        >
          View
        </Link>
      );
    },
  },
];

export default function CharacterTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left text-sm font-medium text-gray-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 text-sm align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
