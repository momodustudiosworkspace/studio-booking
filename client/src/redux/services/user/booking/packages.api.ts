// // src/redux/services/booking.api.ts

// import { PackagesTypeResponse } from "@/types/packages.types";
// import { baseApi } from "../../api";

// export const packagesApi = baseApi.injectEndpoints({
//   endpoints: builder => ({
//     getPackages: builder.query< void, PackagesTypeResponse[]>({
//       query: () => "/admin/packages",
//       providesTags: ["Bookings"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetPackagesQuery,
//   // useGetBookingByIdQuery,
//   // useCreateBookingMutation,
//   // useDeleteBookingMutation,
// } = packagesApi;
