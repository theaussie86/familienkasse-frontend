import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction, fetchTransactions } from "../../actions";
import { useAuth } from "../../components/hooks/auth";
import { Transaction } from "../../types";
import { baseStats, columns, formatCurrency, sumupAmounts } from "../../util";
import WeissteinerTable from "../../components/table";
import { Link } from "react-router-dom";
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
import { TrashIcon } from "@heroicons/react/24/outline";

function HomePage() {
  const { idToken } = useAuth();
  const queryClient = useQueryClient();
  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (data) => {
      console.log("deleted", data);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        refetchType: "all",
      });
    },
  });
  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    meta: { token: idToken },
  });

  const stats = baseStats.map((stat) => ({
    ...stat,
    stat: formatCurrency(
      transactions
        ?.filter((transaction) => transaction.account === stat.name)
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
                    <Link
                      to={`/details?account=${item.name}`}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Alle anzeigen
                      <span className="sr-only"> {item.name} stats</span>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
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
          columns={[
            ...columns,
            {
              id: "actions",
              cell: ({ row }) => {
                return (
                  <button
                    onClick={() => {
                      deleteTransactionMutation.mutate({
                        _id: row.original._id,
                        idToken,
                      });
                    }}
                  >
                    <TrashIcon className="h-6 w-6 text-gray-500" />
                  </button>
                );
              },
            },
          ]}
          showPagination={false}
          isSearchable={false}
        />
      </section>
    </div>
  );
}

export default HomePage;
