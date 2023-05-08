"use strict";(self.webpackChunkmanager=self.webpackChunkmanager||[]).push([[940],{6940:(S,c,u)=>{u.r(c),u.d(c,{LoginPageModule:()=>I});var p=u(6895),t=u(4650),l=u(4006);let d=(()=>{class n{constructor(e){this._ngControl=e}handleInput(e){const o=e.currentTarget;o.value=o.value.toUpperCase(),this._ngControl.control?.setValue(o.value),this._ngControl.control?.updateValueAndValidity()}handlePaste(e){e.preventDefault();const i=e.clipboardData?.getData("text")?.replace(/\s+/g,"").toUpperCase();this._ngControl.control?.setValue(i),this._ngControl.control?.updateValueAndValidity()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.a5))},n.\u0275dir=t.lG2({type:n,selectors:[["","toUpperCase",""]],hostBindings:function(e,o){1&e&&t.NdJ("input",function(a){return o.handleInput(a)})("paste",function(a){return o.handlePaste(a)})}}),n})(),g=(()=>{class n{constructor(e){this._ngControl=e}handleInput(e){" "===e.key&&e.preventDefault()}handlePaste(e){e.preventDefault();const i=e.clipboardData?.getData("text")?.replace(/\s+/g,"");this._ngControl.control?.setValue(i),this._ngControl.control?.updateValueAndValidity()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.a5))},n.\u0275dir=t.lG2({type:n,selectors:[["","noWhiteSpace",""]],hostBindings:function(e,o){1&e&&t.NdJ("keydown",function(a){return o.handleInput(a)})("paste",function(a){return o.handlePaste(a)})}}),n})();var s=u(9549),f=u(4144),h=u(4859);function v(n,r){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const e=t.oxw();let o;t.xp6(1),t.hij(" ",null==(o=e.form.get("staffId"))||null==o.errors?null:o.errors.englishNumberInvalid," ")}}let C=(()=>{class n{constructor(e){this.fb=e,this.loginDataEmit=new t.vpe,this.logoSrc="",this.form=this.fb.group({staffId:["",[l.kI.required,n=>{const r=n.value??"";var e=new RegExp(/[^\a-\z\A-\Z0-9]/).test(r);return r&&e?{englishNumberInvalid:"\u8acb\u8f38\u5165\u82f1\u6216\u6578\u5b57"}:null}]],password:["",l.kI.required]})}ngOnInit(){}onSubmit(){this.form.invalid||this.loginDataEmit.emit(this.form.value)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.QS))},n.\u0275cmp=t.Xpm({type:n,selectors:[["lib-login"]],inputs:{logoSrc:"logoSrc"},outputs:{loginDataEmit:"loginDataEmit"},decls:24,vars:6,consts:[[1,"w-80"],[1,"flex","justify-center","items-center","w-full"],["alt","logo",3,"src"],[1,"ml-4","text-4xl"],[1,"example-form","w-full","mt-14",3,"formGroup","ngSubmit"],["appearance","fill",1,"example-full-width","w-full"],["matInput","","toUpperCase","","noWhiteSpace","","placeholder","\u8acb\u8f38\u5165\u5e33\u865f","formControlName","staffId","type","text"],[4,"ngIf"],[1,"-mt-2"],["matInput","","placeholder","\u8acb\u8f38\u5165\u5bc6\u78bc","formControlName","password","type","password"],["mat-raised-button","","color","primary","type","submit",1,"w-full",3,"disabled"],[1,"text-center","mt-2"],["mat-button","","type","button"]],template:function(e,o){if(1&e&&(t.TgZ(0,"section",0)(1,"div",1),t._UZ(2,"img",2),t.TgZ(3,"h1",3),t._uU(4,"CinePOS"),t.qZA()(),t.TgZ(5,"form",4),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(6,"ul")(7,"li")(8,"mat-form-field",5)(9,"mat-label"),t._uU(10,"\u5e33\u865f"),t.qZA(),t._UZ(11,"input",6),t.YNc(12,v,2,1,"mat-error",7),t.qZA()(),t.TgZ(13,"li",8)(14,"mat-form-field",5)(15,"mat-label"),t._uU(16,"\u5bc6\u78bc"),t.qZA(),t._UZ(17,"input",9),t.qZA()(),t.TgZ(18,"li")(19,"button",10),t._uU(20,"\u767b\u5165"),t.qZA()(),t.TgZ(21,"li",11)(22,"button",12),t._uU(23,"\u5fd8\u8a18\u5bc6\u78bc"),t.qZA()()()()()),2&e){let i,a;t.xp6(2),t.Q6J("src",o.logoSrc,t.LSH),t.xp6(3),t.Q6J("formGroup",o.form),t.xp6(3),t.ekj("mb-4",null==(i=o.form.get("staffId"))||null==i.errors?null:i.errors.englishNumberInvalid),t.xp6(4),t.Q6J("ngIf",null==(a=o.form.get("staffId"))||null==a.errors?null:a.errors.englishNumberInvalid),t.xp6(7),t.Q6J("disabled",o.form.invalid)}},dependencies:[p.O5,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,d,g,s.TO,s.KE,s.hX,f.Nt,h.lW]}),n})(),D=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login-page"]],decls:2,vars:0,consts:[[1,"w-screen","h-screen","flex","justify-center","items-center"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t._UZ(1,"lib-login"),t.qZA())},dependencies:[C]}),n})();var y=u(3456),Z=u(7827);const b=[{path:"",component:D}];let I=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[p.ez,y.Bz.forChild(b),Z.Pu]}),n})()}}]);