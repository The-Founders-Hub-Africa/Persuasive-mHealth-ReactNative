import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseUrl = 'http://127.0.0.1:8000'
// export const baseUrl = 'https://67b9-102-89-33-90.ngrok-free.app'

export const mediAppApi = createApi({
  reducerPath: 'mediAppApi',
  baseQuery: fetchBaseQuery({ baseUrl,
      prepareHeaders(headers) {
          if (!headers.get("Content-Type")) {
            headers.set("Content-Type", "application/json")
        }
        return headers
    }
  }),
  
  tagTypes: ['userlogin'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        registerMPUser: builder.mutation({
            query: data => ({
                url: "/registermp",
                method: "POST",
                body: data
            }),
            // transformResponse : (response,meta,arg) => response.data,
            // transformErrorResponse : response => response.status,
            invalidatesTags: ['userlogin']
        }),

        changePassword: builder.mutation({
            query: data => ({
                url: "/changepassword",
                headers: { "Authorization": `Token ${data.token}`},
                method: "POST",
                body: data
            }),
        }),
        

        logout: builder.mutation({
            query: token => ({
                url: `/logout`,
                headers: { "Authorization": `Token ${token}` },
                method: "POST",
            }),
        }),

        // 

        // getOTP: builder.mutation({
        //     query: token =>({
        //         url: `/otp`,
        //         headers: { "Authorization": `Token ${token}` },
        //         method: "POST",
        //     }),
        // }), 
        OTP: builder.mutation({
            query: data => ({
                url: `/otp`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data,
            }),
        }),

        patient: builder.mutation({
            query: data => ({
                url: `/patient`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data.data,
            }),
        }),

        whatsappRecords: builder.mutation({
            query: data => ({
                url: `/whatsapp_records`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data.data,
            }),
        }),

        appointments: builder.mutation({
            query: data => ({
                url: `/event`,
                headers: { "Authorization": `Token ${data.token}` },
                method: "POST",
                body: data.data,
            }),
        }),

        // patientGet: builder.query({
        // query: data =>({
        // url: `/patient?action=${data.action}`,
        // headers: {"Authorization": `Token ${data.token}`}
        //     }),
        // }), 

        
        // editUser: builder.mutation({
        //     query: data => ({
        //         url: `/edituser`,
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=---->",
        //             "Authorization": `Token ${data.token}`,},
        //         method: "POST",
        //         body: data.data,
        //         formData:true 
        //     }),
        // }),
  }),
})

export const {
    useLoginMutation, useRegisterMPUserMutation,
    useLogoutMutation, useOTPMutation,
    useAppointmentsMutation,
    usePatientMutation, useWhatsappRecordsMutation,
    useChangePasswordMutation
    
    } = mediAppApi
              
