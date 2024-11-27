type TableProps = {
  headers: string[]; // Array of column headers
  // data: (string | number)[][]; // 2D array representing rows and cells
  data: any;
};

export default function Table({ headers, data }: TableProps) {
  // data.forEach((key: any, index: number) => {
  //   console.log('key', key)
  //   headers.forEach((header, index) => {
  //     console.log('header', header)
  //     console.log('key[header]', key[header])              
  //   })
  // })
  return (
    <div className="overflow-auto shadow-md sm:rounded-lg h-365 my-4">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((key: any, index: number) => {
            
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {headers.map((header, index) => (
                  <td key={index} className="px-6 py-4">
                    {String(key[header] ?? "N/A")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
