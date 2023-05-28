export enum StorageEnum {
  /**
   * 登入token(JWT)
   * */
  token = 'token',
  /**
   * 員編
   * - 正常來說應該要寫一支用token取得個人資料的 API，但是現在只有用員編取資料，暫時忽略安全性
   */
  staffId = 'staffId'
}
