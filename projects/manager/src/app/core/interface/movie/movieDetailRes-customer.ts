export interface MovieDetailResCustomer {
  /**
   * 電影編號
   */
  id?: string;
  /**
   * 電影中文名
   */
  title?: string;
  /**
   * 電影英文名
   */
  enTitle?: string;
  /**
   * 電影類型
   */
  genre?: Array<number>;
  /**
   * 電影類型文字
   */
  genreName?: Array<string>;
  /**
   * 片長
   */
  runtime?: number;
  /**
   * 支援設備
   */
  provideVersion?: Array<number>;
  /**
   * 支援設備文字
   */
  provideVersionName?: Array<string>;
  /**
   * 分級制度
   */
  rate?: number;
  /**
   * 分級制度文字
   */
  rateName?: string;
  /**
   * 導演
   */
  director?: string;
  /**
   * 演員
   */
  cast?: Array<string>;
  /**
   * 電影簡介
   */
  description?: string;
  /**
   * 上映狀態
   */
  status?: number;
  /**
   * 上映狀態文字
   */
  statusName?: string;
  releaseDate?: Date;
  /**
   * 預告片連結
   */
  trailerLink?: string;
  /**
   * 發行商
   */
  distributor?: string;
  /**
   * 海報連結
   */
  posterUrl?: string;
}
