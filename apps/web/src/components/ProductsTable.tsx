import { UseQueryResult } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import classNames from "classnames"
import { format } from "date-fns"
import React from "react"
import { BarLoader } from "react-spinners"

import ProfileSection from "./Profile/ProfileSection"

import { Product } from "../types/product"

interface ProductsTableProps {
  products?: Product[] | undefined
  productCount?: number
  isLoading?: boolean
  pagination: PaginationState
  setPagination: OnChangeFn<PaginationState>
  refetch: UseQueryResult["refetch"]
  error?: UseQueryResult["error"]
  isRefetching: boolean
}

const ProductsTable = ({
  products = [],
  productCount = 0,
  pagination,
  isLoading,
  refetch,
  isRefetching,
  setPagination,
}: ProductsTableProps) => {
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<Product>()

  const formatCurrency = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }),
    []
  )

  const columns = React.useMemo(
    () => [
      columnHelper.display({
        header: "#",
        id: "index",
        cell: (row) =>
          pagination.pageIndex * pagination.pageSize + row.row.index + 1,
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        cell: (info) => formatCurrency.format(info.getValue() ?? 0 / 100),
      }),
      columnHelper.accessor("brand", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("groupBuyStartDate", {
        header: `Group Buy Start Date (${
          new Date()
            .toLocaleTimeString("en-us", {
              timeZoneName: "short",
            })
            .split(" ")[2]
        })`,
        cell: (info) =>
          info.getValue()
            ? format(new Date(info.getValue() as Date), "MM/dd/yyyy HH:mm")
            : null,
      }),
      columnHelper.accessor("groupBuyEndDate", {
        // get locale time zone abbreviated from browser
        header: `Group Buy End Date (${
          new Date()
            .toLocaleTimeString("en-us", {
              timeZoneName: "short",
            })
            .split(" ")[2]
        })`,
        cell: (info) =>
          info.getValue()
            ? format(new Date(info.getValue() as Date), "MM/dd/yyyy HH:mm")
            : null,
      }),
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper, formatCurrency, pagination]
  )

  const table = useReactTable({
    data: products ?? [],
    columns,
    pageCount: Math.ceil((productCount ?? 0) / (pagination.pageSize ?? 0)),
    state: {
      columnVisibility,
      sorting,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <ProfileSection className="mt-10 p-2">
      <div className="border-b border-black">
        <span>Visibility: </span>
        <div className="flex h-40 max-w-max flex-col flex-wrap">
          {table.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="p-2">
                <label className="capitalize">
                  <input
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                    className="mr-2"
                  />
                  {column.id.replace(/([A-Z])/g, " $1")}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Button section */}
      <div>
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => refetch()}
        >
          {isRefetching ? (
            <BarLoader color={"#fff"} loading={isRefetching || isLoading} />
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {/* Table */}

      <table className="w-full table-auto border-collapse rounded">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b-2 border-gray-400">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="bg-gray-100 px-6 py-4"
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={classNames(
                          header.column.getCanSort() &&
                            "cursor-pointer select-none",
                          "text-start text-xs font-medium uppercase tracking-wider text-gray-600"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </>
                      </div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y-2 divide-gray-400">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="border px-6 py-4 text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
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
      <div className="flex h-full justify-between  space-x-2">
        <select
          className="rounded border transition-colors"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div className="flex">
          <button
            className="rounded border p-1 transition-colors hover:bg-gray-500 hover:text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded border p-1 transition-colors hover:bg-gray-500 hover:text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <span className="flex items-center justify-end gap-1 px-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </ProfileSection>
  )
}

export default ProductsTable
