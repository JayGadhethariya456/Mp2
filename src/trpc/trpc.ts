import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { TRPCError, initTRPC } from '@trpc/server'

const t = initTRPC.create();

const isAuth = async (opts: { ctx: any }): Promise<any> => {
    const { getUser } = getKindeServerSession();
    const user: any = await getUser();

    if (!user || !user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return {
        userId: user.id,
        user,
    };
};

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
