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
      return "bg-gray-500"
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
            <div className="flex w-max items-center">
              {!imgUrl ? (
                <Image
                  src={imgUrl ?? "/images/hero.jpg"}
                  alt="product"
                  width={100}
                  height={60}
                  className="aspect-video rounded object-cover object-center"
                />
              ) : null}
              <p className="ml-4 font-semibold">{info.getValue()}</p>
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
          <div
            className={classNames(
              "flex h-8 w-max select-none items-center justify-center rounded-lg px-2 text-xs font-semibold",
              getStatusColor(info.getValue())
            )}
          >
            {info.getValue().replaceAll("_", " ")}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        cell: (row) => (
          <Dialog>
            <DialogTrigger className="whitespace-nowrap rounded bg-indigo-600 px-4 py-2 text-white">
              Edit Product
            </DialogTrigger>
            <DialogContent className="m-4 w-1/2 rounded bg-primary-light p-4 py-12">
              <DialogHeading>Edit Product</DialogHeading>
              <DialogDescription>
                Edit the product information
              </DialogDescription>
              <EditProductView product={row.row.original} />
            </DialogContent>
          </Dialog>
        ),
      }),
    ],
    [columnHelper, formatCurrency]
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
      <div className="mt-10 w-full overflow-x-auto">
        <table className="w-full min-w-full table-auto border-collapse rounded">
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
      </div>
    </>
  )
}

interface EditProductViewProps {
  product: ProductWithPrice | Product
}

const EditProductView = ({ product }: EditProductViewProps) => {
  const onSubmit = async (data: ProductWithPrice | Product) => {
    console.log(data)
  }

  return (
    <Form<ProductWithPrice | Product>
      onSubmit={onSubmit}
      defaultValues={product}
      className="mt-8 flex h-full max-w-full flex-col gap-2 space-y-4"
    >
      <Input
        id={`${product.id}-name`}
        label="Name"
        type="text"
        placeholder={product.name}
        className="rounded border"
      />
      {/* If the product has a price show this option, this is mainly for products on the vendor side */}
      {"price" in product ? (
        <Input
          id={`${product.id}-price`}
          label="Price"
          type="number"
          placeholder={product.price?.toString()}
          min={0}
          step={0.01}
          className="rounded border"
        />
      ) : null}
      <Input
        id={`${product.id}-description`}
        label="Description"
        type="text"
        placeholder={product.description}
        className="rounded border"
      />
    </Form>
  )
}

export default ProductsTable
