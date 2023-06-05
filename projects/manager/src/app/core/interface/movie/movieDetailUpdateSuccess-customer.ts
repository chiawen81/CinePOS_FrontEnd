import { MovieDetailUpdateParameterCustomer } from "./movieDetailUpdateParameter-customer";

// 更新成功回資料
export interface MovieDetailUpdateSuccessCustomer {
  code?: number;
  message?: string;
  data?: MovieDetailUpdateParameterCustomer;
}
