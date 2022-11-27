import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React, { useReducer, useState } from "react"

interface Person {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: (info) =>
      (info.column.id[0].toUpperCase() + info.column.id.slice(1)).replace(
        /([A-Z])/g,
        " $1"
      ),
  }),
  columnHelper.group({
    header: "testing",
    footer: "testing",
    columns: [
      columnHelper.accessor("lastName", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: (info) =>
          (info.column.id[0].toUpperCase() + info.column.id.slice(1)).replace(
            /([A-Z])/g,
            " $1"
          ),
        filterFn: "arrIncludesSome",
      }),
      columnHelper.accessor("age", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        header: (info) =>
          (info.column.id[0].toUpperCase() + info.column.id.slice(1)).replace(
            /([A-Z])/g,
            " $1"
          ),
      }),
    ],
  }),
  // columnHelper.accessor((row) => row.lastName, {
  //   id: "lastName",
  //   cell: (info) => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("age", {
  //   header: () => "Age",
  //   cell: (info) => info.renderValue(),
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("visits", {
  //   header: () => <span>Visits</span>,
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("status", {
  //   header: "Status",
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("progress", {
  //   header: "Profile Progress",
  //   footer: (info) => info.column.id,
  // }),
]

const Test = () => {
  const [data, setData] = useState(() => [...defaultData])
  const rerender = useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className="border-spacing border-separate border-spacing-2 border border-slate-500">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-b border-slate-600">
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-slate-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="border border-slate-600">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}

export default Test
