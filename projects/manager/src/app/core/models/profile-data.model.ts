
export class ProfileData {
  name: string;
  staffId: string;
  imgUrl: string;
  constructor(data: ProfileData) {
    this.name = data.name|| '';
    this.staffId = data.staffId || '';
    this.imgUrl = data.imgUrl || '';
  }
}
