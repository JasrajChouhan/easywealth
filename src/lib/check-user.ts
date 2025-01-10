import { currentUser } from '@clerk/nextjs/server';
import { db } from './prisma';

export const checkUser = async () => {
  const user = await currentUser();
  console.log('current-user', user);
  if (!user) return;
  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) return loggedInUser;

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await prisma?.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name,
        imageUrl: user.imageUrl,
      },
    });

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
