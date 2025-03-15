/* eslint-disable react/prop-types */
export const CustomeTable = ({column, dataSource}) => {
    if(dataSource.length <= 0){
        return (
            <span className="w-full flex justify-center text-blue-800 text-[1.5rem] font-bold text-center">No Data</span>
        )
    }

    return (
      <table className="w-full shadow-lg ">
          <thead className="text-white rounded-full font-poppins h-14">
              <tr className="my-5 rounded-full ">
                  {column?.map((col, index) => col.isShow && 
                      <th className="bg-blue-600"  key={index}>
                          {col.title}
                      </th>)}
              </tr>
          </thead>
          <tbody>
              {dataSource.map(item => (
                  <tr key={item.key} className="w-full h-12 text-center border-b-2 rounded-full border-b-blue-500">
                      {
                          column?.map((col, index) => col.isShow && 
                              <td key={index} 
                                  className="content-center ">
                                  {item[col.index]}
                              </td>)
                      }
                  </tr>
              ))}
          </tbody>
      </table>
    )
  }
  