/* eslint-disable react/prop-types */
export const CustomeTable = ({column, dataSource}) => {
    if(dataSource.length <= 0){
        return (
            <span className="w-full flex justify-center text-green-800 text-[1.5rem] font-bold text-center">No Data</span>
        )
    }

    return (
      <table className="shadow-lg w-full ">
          <thead className=" text-white font-poppins h-14 rounded-full">
              <tr className="my-5 rounded-full ">
                  {column?.map((col, index) => col.isShow && 
                      <th className="bg-green-600"  key={index}>
                          {col.title}
                      </th>)}
              </tr>
          </thead>
          <tbody>
              {dataSource.map(item => (
                  <tr key={item.key} className=" h-12 rounded-full w-full border-b-green-500 border-b-2 text-center">
                      {
                          column?.map((col, index) => col.isShow && 
                              <td key={index} 
                                  className=" content-center ">
                                  {item[col.index]}
                              </td>)
                      }
                  </tr>
              ))}
          </tbody>
      </table>
    )
  }
  