/**
 * CinePOS_BackEnd
 * CinePOS 後端API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { TimetableListResDataEndDate } from './timetableListResDataEndDate';
import { TimetableListResDataStartDate } from './timetableListResDataStartDate';

export interface TimetableUpdateReq { 
    /**
     * id
     */
    id: string;
    /**
     * 電影ID
     */
    movieId: string;
    /**
     * 廳院ID
     */
    theaterId: string;
    startDate: TimetableListResDataStartDate;
    endDate: TimetableListResDataEndDate;
}