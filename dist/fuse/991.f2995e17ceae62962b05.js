"use strict";(self.webpackChunk_fuse_starter=self.webpackChunk_fuse_starter||[]).push([[991],{9602:(C,u,e)=>{e.d(u,{y:()=>b});var c=e(9490),l=e(8288),n=e(7716),p=e(8583);function i(t,r){1&t&&(n.ynx(0),n.TgZ(1,"div",1),n.Hsn(2),n.qZA(),n.TgZ(3,"div",2),n.Hsn(4,1),n.qZA(),n.BQk())}function g(t,r){1&t&&(n.TgZ(0,"div",4),n.Hsn(1,3),n.qZA()),2&t&&n.Q6J("@expandCollapse",void 0)}function m(t,r){if(1&t&&(n.ynx(0),n.Hsn(1,2),n.YNc(2,g,2,1,"div",3),n.BQk()),2&t){const s=n.oxw();n.xp6(2),n.Q6J("ngIf",s.expanded)}}const v=[[["","fuseCardFront",""]],[["","fuseCardBack",""]],"*",[["","fuseCardExpansion",""]]],x=["[fuseCardFront]","[fuseCardBack]","*","[fuseCardExpansion]"];let b=(()=>{class t{constructor(){this.expanded=!1,this.face="front",this.flippable=!1}get classList(){return{"fuse-card-expanded":this.expanded,"fuse-card-face-back":this.flippable&&"back"===this.face,"fuse-card-face-front":this.flippable&&"front"===this.face,"fuse-card-flippable":this.flippable}}ngOnChanges(s){"expanded"in s&&(this.expanded=(0,c.Ig)(s.expanded.currentValue)),"flippable"in s&&(this.flippable=(0,c.Ig)(s.flippable.currentValue))}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["fuse-card"]],hostVars:2,hostBindings:function(s,f){2&s&&n.Tol(f.classList)},inputs:{expanded:"expanded",face:"face",flippable:"flippable"},exportAs:["fuseCard"],features:[n.TTD],ngContentSelectors:x,decls:2,vars:2,consts:[[4,"ngIf"],[1,"fuse-card-front"],[1,"fuse-card-back"],["class","fuse-card-expansion",4,"ngIf"],[1,"fuse-card-expansion"]],template:function(s,f){1&s&&(n.F$t(v),n.YNc(0,i,5,0,"ng-container",0),n.YNc(1,m,3,1,"ng-container",0)),2&s&&(n.Q6J("ngIf",f.flippable),n.xp6(1),n.Q6J("ngIf",!f.flippable))},directives:[p.O5],styles:["fuse-card{position:relative;display:flex;overflow:hidden;--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable{border-radius:0;overflow:visible;transform-style:preserve-3d;transition:transform 1s;perspective:600px;background:transparent;--tw-shadow: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-front{visibility:hidden;opacity:0;transform:rotateY(180deg)}fuse-card.fuse-card-flippable.fuse-card-face-back .fuse-card-back{visibility:visible;opacity:1;transform:rotateY(360deg)}fuse-card.fuse-card-flippable .fuse-card-front,fuse-card.fuse-card-flippable .fuse-card-back{display:flex;flex-direction:column;flex:1 1 auto;z-index:10;transition:transform .5s ease-out 0s,visibility 0s ease-in .2s,opacity 0s ease-in .2s;backface-visibility:hidden}fuse-card.fuse-card-flippable .fuse-card-front,fuse-card.fuse-card-flippable .fuse-card-back{--tw-bg-opacity: 1;background-color:rgba(var(--fuse-bg-card-rgb),var(--tw-bg-opacity));border-radius:1rem;--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}fuse-card.fuse-card-flippable .fuse-card-front{position:relative;opacity:1;visibility:visible;transform:rotateY(0);overflow:hidden}fuse-card.fuse-card-flippable .fuse-card-back{position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;visibility:hidden;transform:rotateY(180deg);overflow:hidden auto}\n"],encapsulation:2,data:{animation:l.L}}),t})()},5935:(C,u,e)=>{e.d(u,{J:()=>p}),e(9602);var l=e(8583),n=e(7716);let p=(()=>{class i{}return i.\u0275fac=function(m){return new(m||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[[l.ez]]}),i})()},8991:(C,u,e)=>{e.r(u),e.d(u,{AuthSignOutModule:()=>O});var c=e(3423),l=e(1095),n=e(5935),p=e(4466),i=e(9765),g=e(6797),m=e(8939),v=e(409),x=e(6782),b=e(8307),t=e(7716),r=e(8951),s=e(8583);function f(a,d){1&a&&(t.TgZ(0,"div",8),t._uU(1,"Has cerrado sesi\xf3n"),t.qZA())}function w(a,d){1&a&&(t.TgZ(0,"div",8),t._uU(1,"Sesi\xf3n finalizada"),t.qZA())}function y(a,d){if(1&a&&(t.ynx(0),t._uU(1),t.ALo(2,"i18nPlural"),t.BQk()),2&a){const o=t.oxw();t.xp6(1),t.hij(" Redirigiendo en ",t.xi3(2,1,o.countdown,o.countdownMapping)," ")}}const A=[{path:"",component:(()=>{class a{constructor(o,h){this._authService=o,this._router=h,this.countdown=3,this.countdownMapping={"=1":"# segundo",other:"# segundos"},this._unsubscribeAll=new i.xQ}ngOnInit(){this._authService.signOut(),(0,g.H)(1e3,1e3).pipe((0,m.x)(()=>{this._router.navigate(["iniciar-sesion"])}),(0,v.o)(()=>this.countdown>0),(0,x.R)(this._unsubscribeAll),(0,b.b)(()=>this.countdown--)).subscribe()}ngOnDestroy(){this._unsubscribeAll.next(),this._unsubscribeAll.complete()}}return a.\u0275fac=function(o){return new(o||a)(t.Y36(r.e),t.Y36(c.F0))},a.\u0275cmp=t.Xpm({type:a,selectors:[["auth-sign-out"]],decls:9,vars:3,consts:[[1,"flex","flex-col","flex-auto","items-center","sm:justify-center","min-w-0"],[1,"w-full","sm:w-auto","py-8","px-4","sm:p-12","sm:rounded-2xl","sm:shadow","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12","mx-auto"],["src","assets/images/logo/levo.png"],["class","mt-8 text-4xl font-extrabold tracking-tight leading-tight text-center",4,"ngIf"],[1,"flex","justify-center","mt-0.5","font-medium"],[4,"ngIf"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight","text-center"]],template:function(o,h){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.YNc(5,f,2,0,"div",5),t.YNc(6,w,2,0,"div",5),t.TgZ(7,"div",6),t.YNc(8,y,3,4,"ng-container",7),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(5),t.Q6J("ngIf",h.countdown>0),t.xp6(1),t.Q6J("ngIf",0==h.countdown),t.xp6(2),t.Q6J("ngIf",h.countdown>0))},directives:[s.O5],pipes:[s.Gx],encapsulation:2}),a})()}];let O=(()=>{class a{}return a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[c.Bz.forChild(A),l.ot,n.J,p.m]]}),a})()}}]);