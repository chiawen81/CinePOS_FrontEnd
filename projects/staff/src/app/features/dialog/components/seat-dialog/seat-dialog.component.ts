import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';

@Component({
  selector: 'app-seat-dialog',
  templateUrl: './seat-dialog.component.html',
  styleUrls: ['./seat-dialog.component.scss']
})
export class SeatDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string, // data 就就是場次ID(scheduleId)
    private router: Router,
  ) { }
  seatData: any = {
    "sold": 16,
    "free": 184,
    "maxRows": 10,
    "maxColumns": 26,
    "rowLabel": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "",
        "F",
        "G",
        "H",
        "I"
    ],
    "colLabel": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24"
    ],
    "list": [
        {
            "rows": "A",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "-1"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "-1"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "-1"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "N"
                }
            ]
        },
        {
            "rows": "B",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "N"
                }
            ]
        },
        {
            "rows": "C",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "D",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "E",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "none"
        },
        {
            "rows": "F",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 1,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 1,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "G",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "H",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        },
        {
            "rows": "I",
            "seat": [
                {
                    "cols": "1",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "2",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "3",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "4",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "5",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "6",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "7",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "8",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "9",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "10",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "11",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "12",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "13",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "14",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "15",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "16",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "17",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "18",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "",
                    "status": 0,
                    "type": "N"
                },
                {
                    "cols": "19",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "20",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "21",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "22",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "23",
                    "status": 0,
                    "type": "0"
                },
                {
                    "cols": "24",
                    "status": 0,
                    "type": "0"
                }
            ]
        }
    ]
}
  ngOnInit(): void {
    console.log('我在這裡',this.data);
  }

  goTicketType(): void {
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.TICKET_TYPE}`]
    );
  }

}
