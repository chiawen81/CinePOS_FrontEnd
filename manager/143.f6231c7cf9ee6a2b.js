"use strict";(self.webpackChunkmanager=self.webpackChunkmanager||[]).push([[143],{2143:(j,Z,l)=>{l.r(Z),l.d(Z,{MoviePageModule:()=>z});var u=l(6895),g=l(3456),s=l(8526),i=l(4006),c=(()=>{return(n=c||(c={})).token="token",n.profileData="profileData",c;var n})(),e=l(4650),p=l(8505),f=l(9300),A=l(9233);let M=(()=>{class n{constructor(o){this._ManagerService=o}getMovieDetail(o){return this._ManagerService.v1ManagerMovieIdGet(o).pipe((0,p.b)(t=>1!==t.code&&alert(t.message)),(0,f.h)(t=>1===t.code))}uploadImage(o,t){return this._ManagerService.v1ManagerUserStickerStaffIdPostForm(o,t).pipe((0,p.b)(a=>1!==a.code&&alert(a.message)),(0,f.h)(a=>1===a.code))}createMovieDetail(o){return this._ManagerService.v1ManagerMoviePost(o).pipe((0,p.b)(t=>1!==t.code&&alert(t.message)),(0,f.h)(t=>1===t.code))}updateMovieDetail(o){return this._ManagerService.v1ManagerMoviePatch(o).pipe((0,p.b)(t=>1!==t.code&&alert(t.message)),(0,f.h)(t=>1===t.code))}}return n.\u0275fac=function(o){return new(o||n)(e.LFG(A.bo))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),U=(()=>{class n{constructor(){}setSessionStorage(o,t){const a=JSON.stringify(t);sessionStorage.setItem(o,a)}getSessionStorage(o){const t=sessionStorage.getItem(o);return JSON.parse(t)??null}removeSessionStorage(o){sessionStorage.removeItem(o)}clearSessionStorage(){sessionStorage.clear()}setLocalStorage(o,t){const a=JSON.stringify(t);localStorage.setItem(o,a)}getLocalStorage(o){const t=localStorage.getItem(o);return JSON.parse(t)??null}removeLocalStorage(o){localStorage.removeItem(o)}clearLocalStorage(){localStorage.clear()}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var d=l(9549),h=l(4144),_=l(1948),I=l(4385),P=l(3238),v=l(9602),O=l(4859);function q(n,r){if(1&n){const o=e.EpF();e.TgZ(0,"button",50),e.NdJ("click",function(){e.CHM(o);const a=e.oxw(2);return e.KtG(a.addCast())}),e._uU(1,"+"),e.qZA()}}function x(n,r){if(1&n){const o=e.EpF();e.TgZ(0,"img",51),e.NdJ("click",function(){e.CHM(o);const a=e.oxw().index,m=e.oxw();return e.KtG(m.removeCast(a))}),e.qZA()}}function w(n,r){if(1&n&&(e.TgZ(0,"div",46),e._UZ(1,"input",47),e.TgZ(2,"div",46),e.YNc(3,q,2,0,"button",48),e.YNc(4,x,1,0,"img",49),e.qZA()()),2&n){const o=r.index;e.xp6(1),e.Q6J("formControlName",o),e.xp6(2),e.Q6J("ngIf",0===o),e.xp6(1),e.Q6J("ngIf",o)}}function D(n,r){if(1&n&&(e.TgZ(0,"mat-radio-button",52),e._uU(1),e.qZA()),2&n){const o=r.$implicit;e.Q6J("value",o.value),e.xp6(1),e.Oqu(o.name)}}function k(n,r){if(1&n&&(e.TgZ(0,"mat-option",5),e._uU(1),e.qZA()),2&n){const o=r.$implicit;e.Q6J("value",o.value),e.xp6(1),e.Oqu(o.name)}}function y(n,r){if(1&n&&(e.TgZ(0,"mat-option",5),e._uU(1),e.qZA()),2&n){const o=r.$implicit;e.Q6J("value",o.value),e.xp6(1),e.Oqu(o.name)}}function S(n,r){if(1&n&&e._UZ(0,"img",53),2&n){const o=e.oxw();e.s9C("src",o.posterUrl.value,e.LSH)}}const F=function(n){return{"align-items-start":n}};let b=(()=>{class n{constructor(o,t,a,m){this._Route=o,this._MoviePageService=t,this._StorageService=a,this._ChangeDetectorRef=m,this.isEdit=!1}get id(){return this.formGroup.get("id")}get title(){return this.formGroup.get("title")}get enTitle(){return this.formGroup.get("enTitle")}get genre(){return this.formGroup.get("genre")}get runtime(){return this.formGroup.get("runtime")}get provideVersion(){return this.formGroup.get("provideVersion")}get rate(){return this.formGroup.get("rate")}get director(){return this.formGroup.get("director")}get cast(){return this.formGroup.get("cast")}get description(){return this.formGroup.get("description")}get status(){return this.formGroup.get("status")}get releaseDate(){return this.formGroup.get("releaseDate")}get trailerLink(){return this.formGroup.get("trailerLink")}get distributor(){return this.formGroup.get("distributor")}get posterUrl(){return this.formGroup.get("posterUrl")}ngOnInit(){this.initForm(),this.isEdit="edit"===this._Route.snapshot?.url[1]?.path,console.log("isEdit",this.isEdit,this._Route.snapshot),this.login(),this.getOptionAPI(),this.isEdit?this.getMovieInfoAPI(this._Route.snapshot.params.id):this.addCast()}ngAfterViewInit(){this._ChangeDetectorRef.detectChanges()}initForm(){this.formGroup=new i.cw({id:new i.NI("",[i.kI.required]),title:new i.NI("",[i.kI.required]),enTitle:new i.NI("",[i.kI.pattern(/^[a-zA-Z0-9\s]*$/)]),genre:new i.NI(null,[i.kI.required]),runtime:new i.NI(null,[i.kI.required]),provideVersion:new i.NI(null,[i.kI.required]),rate:new i.NI(null,[i.kI.required]),director:new i.NI(""),cast:new i.Oe([]),description:new i.NI("",[i.kI.maxLength(300)]),status:new i.NI(0,[i.kI.required]),releaseDate:new i.NI(null,[i.kI.required]),trailerLink:new i.NI("",[i.kI.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)]),distributor:new i.NI(""),posterUrl:new i.NI("",[i.kI.required])})}setForm(o){this.isEdit&&(this.formGroup.patchValue(o),o.cast.forEach(t=>{this.cast.push(new i.NI(t))})),this._ChangeDetectorRef.detectChanges(),console.log("formGroup- \u5e36\u503c",this.formGroup)}addCast(){this.cast.push(new i.NI(""))}removeCast(o){this.cast.removeAt(o)}onFileSelect(o){if(o.target.files.length>0){const t=o.target.files[0];console.log("\u4e0a\u50b3\u6a94\u6848\u539f\u59cb\u6a94",t),this.postPosterAPI(t)}}getErrorMsg(o){let t="",a=o.errors;return a&&(o.touched||o.dirty)&&(a.required?t="\u6b64\u70ba\u5fc5\u586b\u6b04\u4f4d":a.pattern&&(t="\u683c\u5f0f\u932f\u8aa4")),t}getCreateMovieDetailPara(){let o={id:this.id.value,title:this.title.value,enTitle:this.enTitle.value,genre:this.genre.value,runtime:this.runtime.value,provideVersion:this.provideVersion.value,rate:this.rate.value,director:this.director.value,cast:this.cast.value,description:this.description.value,status:this.status.value,releaseDate:this.releaseDate.value,trailerLink:this.trailerLink.value,distributor:this.distributor.value,posterUrl:this.posterUrl.value};return console.log("\u9001\u55ae\u53c3\u6578",o),o}submit(){if(console.log(this.formGroup),this.formGroup.valid){let o=this.getCreateMovieDetailPara();this.isEdit?this.patchUpdateMovieDetailAPI(o):this.postCreateMovieDetailAPI(o)}else this.formGroup.markAllAsTouched(),alert("\u8acb\u586b\u5beb\u5fc5\u586b\u6b04\u4f4d")}getMovieInfoAPI(o){setTimeout(()=>{this._MoviePageService.getMovieDetail(o).subscribe(t=>{console.log(t),this.movieInfoAPI=t.data,this._ChangeDetectorRef.detectChanges(),this.setForm(this.movieInfoAPI)})})}postPosterAPI(o){(new FormData).append("image",o),this._MoviePageService.uploadImage(o,"B0001").subscribe(a=>{console.log("\u4e0a\u50b3\u6a94\u6848\u6210\u529fresponse",a),this.posterUrl.setValue(a.data?.stickerUrl)})}postCreateMovieDetailAPI(o){this._MoviePageService.createMovieDetail(o).subscribe(t=>{console.log("\u65b0\u589e\u96fb\u5f71\u8cc7\u8a0a-\u6210\u529fres",t),alert(t.message)})}patchUpdateMovieDetailAPI(o){this._MoviePageService.updateMovieDetail(o).subscribe(t=>{console.log("\u66f4\u65b0\u96fb\u5f71\u8cc7\u8a0a-\u6210\u529fres",t),alert(t.message)})}getOptionAPI(){this.genreOptions=[{name:"\u52d5\u4f5c",value:1},{name:"\u5192\u96aa",value:2},{name:"\u559c\u5287",value:3},{name:"\u5287\u60c5",value:4},{name:"\u6050\u6016",value:5},{name:"\u79d1\u5e7b",value:6},{name:"\u6d6a\u6f2b\u611b\u60c5",value:7},{name:"\u52d5\u756b",value:8},{name:"\u7d00\u9304\u7247",value:9},{name:"\u97f3\u6a02",value:10},{name:"\u61f8\u7591",value:11},{name:"\u9a5a\u609a",value:12},{name:"\u72af\u7f6a",value:13}],this._ChangeDetectorRef.detectChanges(),this.provideVersionOptions=[{name:"2D",value:1},{name:"3D",value:2},{name:"IMAX",value:3},{name:"4DX",value:4}],this._ChangeDetectorRef.detectChanges(),this.rateOptions=[{name:"\u666e\u901a\u7d1a",value:0},{name:"\u4fdd\u8b77\u7d1a",value:6},{name:"\u8f1412",value:12},{name:"\u8f1415",value:15},{name:"\u9650\u5236\u7d1a",value:18}],this._ChangeDetectorRef.detectChanges()}login(){this._StorageService.setLocalStorage(c.token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDA1MTEyNiwiZXhwIjoxNjg0MzEwMzI2fQ.LTT8tH9va3GaO8o7K1u9ekAOYoKYWWWTEEigN32ziOg"),this._StorageService.setLocalStorage(c.profileData,{name:"\u6587\u6587\u7de8\u8f2f\u9801\u6e2c\u8a66",staffId:"B0001",imgUrl:"assets/images/angular-icon.webp"})}getFormConsole(){console.log("formGroup- \u53d6\u503c",this.formGroup)}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(g.gz),e.Y36(M),e.Y36(U),e.Y36(e.sBO))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-movie-detail-page"]],decls:138,vars:22,consts:[[1,"wrapper-page","utility-common-back",3,"formGroup"],[1,"form-select","flex","justify-end","mb-10"],[1,"flex","flex-col","justify-center","items-center"],["appearance","fill",1,"w-100"],["formControlName","status"],[3,"value"],[1,"text-12","mt-5","text-warn-100"],[1,"form-common-back","utility-common-back","mb-50"],[1,"form-area-title",3,"click"],[1,"row"],[1,"form-title"],[1,"text-warn-100"],[1,"form-content"],["type","text","formControlName","title",1,"form-input","w-300"],["type","text","formControlName","enTitle",1,"form-input","w-300"],[1,"form-date"],[1,"w-300"],["matInput","","formControlName","releaseDate",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],[1,"form-common-back","utility-common-back","mb-20"],[1,"form-area-title"],["type","text","formControlName","director",1,"form-input","w-300"],[1,"row","align-items-start"],["formArrayName","cast",1,"form-content","flex","flex-col"],["class","flex",4,"ngFor","ngForOf"],["type","text","formControlName","runtime",1,"form-input","w-300","mr-10"],[1,"form-radio","list-row","text-12"],["aria-label","Select an option","formControlName","rate"],["class","mr-25",3,"value",4,"ngFor","ngForOf"],[1,"form-select","select-small"],["appearance","fill",1,"w-300"],["multiple","","formControlName","genre"],[3,"value",4,"ngFor","ngForOf"],[1,"form-select"],["multiple","","formControlName","provideVersion"],["mat-raised-button","",1,"secondary"],["name","","id","","cols","30","rows","10","formControlName","description","maxlength","300","placeholder","\u9650\u8f38\u5165300\u5b57",1,"form-input","input-textarea","mt-10"],[1,"row",3,"ngClass"],["mat-raised-button","","type","submit",1,"secondary",3,"click"],["type","file",1,"hidden",3,"change"],["fileUpload",""],["alt","","class","h-300 w-auto mt-10",3,"src",4,"ngIf"],["type","text","formControlName","trailerLink",1,"form-input","w-full","mr-10"],["type","text","formControlName","distributor",1,"form-input","w-full","mr-10"],["mat-raised-button","","color","primary","type","submit",1,"w-60","float-right"],[1,"flex"],["type","text",1,"form-input","w-300","mr-10",3,"formControlName"],["class","secondary btn-icon mr-10","mat-raised-button","",3,"click",4,"ngIf"],["class","ml-10 cursor-pointer","src","../../../../assets/images/icon/cross.svg","alt","",3,"click",4,"ngIf"],["mat-raised-button","",1,"secondary","btn-icon","mr-10",3,"click"],["src","../../../../assets/images/icon/cross.svg","alt","",1,"ml-10","cursor-pointer",3,"click"],[1,"mr-25",3,"value"],["alt","",1,"h-300","w-auto","mt-10",3,"src"]],template:function(o,t){if(1&o){const a=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-form-field",3)(4,"mat-label"),e._uU(5,"\u8acb\u9078\u64c7"),e.qZA(),e.TgZ(6,"mat-select",4)(7,"mat-option",5),e._uU(8,"\u5df2\u4e0b\u7dda"),e.qZA(),e.TgZ(9,"mat-option",5),e._uU(10,"\u7c4c\u5099\u4e2d"),e.qZA(),e.TgZ(11,"mat-option",5),e._uU(12,"\u4e0a\u6620\u4e2d"),e.qZA()()(),e.TgZ(13,"p",6),e._uU(14),e.qZA()()(),e.TgZ(15,"div",7)(16,"h3",8),e.NdJ("click",function(){return t.getFormConsole()}),e._uU(17,"\u57fa\u672c\u8cc7\u8a0a"),e.qZA(),e.TgZ(18,"div",9)(19,"span",10)(20,"i",11),e._uU(21,"*"),e.qZA(),e._uU(22,"\u96fb\u5f71\u4e2d\u6587\u540d"),e.qZA(),e.TgZ(23,"div",12),e._UZ(24,"input",13),e.TgZ(25,"p",6),e._uU(26),e.qZA()()(),e.TgZ(27,"div",9)(28,"span",10),e._uU(29,"\u96fb\u5f71\u82f1\u6587\u540d"),e.qZA(),e.TgZ(30,"div",12),e._UZ(31,"input",14),e.TgZ(32,"p",6),e._uU(33),e.qZA()()(),e.TgZ(34,"div",9)(35,"span",10),e._uU(36,"\u9810\u5b9a\u4e0a\u6620\u65e5\u671f"),e.qZA(),e.TgZ(37,"div",12)(38,"div",15)(39,"mat-form-field",16),e._UZ(40,"input",17),e.TgZ(41,"mat-hint"),e._uU(42,"MM/DD/YYYY"),e.qZA(),e._UZ(43,"mat-datepicker-toggle",18)(44,"mat-datepicker",null,19),e.qZA()()()()(),e.TgZ(46,"div",20)(47,"h3",21),e._uU(48,"\u96fb\u5f71\u8cc7\u8a0a"),e.qZA(),e.TgZ(49,"div",9)(50,"span",10),e._uU(51,"\u5c0e\u6f14"),e.qZA(),e.TgZ(52,"div",12),e._UZ(53,"input",22),e.qZA()(),e.TgZ(54,"div",23)(55,"span",10),e._uU(56,"\u4e3b\u6f14"),e.qZA(),e.TgZ(57,"div",24),e.YNc(58,w,5,3,"div",25),e.qZA()(),e.TgZ(59,"div",9)(60,"span",10)(61,"i",11),e._uU(62,"*"),e.qZA(),e._uU(63,"\u7247\u9577"),e.qZA(),e.TgZ(64,"div",12),e._UZ(65,"input",26),e._uU(66,"\u5206\u9418 "),e.TgZ(67,"p",6),e._uU(68),e.qZA()()(),e.TgZ(69,"div",9)(70,"span",10)(71,"i",11),e._uU(72,"*"),e.qZA(),e._uU(73,"\u5206\u7d1a"),e.qZA(),e.TgZ(74,"div",12)(75,"div",27)(76,"mat-radio-group",28),e.YNc(77,D,2,2,"mat-radio-button",29),e.qZA()(),e.TgZ(78,"p",6),e._uU(79),e.qZA()()(),e.TgZ(80,"div",9)(81,"span",10)(82,"i",11),e._uU(83,"*"),e.qZA(),e._uU(84,"\u5287\u60c5\u985e\u578b"),e.qZA(),e.TgZ(85,"div",12)(86,"div",30)(87,"mat-form-field",31)(88,"mat-label"),e._uU(89,"\u8acb\u9078\u64c7"),e.qZA(),e.TgZ(90,"mat-select",32),e.YNc(91,k,2,2,"mat-option",33),e.qZA()()(),e.TgZ(92,"p",6),e._uU(93),e.qZA()()(),e.TgZ(94,"div",9)(95,"span",10),e._uU(96,"\u652f\u63f4\u786c\u9ad4\u8a2d\u5099"),e.qZA(),e.TgZ(97,"div",12)(98,"div",34)(99,"mat-form-field",31)(100,"mat-label"),e._uU(101,"\u8acb\u9078\u64c7"),e.qZA(),e.TgZ(102,"mat-select",35),e.YNc(103,y,2,2,"mat-option",33),e.qZA()()()()(),e.TgZ(104,"div",23)(105,"span",10),e._uU(106,"\u96fb\u5f71\u4ecb\u7d39"),e.qZA(),e.TgZ(107,"div",12)(108,"button",36),e._uU(109,"\u4e00\u9375\u6f64\u98fe"),e.qZA(),e._UZ(110,"textarea",37),e.qZA()(),e.TgZ(111,"div",38)(112,"span",10)(113,"i",11),e._uU(114,"*"),e.qZA(),e._uU(115,"\u5c01\u7247\u5716\u7247"),e.qZA(),e.TgZ(116,"div",12)(117,"button",39),e.NdJ("click",function(){e.CHM(a);const C=e.MAs(120);return e.KtG(C.click())}),e._uU(118,"\u4e0a\u50b3\u6a94\u6848"),e.qZA(),e.TgZ(119,"input",40,41),e.NdJ("change",function(C){return t.onFileSelect(C)}),e.qZA(),e.TgZ(121,"p",6),e._uU(122),e.qZA(),e.YNc(123,S,1,1,"img",42),e.qZA()(),e.TgZ(124,"div",9)(125,"span",10),e._uU(126,"\u9810\u544a\u7247\u9023\u7d50"),e.qZA(),e.TgZ(127,"div",12),e._UZ(128,"input",43),e.TgZ(129,"p",6),e._uU(130),e.qZA()()(),e.TgZ(131,"div",9)(132,"span",10),e._uU(133,"\u767c\u884c\u5546"),e.qZA(),e.TgZ(134,"div",12),e._UZ(135,"input",44),e.qZA()()(),e.TgZ(136,"button",45),e._uU(137,"\u9001\u51fa"),e.qZA()()}if(2&o){const a=e.MAs(45);e.Q6J("formGroup",t.formGroup),e.xp6(7),e.Q6J("value",-1),e.xp6(2),e.Q6J("value",0),e.xp6(2),e.Q6J("value",1),e.xp6(3),e.Oqu(t.getErrorMsg(t.status)),e.xp6(12),e.Oqu(t.getErrorMsg(t.title)),e.xp6(7),e.Oqu(t.getErrorMsg(t.enTitle)),e.xp6(7),e.Q6J("matDatepicker",a),e.xp6(3),e.Q6J("for",a),e.xp6(15),e.Q6J("ngForOf",t.cast.controls),e.xp6(10),e.Oqu(t.getErrorMsg(t.runtime)),e.xp6(9),e.Q6J("ngForOf",t.rateOptions),e.xp6(2),e.Oqu(t.getErrorMsg(t.rate)),e.xp6(12),e.Q6J("ngForOf",t.genreOptions),e.xp6(2),e.Oqu(t.getErrorMsg(t.genre)),e.xp6(10),e.Q6J("ngForOf",t.provideVersionOptions),e.xp6(8),e.Q6J("ngClass",e.VKq(20,F,t.posterUrl.value)),e.xp6(11),e.Oqu(t.getErrorMsg(t.posterUrl)),e.xp6(1),e.Q6J("ngIf",null==t.posterUrl?null:t.posterUrl.value),e.xp6(7),e.Oqu(t.getErrorMsg(t.trailerLink))}},dependencies:[u.mk,u.sg,u.O5,i.Fj,i.JJ,i.JL,i.nD,i.sg,i.u,i.CE,d.KE,d.bx,d.hX,d.R9,h.Nt,_.VQ,_.U0,I.gD,P.ey,v.Mq,v.hl,v.nW,O.lW],styles:[".form-common-back[_ngcontent-%COMP%]{padding:25px 30px;background:#222222;border:1px solid rgba(255,255,255,.1);box-shadow:0 4px 40px #0006;border-radius:12px}.form-common-back[_ngcontent-%COMP%]   .form-area-title[_ngcontent-%COMP%]{padding-bottom:12px;font-size:16px;color:#dddddd80;font-weight:400}.form-common-back[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;padding-bottom:20px}.form-common-back[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .form-title[_ngcontent-%COMP%]{width:20%;font-weight:400;font-size:13px;color:#ddd}.form-common-back[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .form-content[_ngcontent-%COMP%]{width:80%;min-height:48px}.utility-common-back[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]{height:48px;padding:16px;background:#1A1A1A;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#ddd}.utility-common-back[_ngcontent-%COMP%]   .form-input.input-textarea[_ngcontent-%COMP%]{height:200px!important;width:100%!important}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field{font-size:12px}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper{padding-bottom:0!important}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper .mat-form-field-flex{padding:16px 12px!important;padding-bottom:12px;border-radius:8px!important}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:0;border-top:0}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-select-arrow-wrapper{margin-top:10px}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix .mat-form-field-label-wrappe{display:none}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-label.ng-tns-c38-2.ng-star-inserted{display:none}.utility-common-back[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]     mat-form-field .mat-form-field-label.ng-tns-c38-2.ng-star-inserted.mat-form-field-empty.mat-empty{display:inline-block!important}.utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-container{height:15px;width:15px}.utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-container .mat-radio-outer-circle, .utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-container .mat-radio-inner-circle{border-color:#fff!important}.utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-container .mat-radio-outer-circle{height:15px;width:15px;border-width:1px}.utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]     .mat-radio-button .mat-radio-container .mat-radio-inner-circle{height:15px;width:15px;background-color:#fff!important}.utility-common-back[_ngcontent-%COMP%]   .form-radio.list-row[_ngcontent-%COMP%]{height:auto;display:flex;flex-direction:row;align-items:center}.utility-common-back[_ngcontent-%COMP%]   .form-radio[_ngcontent-%COMP%]   .list-column[_ngcontent-%COMP%]{display:flex;flex-direction:column}.utility-common-back[_ngcontent-%COMP%]   .form-text[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:12px;height:48px}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-appearance-legacy .mat-form-field-infix{border-top:0!important}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper{padding-bottom:0!important}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper .mat-form-field-flex{border-top:0!important;display:flex;align-items:center;height:48px;background:#1A1A1A;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#ddd}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-infix{padding:0 12px}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper .mat-form-field-flex .mat-form-field-suffix{margin-right:5px}.utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper .mat-form-field-underline, .utility-common-back[_ngcontent-%COMP%]   .form-date[_ngcontent-%COMP%]     .mat-form-field-wrapper .mat-form-field-subscript-wrapper{display:none}.utility-common-back[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:6px 12px;letter-spacing:.1em;text-align:center;font-weight:500;font-size:12px}.utility-common-back[_ngcontent-%COMP%]   .btn.gray[_ngcontent-%COMP%]{border:1px solid rgba(255,255,255,.1);color:#ffffff80}.utility-common-back[_ngcontent-%COMP%]   .btn.small[_ngcontent-%COMP%]{border-radius:4px;height:30px}.utility-common-back[_ngcontent-%COMP%]   .btn.medium[_ngcontent-%COMP%]{border-radius:6px;height:42px}"]}),n})(),N=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-movie-page"]],decls:2,vars:0,template:function(o,t){1&o&&(e.TgZ(0,"p"),e._uU(1,"movie-page works!"),e.qZA())}}),n})();var T=l(5197),E=l(6387);function J(n,r){if(1&n&&(e.TgZ(0,"span",13),e._uU(1),e.qZA()),2&n){const o=r.$implicit;e.xp6(1),e.Oqu(o)}}function Y(n,r){if(1&n&&e._UZ(0,"img",14),2&n){const o=e.oxw();e.s9C("src",o.movieInfoAPI.posterUrl,e.LSH)}}const G=function(n){return{"align-items-start":n}},L=[{path:"",children:[{path:"",component:N},{path:`${s.F.DETAIL}/${s.F.CREATE}`,component:b},{path:s.F.DETAIL+"/:id",component:(()=>{class n{constructor(o,t,a,m){this._Route=o,this._MoviePageService=t,this._StorageService=a,this._ChangeDetectorRef=m}ngOnInit(){this.movieId=this._Route.snapshot?.params.id,console.log("movieId",this.movieId),this.login(),this.getMovieInfoAPI(this.movieId)}getMovieInfoAPI(o){setTimeout(()=>{this._MoviePageService.getMovieDetail(o).subscribe(t=>{console.log(t),this.movieInfoAPI=t.data,this._ChangeDetectorRef.detectChanges()})})}login(){this._StorageService.setLocalStorage(T.d.token,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDRmMGE5OTc3ZmRlZThmYTBiYzc1YSIsInN0YWZmSWQiOiJCMDAwMSIsImlhdCI6MTY4NDA1MTEyNiwiZXhwIjoxNjg0MzEwMzI2fQ.LTT8tH9va3GaO8o7K1u9ekAOYoKYWWWTEEigN32ziOg"),this._StorageService.setLocalStorage(T.d.profileData,{name:"\u6587\u6587\u6aa2\u8996\u9801\u6e2c\u8a66",staffId:"B0001",imgUrl:"assets/images/angular-icon.webp"})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(g.gz),e.Y36(M),e.Y36(E.V),e.Y36(e.sBO))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-movie-view-page"]],decls:87,vars:17,consts:[[1,"wrapper-page","utility-common-back"],[1,"form-select","flex","justify-end","mb-10"],[1,"form-text"],[1,"form-common-back","utility-common-back","mb-50"],[1,"form-area-title"],[1,"row"],[1,"form-title"],[1,"form-content"],[1,"form-common-back","utility-common-back","mb-20"],["class","mr-10",4,"ngFor","ngForOf"],[1,"row","align-items-start"],[1,"row",3,"ngClass"],["alt","","class","h-300 w-auto mt-10",3,"src",4,"ngIf"],[1,"mr-10"],["alt","",1,"h-300","w-auto","mt-10",3,"src"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"p",2),e._uU(3),e.qZA()(),e.TgZ(4,"div",3)(5,"h3",4),e._uU(6,"\u57fa\u672c\u8cc7\u8a0a"),e.qZA(),e.TgZ(7,"div",5)(8,"span",6),e._uU(9,"\u96fb\u5f71\u4e2d\u6587\u540d"),e.qZA(),e.TgZ(10,"div",7)(11,"p",2),e._uU(12),e.qZA()()(),e.TgZ(13,"div",5)(14,"span",6),e._uU(15,"\u96fb\u5f71\u82f1\u6587\u540d"),e.qZA(),e.TgZ(16,"div",7)(17,"p",2),e._uU(18),e.qZA()()(),e.TgZ(19,"div",5)(20,"span",6),e._uU(21,"\u9810\u5b9a\u4e0a\u6620\u65e5\u671f"),e.qZA(),e.TgZ(22,"div",7)(23,"p",2),e._uU(24),e.qZA()()()(),e.TgZ(25,"div",8)(26,"h3",4),e._uU(27,"\u96fb\u5f71\u8cc7\u8a0a"),e.qZA(),e.TgZ(28,"div",5)(29,"span",6),e._uU(30,"\u5c0e\u6f14"),e.qZA(),e.TgZ(31,"div",7)(32,"p",2),e._uU(33),e.qZA()()(),e.TgZ(34,"div",5)(35,"span",6),e._uU(36,"\u4e3b\u6f14"),e.qZA(),e.TgZ(37,"div",7)(38,"p",2),e.YNc(39,J,2,1,"span",9),e.qZA()()(),e.TgZ(40,"div",5)(41,"span",6),e._uU(42,"\u7247\u9577"),e.qZA(),e.TgZ(43,"div",7)(44,"p",2),e._uU(45),e.qZA()()(),e.TgZ(46,"div",5)(47,"span",6),e._uU(48,"\u5206\u7d1a"),e.qZA(),e.TgZ(49,"div",7)(50,"p",2),e._uU(51),e.qZA()()(),e.TgZ(52,"div",5)(53,"span",6),e._uU(54,"\u5287\u60c5\u985e\u578b"),e.qZA(),e.TgZ(55,"div",7)(56,"p",2),e._uU(57),e.qZA()()(),e.TgZ(58,"div",5)(59,"span",6),e._uU(60,"\u652f\u63f4\u786c\u9ad4\u8a2d\u5099"),e.qZA(),e.TgZ(61,"div",7)(62,"p",2),e._uU(63),e.qZA()()(),e.TgZ(64,"div",10)(65,"span",6),e._uU(66,"\u96fb\u5f71\u4ecb\u7d39"),e.qZA(),e.TgZ(67,"div",7)(68,"p",2),e._uU(69),e.qZA()()(),e.TgZ(70,"div",11)(71,"span",6),e._uU(72,"\u5c01\u7247\u5716\u7247"),e.qZA(),e.TgZ(73,"div",7),e.YNc(74,Y,1,1,"img",12),e.qZA()(),e.TgZ(75,"div",5)(76,"span",6),e._uU(77,"\u9810\u544a\u7247\u9023\u7d50"),e.qZA(),e.TgZ(78,"div",7)(79,"p",2),e._uU(80),e.qZA()()(),e.TgZ(81,"div",5)(82,"span",6),e._uU(83,"\u767c\u884c\u5546"),e.qZA(),e.TgZ(84,"div",7)(85,"p",2),e._uU(86),e.qZA()()()()()),2&o&&(e.xp6(3),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.status),e.xp6(9),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.title),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.enTitle),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.releaseDate),e.xp6(9),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.director),e.xp6(6),e.Q6J("ngForOf",null==t.movieInfoAPI?null:t.movieInfoAPI.cast),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.runtime),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.rate),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.genre),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.provideVersion),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.description),e.xp6(1),e.Q6J("ngClass",e.VKq(15,G,null==t.movieInfoAPI?null:t.movieInfoAPI.posterUrl)),e.xp6(4),e.Q6J("ngIf",null==t.movieInfoAPI?null:t.movieInfoAPI.posterUrl),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.trailerLink),e.xp6(6),e.Oqu(null==t.movieInfoAPI?null:t.movieInfoAPI.distributor))},dependencies:[u.mk,u.sg,u.O5]}),n})()},{path:`${s.F.DETAIL}/${s.F.EDIT}/:id`,component:b}]}];let Q=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[g.Bz.forChild(L),g.Bz]}),n})();var R=l(8481);const V=[h.c,_.Fk,I.LD,v.FA,P.XK,h.c,O.ot];let z=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[A.bo],imports:[u.ez,i.UX,Q,V,R.Pu,i.u5,i.UX]}),n})()}}]);