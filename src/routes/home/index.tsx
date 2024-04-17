import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../../actions";
import { useAuth } from "../../components/hooks/auth";
import { baseStats, formatCurrency, sumupAmounts } from "../../util";
import WeissteinerTable from "../../components/table";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import CreateTransactionForm from "../../components/form/create-transaction";
import { CreateTransactionSchema } from "../../components/form/schema";
import StatCard from "../../components/stat";

function HomePage() {
  const { idToken } = useAuth();

  const { data: transactions } = useQuery<CreateTransactionSchema[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    meta: { token: idToken },
  });

  const stats = baseStats.map((stat) => ({
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
  }));

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Aktueller Stand
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <StatCard item={item} key={item.id} />
          ))}
        </dl>
      </section>
      <section>
        <div className="flex justify-between">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Letzten Transaktionen
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Neue Transaktion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neue Transaktion erstellen</DialogTitle>
                <DialogDescription asChild>
                  <CreateTransactionForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <WeissteinerTable
          data={transactions ?? []}
          showPagination={false}
          isSearchable={false}
        />
      </section>
    </div>
  );
}

export default HomePage;
