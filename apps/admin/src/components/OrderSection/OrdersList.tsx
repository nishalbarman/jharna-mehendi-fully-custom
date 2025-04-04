import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, MenuItem } from "@mui/material";

// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { attachComma } from "../../helper/utils";

import { useAppSelector } from "../../redux/index";
import { OrderGroup } from "../../types";
import cAxios from "../../axios/cutom-axios";
import { FaEye } from "react-icons/fa";

const OrderList = () => {
  const navigate = useNavigate();

  const { jwtToken } = useAppSelector((state) => state.auth);

  //data and fetching state
  const [data, setData] = useState<OrderGroup[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  console.log(data);

  //table state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchOrderData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    const url = new URL("/orders/list", process.env.VITE_APP_API_URL);

    url.searchParams.set("page", `${pagination.pageIndex}`);
    url.searchParams.set("limit", `${pagination.pageSize}`);

    try {
      const res: {
        data: { groupedOrders: OrderGroup[]; globalTotalDocumentCount: number };
      } = await cAxios.get(url.href);

      setData(res.data?.groupedOrders || []);
      setRowCount(res.data?.globalTotalDocumentCount || 0);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  const columns = useMemo<MRT_ColumnDef<OrderGroup>[]>(
    () => [
      {
        id: "payment_info",
        header: "Payment Info",
        columns: [
          {
            header: "Transaction ID", // this will be the order Gateway transaction id
            accessorKey: "paymentTransactionId",
            enableClickToCopy: true,
            size: 200,
            //custom conditional format and styling
            Cell: ({ renderedCellValue }) => (
              <Box component="span">
                {renderedCellValue || "Not Applicable"}
              </Box>
            ),
          },
          // {
          //   header: "Total Price",
          //   accessorKey: "totalPrice",
          //   size: 200,
          //   //custom conditional format and styling
          //   Cell: ({ renderedCellValue }) => (
          //     <Box component="span">
          //       <strong>
          //         {attachComma(
          //           renderedCellValue === undefined ||
          //             renderedCellValue === null
          //             ? 0
          //             : +renderedCellValue
          //         )}
          //       </strong>
          //     </Box>
          //   ),
          // },
        ],
      },

      {
        id: "order_info",
        header: "Order Info",
        columns: [
          {
            header: "Order Group ID",
            accessorKey: "orderGroupID",
            size: 200,
            //custom conditional format and styling
            Cell: ({ renderedCellValue }) => (
              <Box component="span">{renderedCellValue}</Box>
            ),
          },
          {
            header: "Order Quantity",
            accessorKey: "totalDocumentCount",
            size: 200,
            //custom conditional format and styling
            Cell: ({ renderedCellValue }) => (
              <Box component="span">
                <strong>{renderedCellValue}</strong>
              </Box>
            ),
          },

          // {
          //   // accessorFn: (row) => `${row.orderType}`,
          //   accessorKey: "orderType", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
          //   filterVariant: "autocomplete",
          //   header: "Order Type",
          //   size: 300,
          //   Cell: ({ renderedCellValue, row }) => (
          //     <Box
          //       sx={{
          //         display: "flex",
          //         flexDirection: "column",
          //         // alignItems: 'center',
          //         gap: "5px",
          //       }}>
          //       <div>
          //         <span>
          //           <b>{renderedCellValue === "buy" ? "Bought" : "Rented"}</b>
          //         </span>
          //       </div>
          //       {row.original.paymentTransactionId && (
          //         <div
          //           style={{
          //             fontSize: "12px",
          //           }}>
          //           <span>Txn ID: {row.original.paymentTransactionId}</span>
          //         </div>
          //       )}
          //     </Box>
          //   ),
          // },
        ],
      },

      {
        id: "Date", //id used to define `group` column
        header: "Date",
        columns: [
          {
            accessorKey: "createdAt", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: "Order Date",
            size: 50,
            enableColumnFilter: false,
            enableColumnFilterModes: false,
            enableFilters: false,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                {new Date(renderedCellValue).toDateString()}
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    getRowId: (row) => row.orderGroupID,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    manualFiltering: false,
    manualPagination: true,
    manualSorting: false,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    rowCount,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },

    // muiTableBodyRowProps: ({ row }) => {
    //   return {
    //     sx: {
    //       backgroundColor:
    //         row.original.orderType === "rent" ? "#ffd7d4" : "#f0fff0",
    //     },
    //   };
    // },

    // renderDetailPanel: ({ row }) => (
    //   <CCol>
    //     <CCard>
    //       <CCardBody>
    //         <CCarousel
    //           style={{
    //             width: '500px',
    //             height: '400px',
    //             marginBottom: '30px',
    //           }}
    //           controls
    //           indicators
    //           dark
    //         >
    //           {row.original.slideImages?.map((imageUrl, index) => (
    //             <CCarouselItem
    //               style={{
    //                 width: '500px',
    //                 height: '400px',
    //               }}
    //               key={index}
    //             >
    //               <img
    //                 style={{
    //                   width: '500px',
    //                   height: '400px',
    //                   objectFit: 'cover',
    //                   objectPosition: 'center',
    //                 }}
    //                 src={imageUrl}
    //                 alt="slide 1"
    //               />
    //             </CCarouselItem>
    //           ))}
    //         </CCarousel>

    //         <div
    //           style={{
    //             marginBottom: '15px',
    //           }}
    //         >
    //           <h4>
    //             <b>Description</b>
    //           </h4>
    //         </div>
    //         <div dangerouslySetInnerHTML={{ __html: row.original.description }}></div>
    //         {row.original.isVariantAvailable && (
    //           <>
    //             <div
    //               style={{
    //                 marginBottom: '15px',
    //               }}
    //             >
    //               <h4>
    //                 <b>Variants</b>
    //               </h4>
    //             </div>

    //             <div>
    //               <CCard>
    //                 <CCardBody>
    //                   {row.original.productVariant.map((item) =>
    //                     Object.entries(item).map(([key, value]) => {
    //                       return (
    //                         <p>
    //                           {key}: {value}
    //                         </p>
    //                       )
    //                     }),
    //                   )}
    //                 </CCardBody>
    //               </CCard>
    //             </div>
    //           </>
    //         )}
    //       </CCardBody>
    //     </CCard>
    //   </CCol>
    // ),

    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          navigate(`/orders/view?groupId=${row.original.orderGroupID}`);
          // setViewOrder(row)
          closeMenu();
        }}
        sx={{ m: 0 }}>
        <FaEye />
        <span style={{ marginLeft: "9px" }}>View Order</span>
      </MenuItem>,
      // <MenuItem
      //   key={0}
      //   onClick={() => {
      //     // View profile logic...
      //     // navigate(`/product/add?id=${row.original._id}`)
      //     sessionStorage.setItem('productId', row.original._id)
      //     setUpdateModalVisible(true)
      //     closeMenu()
      //   }}
      //   sx={{ m: 0 }}
      // >
      //   <CIcon icon={cilPen} />
      //   <span style={{ marginLeft: '9px' }}>Update</span>
      // </MenuItem>,
      // <MenuItem
      //   key={1}
      //   onClick={() => {
      //     // Send email logic...
      //     setDeleteProductId([row.original._id])
      //     closeMenu()
      //   }}
      //   sx={{ m: 0 }}
      // >
      //   <CIcon icon={cilTrash} />
      //   <span style={{ marginLeft: '9px' }}>Delete</span>
      // </MenuItem>,
    ],

    // renderTopToolbar: ({ table }) => {
    //   const handleDeleted = () => {
    //     setDeleteProductId(
    //       table.getSelectedRowModel().flatRows.map((row) => row.original._id)
    //     );
    //   };

    //   return (
    //     <Box
    //       sx={(theme) => ({
    //         backgroundColor: lighten(theme.palette.background.default, 0.05),
    //         display: "flex",
    //         gap: "0.5rem",
    //         p: "8px",
    //         justifyContent: "space-between",
    //       })}>
    //       <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
    //         {/* import MRT sub-components */}
    //         <MRT_GlobalFilterTextField table={table} />
    //         <MRT_ToggleFiltersButton table={table} />
    //       </Box>
    //       <Box>
    //         <Box sx={{ display: "flex", gap: "0.5rem" }}>
    //           <Button
    //             color="error"
    //             disabled={
    //               !(
    //                 table.getIsSomePageRowsSelected() ||
    //                 table.getIsAllRowsSelected()
    //               )
    //             }
    //             onClick={handleDeleted}
    //             variant="contained">
    //             Delete
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Box>
    //   );
    // },
  });

  //   const [viewOrder, setViewOrder] = useState<Order | null>(null);

  //   const [deleteProductId, setDeleteProductId] = useState<string[] | null>(null);
  //   const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  return (
    <div className="flex flex-col flex-1 p-3 md:p-6 bg-gray-100">
      <div className="grid grid-cols-1 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              List of orders
            </h2>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MaterialReactTable table={table} />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
