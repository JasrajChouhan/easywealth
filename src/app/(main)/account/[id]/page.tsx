import { getAccountWithTransections } from '@/actions/account/get-account-with-transection';
import { notFound } from 'next/navigation';

export default async function Page({ params }: any) {
  const { id } = await params;

  const accountData = await getAccountWithTransections(id);
  console.log(id);
  const { transactions, ...account } = accountData;
  console.log(account);
  if (!accountData) {
    notFound();
  }
  return (
    <div className="space-y-8 px-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="gradient-title text-5xl font-bold capitalize tracking-tight sm:text-6xl">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{' '}
            Account
          </p>
        </div>

        <div className="pb-2 text-right">
          <div className="text-xl font-bold sm:text-2xl">
            ${parseFloat(account?.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>
    </div>
  );
}
