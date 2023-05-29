export interface ShopCartInterface {
  /**票券陣列 */
  ticket: ticketInterface[];
  /**座位陣列 */
  seat: seatInterface[];
  /**電影ID */
  movieId: string;
  /**電影名稱 */
  title: string;
  /**場次ID */
  scheduleId: string;
}

export interface seatInterface {
  /**座位ID */
  seatId: string;
  /**座位名稱(A12) */
  seatName: string;
}

export interface ticketInterface {
  /**電影票ID */
  ticketId: string
  /**票種ID */
  ticketTypeId: string;
  /**票種名稱 */
  ticketType: string;
  /**票價 */
  price: number,
}
