
const pagination= (options:{
    page?:number,
    limit?:number,
    sortBy?:string,
    orderby?:string
})=>{
  const page =Number(options.page) || 1;
  const limit =Number(options.limit) || 10;
  const skip = (Number(page)-1)*limit;
  const sortBy = options.sortBy || 'createdat';
  const orderBy = options.orderby || 'desc'
  
return{
    page,limit,skip,sortBy,orderBy
}
}

export default pagination