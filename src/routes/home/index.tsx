import {
  BanknotesIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../actions";
import { useAuth } from "../../components/hooks/auth";
import { Transaction } from "../../types";
import { formatCurrency, sumupAmounts } from "../../util";
import WeissteinerTable from "../../components/table";

function HomePage() {
  const { idToken } = useAuth();
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    meta: { token: idToken },
  });

  const savings = transactions
    ?.filter((transaction) => transaction.account === "Sparen")
    .reduce(sumupAmounts, 0);
  const investings = transactions
    ?.filter((transaction) => transaction.account === "Investieren")
    .reduce(sumupAmounts, 0);
  const donations = transactions
    ?.filter((transaction) => transaction.account === "Spenden")
    .reduce(sumupAmounts, 0);

  const stats = [
    {
      id: 1,
      name: "Sparen",
      stat: formatCurrency(savings),
      icon: BanknotesIcon,
    },
    {
      id: 2,
      name: "Spenden",
      stat: formatCurrency(donations),
      icon: GiftIcon,
    },
    {
      id: 3,
      name: "Investieren",
      stat: formatCurrency(investings),
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Aktueller Stand
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>

                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Alle anzeigen
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <WeissteinerTable />
      </section>
    </div>
  );
}

export default HomePage;
