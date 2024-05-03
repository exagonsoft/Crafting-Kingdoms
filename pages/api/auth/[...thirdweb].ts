import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { getEnvironment } from "../../../config/configs";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  wallet: new PrivateKeyWallet(getEnvironment().PRIVATE_KEY),
  domain: getEnvironment().DOMAIN,
});

export default ThirdwebAuthHandler();
