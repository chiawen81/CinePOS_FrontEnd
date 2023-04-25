import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { englishNumberFormatValidator } from '../../../core/validators/english-number-format.validator';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: UntypedFormBuilder,
  ) { }
  form = this.fb.group({
    staffId: ['', [ Validators.required, englishNumberFormatValidator()] ],
    password: ['', Validators.required],
  });
  hide = true;
  ngOnInit(): void {
  }

}
