'use server';

import { db } from '@/lib/prisma';
import { AccountSchema } from '@/schemas/account.schema';
import { AccountSchemaType } from '@/types/account.types';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const serializeBalance = (obj: { balance?: any }) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }

  return serialized;
};

export const createAccount = async (data: AccountSchemaType) => {
  const parsedData = AccountSchema.parse(data);
  try {
    const { userId } = await auth();
    console.log(userId);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    // get user
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    const balanceFloat = parseFloat(parsedData.balance);
    if (isNaN(balanceFloat)) {
      throw new Error('Invalid balance');
    }

    // Existing Account
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const shouldBeDefault =
      existingAccounts?.length === 0 ? true : parsedData.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // create account
    const account = await db.account.create({
      data: {
        ...parsedData,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });
    const serilizedAccount = serializeBalance(account);

    revalidatePath('/dashboard');

    return {
      sucess: true,
      account: serilizedAccount,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
