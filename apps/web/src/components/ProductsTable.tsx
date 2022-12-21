import {
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid"
import { GroupBuyStatus, Product, ProductWithPrice } from "@meka/database"
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
import Image from "next/image"
import React from "react"
import { BarLoader } from "react-spinners"

import Form from "./Forms/Form"
import Input from "./Forms/Input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeading,
  DialogTrigger,
} from "./ModalDialog"
import ToolTip, { TooltipContent, TooltipTrigger } from "./ToolTip"

const getStatusColor = (status: GroupBuyStatus) => {
  switch (status) {
    case GroupBuyStatus.GROUP_BUY:
      return "bg-green-500"
    case GroupBuyStatus.GROUP_BUY_ENDED:
      return "bg-red-500"
    case GroupBuyStatus.INTEREST_CHECK:
      return "bg-yellow-500"
    case GroupBuyStatus.DELIVERED:
      return "bg-blue-500"
    case GroupBuyStatus.DELAYED:
      return "bg-purple-500"
    case GroupBuyStatus.SHIPPING:
      return "bg-indigo-500"

    case GroupBuyStatus.WAITING_GROUP_BUY:
    case GroupBuyStatus.UPCOMING:
    case GroupBuyStatus.HIDDEN:
    default:
      return "bg-gray-400"
  }
}

interface ProductsTableProps {
  products?: ProductWithPrice[] | Product[]
  productCount?: number
  isLoading?: boolean
  pagination: PaginationState
  setPagination: OnChangeFn<PaginationState>
  refetch: UseQueryResult["refetch"]
  error?: UseQueryResult["error"]
  isRefetching: boolean
  visibility?: Partial<Record<keyof ProductWithPrice, boolean>>
  editComponent: ({
    product,
  }: {
    product: ProductWithPrice | Product
  }) => JSX.Element
}

const ProductsTable = ({
  products = [],
  productCount = 0,
  pagination,
  isLoading,
  refetch,
  isRefetching,
  setPagination,
  visibility: initialVisibility,
  editComponent,
}: ProductsTableProps) => {
  const [columnVisibility, setColumnVisibility] = React.useState(
    initialVisibility ?? {}
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<ProductWithPrice | Product>()

  const formatCurrency = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }),
    []
  )

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => {
          const imgUrl = info.row.original.coverImage
          return (
            <div className="flex w-max flex-row items-center">
              {!imgUrl ? (
                <Image
                  src={imgUrl ?? "/images/hero.jpg"}
                  alt="product"
                  width={80}
                  height={45}
                  className="aspect-video rounded object-cover object-center"
                />
              ) : null}
              <p className="ml-3 whitespace-nowrap font-medium">
                {info.getValue()}
              </p>
            </div>
          )
        },
      }),
      columnHelper.accessor("price", {
        cell: (info) => formatCurrency.format(Number(info.getValue())),
      }),
      columnHelper.accessor("brand", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor(
        (row) =>
          `${format(new Date(row.groupBuyStartDate as Date), "MM/dd/yyyy")} -
            ${format(new Date(row.groupBuyEndDate as Date), "MM/dd/yyyy")}`,
        {
          id: "groupBuyDate",
          header: `Group Buy (${
            new Date()
              .toLocaleTimeString("en-us", {
                timeZoneName: "short",
              })
              .split(" ")[2]
          })`,
          cell: (info) => (
            <p className="whitespace-nowrap">{info.getValue()}</p>
          ),
        }
      ),
      columnHelper.accessor("status", {
        cell: (info) => (
          <>
            {info.getValue().includes(GroupBuyStatus.HIDDEN) ? (
              <ToolTip>
                <TooltipContent className="select-none rounded-md bg-slate-400 px-2 py-1 text-start text-xs font-medium">
                  This product is hidden from the public.
                  <br /> You can only see it with an id.
                </TooltipContent>
                <TooltipTrigger>
                  <div
                    className={classNames(
                      "w-fit select-none whitespace-nowrap rounded-md px-2 py-1 text-start text-xs font-medium",
                      getStatusColor(info.getValue())
                    )}
                  >
                    {info.getValue().replaceAll("_", " ")}
                  </div>
                </TooltipTrigger>
              </ToolTip>
            ) : (
              <div
                className={classNames(
                  "w-fit select-none whitespace-nowrap rounded-md px-2 py-1 text-start text-xs font-medium",
                  getStatusColor(info.getValue())
                )}
              >
                {info.getValue().replaceAll("_", " ")}
              </div>
            )}
          </>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (row) => (
          <Dialog>
            <DialogTrigger className="flex w-min items-center justify-center space-x-2 rounded bg-indigo-500 px-3 py-1 text-white">
              <span className="whitespace-nowrap text-lg font-medium">
                Edit
              </span>
            </DialogTrigger>
            <DialogContent className="m-4 max-w-4xl rounded bg-primary-light px-2 py-12 sm:px-8 lg:w-1/2">
              <DialogHeading className="text-3xl font-semibold">
                Edit Product
              </DialogHeading>
              <DialogDescription className="mt-2 text-lg text-neutral-600">
                Edit the product information
              </DialogDescription>
              {React.createElement(editComponent, {
                product: row.row.original,
              })}
            </DialogContent>
          </Dialog>
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper, editComponent, formatCurrency]
  )

  const table = useReactTable<ProductWithPrice | Product>({
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
    <>
      {/* Visibility will be handled by user input */}
      {/* <div className="border-b border-black">
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
        </div> */}

      {/* Table */}
      <div className="mt-10 overflow-x-auto sm:rounded-lg">
        <table className="min-w-full rounded">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className="py-4 px-6"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames(
                          header.column.getCanSort() &&
                            "cursor-pointer select-none",
                          "flex text-start text-xs font-medium uppercase tracking-wider text-gray-600"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="ml-1 h-5 w-5 text-indigo-600">
                              {{
                                asc: <ArrowUpIcon />,
                                desc: <ArrowDownIcon />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ArrowsUpDownIcon />
                              )}
                            </span>
                          )}
                        </>
                      </div>
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
                      <td
                        key={cell.id}
                        className="py-4 px-6 font-medium text-gray-900 dark:text-white"
                      >
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
          {/* <tfoot>
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
          </tfoot> */}
        </table>
      </div>
      <div className="mt-2 flex justify-between gap-x-2">
        <div className="flex gap-x-4">
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
    </>
  )
}

export default ProductsTable
