import { ChecklistItemData } from '@/lib/types';

export default function CheckedList({ list }: { list: ChecklistItemData[] }) {
  return (
    <div className="flex flex-col gap-4">
      {list.map((item, index) => (
        <div className="flex flex-row items-start gap-2" key={index}>
          <span className="material-icons h-5 w-5 text-2xl text-reeceBlue">
            check_circle
          </span>
          <label className="leading-normal">{item.checklistText}</label>
        </div>
      ))}
    </div>
  );
}
