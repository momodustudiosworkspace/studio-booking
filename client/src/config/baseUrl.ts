

 const baseUrl =  process.env["Production"]
  ? process.env["API_BASE_URL"]
  : process.env["NEXT_PUBLIC_API_BASE_URL_LOCAL"];

  export default baseUrl