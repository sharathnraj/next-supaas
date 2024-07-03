import { SpecificationsTableData } from '@/lib/types';

export default function Table({ data }: { data: SpecificationsTableData[] }) {
  const headerRow = data.find(item => !!item.header);
  const rows = data.filter(item => !item.header);

  return (
    <table className="w-full table-fixed">
      {headerRow && (
        <thead>
          <tr className="bg-neutral-200">
            <th scope="col" className="p-2.5 text-left">
              <h6>{headerRow.key}</h6>
            </th>
            <th scope="col" className="p-2.5 text-left">
              <h6>{headerRow.value}</h6>
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="odd:bg-neutral-100">
            <td className="p-2.5">
              <p className="small">{row.key}</p>
            </td>
            <td className="p-2.5">
              <p className="small">{row.value}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
