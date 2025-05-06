import * as dotenv from "dotenv";
import { server } from "./schema";

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
