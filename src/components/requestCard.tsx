import { status } from "@/config";

export default function GroupCard({
  group,
  onEdit,
  className = "",
  onDelete,
}: {
  group: { id: string; name: string; status: number };
  onEdit: () => void;
  className?: string;
  onDelete?: () => void;
}) {
  return (
    <div
      className={"border-2 rounded light:bg-gray-100 dark:bg-gray-800 hover:scale-101 transition-transform border-gray-300 p-2 w-150 mb-3 cursor-pointer" + className}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("button")) {
          onEdit();
        }
      }}
    >
      <div className="flex h-[35px] mb-2">
        <div className="text-2xl flex flex-grow justify-items-center">
          {group.name}
        </div>
        <div className="flex items-center">
          Status: {status[group.status as keyof typeof status]}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="w-full h-full text-gray-500 rounded items-center justify-center "
        >
          View and Edit
        </div>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-full h-full bg-red-300 dark:text-black light:text-gray-800 rounded hover:bg-red-400"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
