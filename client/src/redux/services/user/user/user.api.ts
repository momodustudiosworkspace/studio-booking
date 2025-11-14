import { UserProfileTypesResponse } from "@/types/user.types";
import { baseApi } from "../../api";



export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfileTypesResponse, void>({
            query: () => "/user",
            providesTags:["Profile"]
        })
    }),
      overrideExisting: false,
})

export const {useGetUserProfileQuery} =  userApi