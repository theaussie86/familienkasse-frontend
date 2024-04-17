import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../actions";
import { useAuth } from "../../components/hooks/auth";
import { baseStats, formatCurrency, sumupAmounts } from "../../util";
import WeissteinerTable from "../../components/table";
import { useSearchParams } from "react-router-dom";
import { CreateTransactionSchema } from "../../components/form/schema";
import StatCard from "../../components/stat";

function DetailsPage() {
  const { idToken } = useAuth();
  const [searchParams] = useSearchParams();
  const account = searchParams.get("account");
  const { data: transactions } = useQuery<CreateTransactionSchema[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    meta: { token: idToken },
  });

  const stat = baseStats
    ?.map((stat) => ({
      ...stat,
      target: formatCurrency(
        transactions
          ?.filter((transaction) => transaction.account === stat.name)
          .reduce(sumupAmounts, 0)
      ),
      actual: formatCurrency(
        transactions
          ?.filter(
            (transaction) =>
              transaction.account === stat.name && transaction.isPaid === true
          )
          .reduce(sumupAmounts, 0)
      ),
    }))
    .find((stat) => stat.name === account);

  return (
    <div className="flex flex-col gap-6">
      <section>
        {stat ? (
          <dl className="mt-5 grid grid-cols-1 gap-5">
            <StatCard item={stat} hasLink={false} />
          </dl>
        ) : (
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Alle Transaktionen
          </h3>
        )}
      </section>
      <section>
        <WeissteinerTable data={transactions ?? []} />
      </section>
    </div>
  );
}

export default DetailsPage;
