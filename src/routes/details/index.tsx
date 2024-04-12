import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../actions";
import { useAuth } from "../../components/hooks/auth";
import { Transaction } from "../../types";
import { baseStats, columns, formatCurrency, sumupAmounts } from "../../util";
import WeissteinerTable from "../../components/table";
import { useSearchParams } from "react-router-dom";

function DetailsPage() {
  const { idToken } = useAuth();
  const [searchParams] = useSearchParams();
  const account = searchParams.get("account");
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    meta: { token: idToken },
  });

  const stat = baseStats
    ?.map((stat) => ({
      ...stat,
      stat: formatCurrency(
        transactions
          ?.filter((transaction) => transaction.account === stat.name)
          .reduce(sumupAmounts, 0)
      ),
    }))
    .find((stat) => stat.name === account);

  return (
    <div className="flex flex-col gap-6">
      <section>
        {stat ? (
          <dl className="mt-5 grid grid-cols-1 gap-5">
            <div
              key={stat?.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  {stat && (
                    <stat.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat?.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat?.stat}
                </p>
              </dd>
            </div>
          </dl>
        ) : (
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Alle Transaktionen
          </h3>
        )}
      </section>
      <section>
        <WeissteinerTable data={transactions ?? []} columns={columns} />
      </section>
    </div>
  );
}

export default DetailsPage;
