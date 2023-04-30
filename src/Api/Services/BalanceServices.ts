import { IBalanceUpdatePayload } from "../Models/Balance";
import {httpCommon} from "../http-common";
import { AxiosResponse } from "axios";

const Route = "/balances";

const getBalances = async (): Promise<AxiosResponse<IBalanceUpdatePayload[], any>> => {
  return await httpCommon.get<IBalanceUpdatePayload[]>(Route);
}

const getBalanceById = async (id: string): Promise<AxiosResponse<IBalanceUpdatePayload, any>> => {
    return await httpCommon.get<IBalanceUpdatePayload>(`${Route}/${id}`);
    }

const updateBalance = async (id: string, balance: IBalanceUpdatePayload): Promise<AxiosResponse<IBalanceUpdatePayload, any>> => {
    return await httpCommon.post<IBalanceUpdatePayload>(`${Route}/${id}`, balance);
}

const checkout = async (id: string): Promise<AxiosResponse<IBalanceUpdatePayload, any>> => {
    return await httpCommon.put<IBalanceUpdatePayload>(`${Route}/checkout/${id}`);
}

const BalanceServices = {
    getBalances,
    getBalanceById,
    updateBalance,
    checkout
}

export default BalanceServices
