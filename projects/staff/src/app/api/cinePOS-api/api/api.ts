export * from './account.service';
import { AccountService } from './account.service';
export * from './member.service';
import { MemberService } from './member.service';
export const APIS = [AccountService, MemberService];
