import { Component, OnInit } from '@angular/core';
import { RefundService } from './services/refund.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-refund-page',
  templateUrl: './refund-page.component.html',
  styleUrls: ['./refund-page.component.scss']
})
export class RefundPageComponent implements OnInit {
  form = this.fb.group({
    orderId: ['', [Validators.required]],
  });

  task: Task = {
    name: '全選',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Accent1', completed: false, color: 'accent'},
      {name: 'Accent2', completed: false, color: 'accent'},
      {name: 'Accent3', completed: false, color: 'accent'},
      {name: 'Accent4', completed: false, color: 'accent'},
    ],
  };
  allComplete: boolean = false;

  constructor(
    private refundService:RefundService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {

  }
  tt(): void{
    console.log(this.task);
  }
  findOrderInfo():void{
    if (this.form.invalid) { return };
    this.refundService.v1StaffRefundOrderIdGet$(this.form.value.orderId)
    .subscribe((res)=>{
      console.log('res',res);
    })
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
