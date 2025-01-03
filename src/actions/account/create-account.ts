import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const serilizeBalance = (obj) => {
  const serilized = { ...obj };

  if (obj.balance) {
    serilized.balance = obj.balance.toNumber();
  }

  return serilized;
};

export const createAccount = async (data) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error('Unauthorized');
    }

    // get user
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    const balanceFloat = parseFloat(data.balance);
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
      existingAccounts?.length === 0 ? true : data.isDefault;

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
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });
    const serilizedAccount = serilizeBalance(account);

    revalidatePath('/dashboard');

    return {
      sucess: true,
      account: serilizedAccount,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
