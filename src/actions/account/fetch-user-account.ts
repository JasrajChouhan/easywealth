'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

const serializeTranction = (obj: { balance?: any; amount?: any }) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

export const fetchUserAccounts = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User ID is required');
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const accounts = await db.account.findMany({
      where: {
        id: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!accounts) {
      throw new Error('No accounts found');
    }

    // serlize the account
    const serializeAccount = accounts.map(serializeTranction);

    return {
      success: true,
      accounts: serializeAccount,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
