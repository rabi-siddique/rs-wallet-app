import { QueryClient, createProtobufRpcClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { QueryClientImpl } from 'cosmjs-types/cosmos/bank/v1beta1/query';
import type { Coin } from '@cosmjs/stargate';
import type { HttpEndpoint } from '@cosmjs/tendermint-rpc';

// XXX use casting support when possible for load balancing, batching, and
// proofs.
export const queryBankBalances = async (
  address: string,
  rpc: HttpEndpoint,
): Promise<Coin[]> => {
  const tendermint = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermint);
  const rpcClient = createProtobufRpcClient(queryClient);
  const bankQueryService = new QueryClientImpl(rpcClient);

  const { balances } = await bankQueryService.AllBalances({
    address,
  });

  return balances;
};
