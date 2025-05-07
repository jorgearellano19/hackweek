import { faultFinder, type FaultFinderArgs } from "./faultFinder";

export const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
    faultFinder: (_parent: any, args: FaultFinderArgs, _context: any, _info: any) =>
      faultFinder(args),
  },
};
