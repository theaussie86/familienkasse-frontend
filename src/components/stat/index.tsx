import { ElementType } from "react";
import { cn } from "../../util";
import { Link } from "react-router-dom";

type StatCardProps = {
  item: {
    name: string;
    icon: ElementType;
    actual: string | 0 | undefined;
    target: string | 0 | undefined;
  };
  hasLink?: boolean;
};

function StatCard({ item, hasLink = true }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
      <dt>
        <div className="absolute rounded-md bg-indigo-500 p-3">
          <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {item.name}
        </p>
        <span
          className={cn(
            "h-4 w-4 absolute top-4 right-4 rounded-full",
            item.actual === item.target ? "bg-green-500" : "bg-red-500"
          )}
        ></span>
      </dt>
      <dd className="ml-16 flex gap-x-2 items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{item.actual}</p>
        <span className="text-gray-600">{`(Soll: ${item.target})`}</span>

        {hasLink ? (
          <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to={`/details?account=${item.name}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Alle anzeigen
                <span className="sr-only"> {item.name} stats</span>
              </Link>
            </div>
          </div>
        ) : null}
      </dd>
    </div>
  );
}

export default StatCard;
