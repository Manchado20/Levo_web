"use strict";(self.webpackChunk_fuse_starter=self.webpackChunk_fuse_starter||[]).push([[906],{2906:(R,d,e)=>{e.r(d),e.d(d,{AuthUnlockSessionModule:()=>M});var u=e(3423),p=e(1095),m=e(8295),f=e(6627),h=e(9983),g=e(4885),v=e(5935),Z=e(588),A=e(4466),a=e(3679),S=e(8288),o=e(7716),U=e(8951),y=e(7495),k=e(8583),x=e(100),T=e(3994);const w=["unlockSessionNgForm"];function C(s,i){if(1&s&&(o.TgZ(0,"fuse-alert",22),o._uU(1),o.qZA()),2&s){const t=o.oxw();o.Q6J("appearance","outline")("showIcon",!1)("type",t.alert.type)("@shake","error"===t.alert.type),o.xp6(1),o.hij(" ",t.alert.message," ")}}function F(s,i){1&s&&o._UZ(0,"mat-icon",23),2&s&&o.Q6J("svgIcon","heroicons_solid:eye")}function I(s,i){1&s&&o._UZ(0,"mat-icon",23),2&s&&o.Q6J("svgIcon","heroicons_solid:eye-off")}function J(s,i){1&s&&(o.TgZ(0,"span"),o._uU(1," Unlock your session "),o.qZA())}function N(s,i){1&s&&o._UZ(0,"mat-progress-spinner",24),2&s&&o.Q6J("diameter",24)("mode","indeterminate")}const Q=function(){return["/cerrar-sesion"]},Y=[{path:"",component:(()=>{class s{constructor(t,n,r,c,l){this._activatedRoute=t,this._authService=n,this._formBuilder=r,this._router=c,this._userService=l,this.alert={type:"success",message:""},this.showAlert=!1}ngOnInit(){this._userService.user$.subscribe(t=>{this.name=t.name,this._email=t.email}),this.unlockSessionForm=this._formBuilder.group({name:[{value:this.name,disabled:!0}],password:["",a.kI.required]})}unlock(){var t;this.unlockSessionForm.invalid||(this.unlockSessionForm.disable(),this.showAlert=!1,this._authService.unlockSession({email:null!==(t=this._email)&&void 0!==t?t:"",password:this.unlockSessionForm.get("password").value}).subscribe(()=>{const n=this._activatedRoute.snapshot.queryParamMap.get("redirectURL")||"/signed-in-redirect";this._router.navigateByUrl(n)},n=>{this.unlockSessionForm.enable(),this.unlockSessionNgForm.resetForm({name:{value:this.name,disabled:!0}}),this.alert={type:"error",message:"Invalid password"},this.showAlert=!0}))}}return s.\u0275fac=function(t){return new(t||s)(o.Y36(u.gz),o.Y36(U.e),o.Y36(a.qu),o.Y36(u.F0),o.Y36(y.K))},s.\u0275cmp=o.Xpm({type:s,selectors:[["auth-unlock-session"]],viewQuery:function(t,n){if(1&t&&o.Gf(w,5),2&t){let r;o.iGM(r=o.CRH())&&(n.unlockSessionNgForm=r.first)}},decls:35,vars:13,consts:[[1,"flex","flex-col","sm:flex-row","items-center","md:items-start","sm:justify-center","md:justify-start","flex-auto","min-w-0"],[1,"md:flex","md:items-center","md:justify-end","w-full","sm:w-auto","md:h-full","md:w-1/2","py-8","px-4","sm:p-12","md:p-16","sm:rounded-2xl","md:rounded-none","sm:shadow","md:shadow-none","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12"],["src","assets/images/logo/levo.png"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight"],[1,"mt-0.5","font-medium"],["class","mt-8 -mb-4",3,"appearance","showIcon","type",4,"ngIf"],[1,"mt-8",3,"formGroup"],["unlockSessionNgForm","ngForm"],[1,"w-full"],["id","name","matInput","",3,"formControlName"],["id","password","matInput","","type","password",3,"formControlName"],["passwordField",""],["mat-icon-button","","type","button","matSuffix","",3,"click"],["class","icon-size-5",3,"svgIcon",4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","w-full","mt-3",3,"color","disabled","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"],[1,"no-show"],[1,"mt-8","-mb-4",3,"appearance","showIcon","type"],[1,"icon-size-5",3,"svgIcon"],[3,"diameter","mode"]],template:function(t,n){if(1&t){const r=o.EpF();o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"div",2),o.TgZ(3,"div",3),o._UZ(4,"img",4),o.qZA(),o.TgZ(5,"div",5),o._uU(6,"Unlock your session"),o.qZA(),o.TgZ(7,"div",6),o._uU(8,"Your session is locked due to inactivity"),o.qZA(),o.YNc(9,C,2,5,"fuse-alert",7),o.TgZ(10,"form",8,9),o.TgZ(12,"mat-form-field",10),o.TgZ(13,"mat-label"),o._uU(14,"Full name"),o.qZA(),o._UZ(15,"input",11),o.qZA(),o.TgZ(16,"mat-form-field",10),o.TgZ(17,"mat-label"),o._uU(18,"Password"),o.qZA(),o._UZ(19,"input",12,13),o.TgZ(21,"button",14),o.NdJ("click",function(){o.CHM(r);const l=o.MAs(20);return l.type="password"===l.type?"text":"password"}),o.YNc(22,F,1,1,"mat-icon",15),o.YNc(23,I,1,1,"mat-icon",15),o.qZA(),o.TgZ(24,"mat-error"),o._uU(25," Password is required "),o.qZA(),o.qZA(),o.TgZ(26,"button",16),o.NdJ("click",function(){return n.unlock()}),o.YNc(27,J,2,0,"span",17),o.YNc(28,N,1,2,"mat-progress-spinner",18),o.qZA(),o.TgZ(29,"div",19),o.TgZ(30,"span"),o._uU(31,"I'm not"),o.qZA(),o.TgZ(32,"a",20),o._uU(33),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o._UZ(34,"welcome-message",21),o.qZA()}if(2&t){const r=o.MAs(20);o.xp6(9),o.Q6J("ngIf",n.showAlert),o.xp6(1),o.Q6J("formGroup",n.unlockSessionForm),o.xp6(5),o.Q6J("formControlName","name"),o.xp6(4),o.Q6J("formControlName","password"),o.xp6(3),o.Q6J("ngIf","password"===r.type),o.xp6(1),o.Q6J("ngIf","text"===r.type),o.xp6(3),o.Q6J("color","primary")("disabled",n.unlockSessionForm.disabled),o.xp6(1),o.Q6J("ngIf",!n.unlockSessionForm.disabled),o.xp6(1),o.Q6J("ngIf",n.unlockSessionForm.disabled),o.xp6(4),o.Q6J("routerLink",o.DdM(12,Q)),o.xp6(1),o.Oqu(n.name)}},directives:[k.O5,a._Y,a.JL,a.sg,m.KE,m.hX,h.Nt,a.Fj,a.JJ,a.u,p.lW,m.R9,m.TO,u.yS,x.M,T.W,f.Hw,g.Ou],encapsulation:2,data:{animation:S.L}}),s})()}];var b=e(8679);let M=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[[u.Bz.forChild(Y),p.ot,m.lN,f.Ps,h.c,g.Cq,v.J,Z.fC,A.m,b.s]]}),s})()}}]);