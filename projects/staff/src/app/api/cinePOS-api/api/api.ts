export * from './common.service';
import { CommonService } from './common.service';
export * from './manager.service';
import { ManagerService } from './manager.service';
export * from './staff.service';
import { StaffService } from './staff.service';
export const APIS = [CommonService, ManagerService, StaffService];
