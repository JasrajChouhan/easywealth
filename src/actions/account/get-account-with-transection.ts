import { db } from '@/lib/prisma';
import { serializeTranction } from '@/lib/serilizeTranction';
import { auth } from '@clerk/nextjs/server';

export const getAccountWithTransections = async (accountId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error('User not found');

    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
      include: {
        transactions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!account) throw new Error('Account not found');
    return {
      ...serializeTranction(account),
      transactions: account.transactions.map(serializeTranction),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
