export class CinePageSet {
  /** 資料總數 */
  totalCounts = 0;
  /** 目前頁數 */
  private pageIndex = 1;
  /** 每頁顯示筆數 */
  private pageSize = 10;
  sort?: string;
  isSequence?: boolean;
  constructor() {
    this.initialize();
  }

  initialize(): void;
  /**
   * Passing 1 args for initailize which need totalCounts
   * @param totalCounts totalCounts
   */
  // tslint:disable-next-line: unified-signatures
  initialize(totalCounts: number): void;

  /**
   * Passing 2 args for initailize which need sortby
   * @param sort key for sorting
   * @param isSequence boolean
   */
  initialize(sort: string, isSequence: boolean): void;
  /**
   * Passing 3 args for initailize which need sortby
   * @param sort key for sorting
   * @param isSequence boolean
   * @param size: pagesize
   */
  // tslint:disable-next-line: unified-signatures
  initialize(sort: string, isSequence: boolean, size: number): void;

  /**
   * Only 1 arg will reset [totalCounts]
   */
  initialize(...args: any): void {
    switch (args.length) {
      case 0:
        this.currentPage = 1;
        this.totalCounts = 0;
        return;
      case 1:
        this.currentPage = 1;
        this.totalCounts = args[0];
        return;
      case 2:
        this.currentPage = 1;
        this.sort = args[0];
        this.isSequence = args[1];
        this.totalCounts = 0;
        return;
      case 3:
        this.currentPage = 1;
        this.sort = args[0];
        this.isSequence = args[1];
        this.pageSize = args[2];
        this.totalCounts = 0;
        return;
    }

  }

  /** 
   * 將資料分頁顯示
   * - 註：原則上不應由前端分頁
   **/
  slicePage(list: any[], currentPage: number, currentPageSize: number): any[] {
    return (list).slice((currentPage - 1) * currentPageSize,
      currentPage * currentPageSize);
  }

  /** 總頁數 */
  get totalPages(): number {
    const pages = Math.ceil(this.totalCounts / this.pageSize);
    return pages > 0 ? pages : 1;
  }

  get currentPage(): number {
    return this.pageIndex;
  }

  set currentPage(index: number) {
    this.pageIndex = index;
  }

  get currentPageSize(): number {
    return this.pageSize;
  }

  set currentPageSize(size: number) {
    this.pageIndex = 1;
    this.pageSize = size;
  }

  get dataIndex(): number {
    return (this.pageIndex - 1) * this.pageSize;
  }

  get pageParams(): any {
    return {
      isSequence: this.isSequence,
      sort: this.sort,
      currentPage: this.currentPage,
      currentPageSize: this.currentPageSize
    };
  }
}
