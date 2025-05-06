import { faultFinder, FaultFinderArgs } from "./faultFinder";

export default {
  Query: {
    hello: () => "Hello from GraphQL!",
    faultFinder: (_parent: any, args: FaultFinderArgs, _context: any, _info: any) =>
      faultFinder(args),
  },
};
