import { fetchUserAccounts } from '@/actions/account/fetch-user-account';
import { CreateAccountDrawer } from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import AccountCard from './_components/account-card';

export default async function page() {
  const accounts = await fetchUserAccounts();
  console.log(fetchUserAccounts);

  return (
    <div>
      {/* dashboad progress */}
      {/* dashboad overview */}
      {/* account grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateAccountDrawer>
          <Card className="cursor-pointer border-dashed shadow-sm hover:shadow-md">
            <CardContent className="flex h-full items-center justify-center pt-5 text-center text-muted-foreground">
              <Plus size={32} className="h-10 w-10" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {(accounts?.length as number) > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}
