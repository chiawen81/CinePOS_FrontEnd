export interface SeatData {
  seatIndex: number;
  type: seatType;
}

export type seatType = '0' | 'N' | '-1' | '1';
