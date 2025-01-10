'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { serializeTranction } from '@/lib/serilizeTranction';

export const updateDefaultAccount = async (accountId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    // find user in db
    const user = await db.user.findFirst({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    // unset the existing default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    // set the new default account (accountId)
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: {
        isDefault: true,
      },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      data: serializeTranction(account),
    };
  } catch (error: any) {
    return {
      success: false,
      data: error.message,
    };
  }
};
