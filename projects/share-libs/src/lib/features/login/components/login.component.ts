import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { englishNumberFormatValidator } from '../../../core/validators/english-number-format.validator';
import { LoginReq } from 'projects/staff/src/app/api/cinePOS-api';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginDataEmit = new EventEmitter<LoginReq>();
  @Input() logoSrc = '';

  constructor(
    private fb: UntypedFormBuilder,
  ) { }
  form = this.fb.group({
    staffId: ['', [Validators.required, englishNumberFormatValidator()]],
    password: ['', Validators.required],
  });
  ngOnInit(): void {
  }
  onSubmit(): void{
    if(this.form.invalid){return}
    this.loginDataEmit.emit(this.form.value);
  }
}
