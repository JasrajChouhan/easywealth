'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

import { createAccount } from '@/actions/account/create-account';
import { useFetch } from '@/hooks/useFetch';
import { AccountSchema } from '@/schemas/account.schema';
import { AccountSchemaType } from '@/types/account.types';
import { toast } from 'sonner';

export const CreateAccountDrawer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: '',
      type: 'CURRENT',
      balance: '0',
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    error,
    data: newAccount,
    fn: createAccountFn,
  } = useFetch(createAccount);

  useEffect(() => {
    if (!createAccountLoading && newAccount) {
      toast.success('Account created successfully');
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error || 'An error occurred');
    }
  }, [error]);

  const onSubmit: SubmitHandler<AccountSchemaType> = async (
    data: AccountSchemaType,
  ) => {
    console.log(data);
    await createAccountFn(data);
  };
  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create new Account</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            onReset={() => reset()}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Account Name"
                type="text"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value) =>
                  setValue('type', value as 'CURRENT' | 'SAVINGS')
                }
                defaultValue={watch('type')}
              >
                <SelectTrigger id="type" className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Balance
              </label>
              <Input
                id="balance"
                placeholder="Account Balance"
                type="number"
                step={0.01}
                {...register('balance')}
              />
              {errors.balance && (
                <p className="text-red-500">{errors.balance.message}</p>
              )}
            </div>
            <div className="">
              <div className="space-y-2">
                <label
                  htmlFor="isDefault"
                  className="cursor-pointer text-base font-medium"
                >
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>

              <Switch
                id="isDefault"
                {...register('isDefault')}
                defaultChecked={watch('isDefault')}
                checked={watch('isDefault')}
                onCheckedChange={(value) => setValue('isDefault', value)}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
