"use strict";(self.webpackChunk_fuse_starter=self.webpackChunk_fuse_starter||[]).push([[240],{9240:(fe,_,r)=>{r.r(_),r.d(_,{WordsModule:()=>ce});var w=r(3423),T=r(1095),C=r(2542),k=r(1769),B=r(6627),S=r(3935),W=r(2178),q=r(2458),E=r(3017),N=r(1494),F=r(2789),I=r(5939),y=r(8394),M=r(4256),U=r(4466),D=r(9765),J=r(6782),d=r(3679),L=r(8259),f=r.n(L),e=r(7716),b=r(1841),O=r(6215),P=r(8307),x=r(2340),j=r(705);new b.WM({"Content-Type":"application/json",Accept:"*/*","Accept-Encoding":"gzip, deflate, br","Accept-Language":"en-GB,en-US;q=0.9,en;q=0.8",Connection:"keep-alive","User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36","X-Requested-With":"XMLHttpRequest","Content-type":"application/x-www-form-urlencoded","Access-Control-Allow-Headers":"*"});let A=(()=>{class n{constructor(t){this._httpClient=t,this.httpHeaders=(new b.WM).set("Content-Type","application/json"),this._data=new O.X(null)}get data$(){return this._data.asObservable()}getData(){return j.l.getAccessTokenPayload(localStorage.accessToken),this._httpClient.get(x.N.apiURL+"/dashboard").pipe((0,P.b)(o=>{this._data.next(o)}))}GetWords(t,o,s,l){let i=new b.WM;return i=i.append("content-type","application/json"),i=i.append("Access-Control-Allow-Origin","*"),i=i.append("content-type","application/x-www-form-urlencoded"),i=i.append("customer-header","custom"),this._httpClient.get(`https://levoalgoritmo.manchados.site/extracted-words?category=${t}&url_category=${o}&num_book=${s}&num_page=${l}`,{headers:i})}saveConfigWords(t,o,s,l){return this._httpClient.post(x.N.apiURL+"/save-config-words",{categoria:t,num_libros:o,num_paginas:s,user:l})}saveWords(t){return this._httpClient.post(x.N.apiURL+"/save-words",{wordsData:t})}getConfigWords(t){return this._httpClient.post(x.N.apiURL+"/get-config-words",{user:t})}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(b.eN))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var R=r(4715),G=r(8583);const Y=["selectBooksRef"],H=["processButton"],z=["saveButton"],Q=["modalWord"];function $(n,c){1&n&&(e.ynx(0),e.TgZ(1,"div",63),e._uU(2," Extracci\xf3n de palabras "),e.qZA(),e.BQk())}function V(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," Este campo es obligatorio. "),e.qZA())}function X(n,c){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,V,2,0,"div",64),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.myForm.get("selectBooks").errors.required)}}function K(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," Este campo es obligatorio. "),e.qZA())}function ee(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," El valor m\xe1ximo permitido es 100. "),e.qZA())}function te(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," El valor m\xednimo permitido es 0. "),e.qZA())}function oe(n,c){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,K,2,0,"div",64),e.YNc(2,ee,2,0,"div",64),e.YNc(3,te,2,0,"div",64),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.myForm.get("numBooks").errors.required),e.xp6(1),e.Q6J("ngIf",t.myForm.get("numBooks").errors.max),e.xp6(1),e.Q6J("ngIf",t.myForm.get("numBooks").errors.min)}}function se(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," Este campo es obligatorio. "),e.qZA())}function ne(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," El valor m\xe1ximo permitido es 100. "),e.qZA())}function ie(n,c){1&n&&(e.TgZ(0,"div",65),e._uU(1," El valor m\xednimo permitido es 0. "),e.qZA())}function re(n,c){if(1&n&&(e.TgZ(0,"div"),e.YNc(1,se,2,0,"div",64),e.YNc(2,ne,2,0,"div",64),e.YNc(3,ie,2,0,"div",64),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.myForm.get("numPages").errors.required),e.xp6(1),e.Q6J("ngIf",t.myForm.get(t.numPages).errors.max),e.xp6(1),e.Q6J("ngIf",t.myForm.get(t.numPages).errors.min)}}const de=[{path:"",component:(()=>{class n{constructor(t,o,s,l){this._WordsService=t,this._router=o,this.cdr=s,this.modalService=l,this.chartGithubIssues={},this.chartTaskDistribution={},this.chartBudgetDistribution={},this.chartWeeklyExpenses={},this.chartMonthlyExpenses={},this.chartYearlyExpenses={},this.home={pending:0,effectiveness:{adjectives:0,adverbs:0,prepositions:0,nouns:0,verbs:0},levels:{high:0,medium:0,low:0},words:[]},this.word="",this.translated_word="",this.example_word="",this.descrpcion_english="",this.descrpcion_spanish="",this.spinner=!1,this.dtOptions={},this.selectedProject="ACME Corp. Backend App",this._unsubscribeAll=new D.xQ,this.user=sessionStorage.getItem("user"),this.titulo_modal_btn="Guardar",this.configuracion_words=[],this.isButtonDisabled=!1,this.visibleBTNGuardar=!1,this.words=[],this.modalRef=null,this.myForm=new d.cw({selectBooks:new d.NI("",[d.kI.required,d.kI.max(100),d.kI.min(0)]),numBooks:new d.NI("",[d.kI.required,d.kI.max(100),d.kI.min(0)]),numPages:new d.NI("",[d.kI.required,d.kI.max(100),d.kI.min(0)])})}ngOnInit(){this.dtOptions={responsive:!0,scrollX:!0,language:{zeroRecords:"No hay datos para mostrar",search:"Buscar:",paginate:{first:"Primero",last:"\xdaltimo",next:"Siguiente",previous:"Anterior"},info:"Mostrando _START_ a _END_ de _TOTAL_ registros",infoEmpty:"No hay registros para mostrar",infoFiltered:"(filtrado de _MAX_ registros)",decimal:"e",thousands:"f",lengthMenu:"Mostrar _MENU_ registros",loadingRecords:"",processing:"Procesando"}},this._WordsService.data$.pipe((0,J.R)(this._unsubscribeAll)).subscribe(t=>{this.data=t,this._prepareHomeData()}),window.Apex={chart:{events:{mounted:(t,o)=>{this._fixSvgFill(t.el)},updated:(t,o)=>{this._fixSvgFill(t.el)}}}}}ngOnDestroy(){this._unsubscribeAll.next(),this._unsubscribeAll.complete()}getDataConfig(){this._WordsService.getConfigWords(this.user).subscribe(t=>{var o;if(t)if(t.configWords.length>0){this.titulo_modal_btn="Actualizar";const s=t.configWords[0];this.myForm.patchValue({selectBooks:s.categoria,numBooks:s.num_libros,numPages:s.num_paginas});const l=null===(o=s.find(i=>i.categoria===s.categoria))||void 0===o?void 0:o.dataId;this.configuracion_words={selectBooks:s.categoria,urlBooks:l,numBooks:s.num_libros,numPages:s.num_paginas},sessionStorage.setItem("configuracion_words",JSON.stringify(this.configuracion_words))}else this.titulo_modal_btn="Guardar";else console.log("error")})}onSubmit(){if(console.log("submit"),this.myForm.valid){this.myForm.get("selectBooks");const o=this.selectBooksRef.nativeElement,s=o.options[o.selectedIndex],l=o.options[o.selectedIndex].text,i=this.myForm.get("numBooks").value,u=this.myForm.get("numPages").value,a=s.getAttribute("data-id");this._WordsService.saveConfigWords(l,i,u,this.user).subscribe(m=>{if(m.status){this.configuracion_words={selectBooks:l,urlBooks:a,numBooks:i,numPages:u},sessionStorage.setItem("configuracion_words",JSON.stringify(this.configuracion_words)),this.CloseModelConfig();let p="";p="insert"==m.tipo_proceso?"Los datos se han guardado correctamente.":"Los datos se han actualizado correctamente.",f().fire({title:"\xa1\xc9xito!",text:p,icon:"success"})}else f().fire({icon:"error",title:"Oops...",text:"Favor de revisar la informaci\xf3n."})})}else f().fire({icon:"error",title:"Oops...",text:"Favor de revisar la informaci\xf3n."})}getWords(){this.cdr.detectChanges(),f().mixin({customClass:{confirmButton:"btn btn-dark btn-confirm-process-word",cancelButton:"btn btn-secondary"},buttonsStyling:!1}).fire({title:"\xbfEst\xe1 seguro de realizar el proceso de extracci\xf3n con la configuraci\xf3n actual?",text:"Puede ajustar el n\xfamero de p\xe1ginas, la categor\xeda de libros desde el bot\xf3n de configuraci\xf3n.",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"}).then(o=>{if(o.isConfirmed){this.processButton.nativeElement.disabled=!0,this.isButtonDisabled=!0,this.saveButton.nativeElement.style.display="none";const s=document.getElementById("container-words-id");s.querySelector(".content-words").innerHTML="",s.querySelector(".content-words").innerHTML+='\n                <div class="container-spinner">\n                    <div\n                        class="spinner-border"\n                        style="\n                            position: absolute;\n                            width: 4rem;\n                            height: 4rem;\n                        "\n                        role="status"\n                        *ngIf="spinner"\n                    >\n                        <span class="visually-hidden">Loading...</span>\n                    </div>\n                </div>\n                    ',this.spinner=!0,this.myForm.get("selectBooks");let u="all",a=0,m=0,p="all";const v=JSON.parse(sessionStorage.getItem("configuracion_words"));v&&(u=v.selectBooks,a=v.numBooks,m=v.numPages,p=v.urlBooks),this._WordsService.GetWords(u,p,a,m).subscribe(ue=>{let g=ue;sessionStorage.setItem("words",JSON.stringify(g));let me=[],Z="";Z+='<div class="container-words d-flex">',JSON.parse(sessionStorage.getItem("data")),Object.keys(g).forEach((h,we)=>{me=g[h];var pe=g[h].definition_english.replace(/^[^:]*:\s*/,"").replace(/'/g,"\\'").replace(/"/g,'\\"'),ge=g[h].definition_spanish.replace(/^[^:]*:\s*/,"").replace(/'/g,"\\'").replace(/"/g,'\\"');Z+=`<div class='container-word'>\n                                <span class="close-button" id="boxclose">X</span>\n                                <button class="btn btn-dark word-name" style="margin:25px" data-word='${JSON.stringify({name:g[h].name,translated_word:g[h].translated_word,definition_english:pe,definition_spanish:ge,example_word:g[h].example_word}).replace(/'/g,"&apos;").replace(/"/g,"&quot;")}'>${g[h].name}</button>\n                                </div> \n                            `}),Z+="</div>",this.spinner=!1,this.cdr.detectChanges(),document.getElementsByClassName("content-words")[0].innerHTML=Z,document.querySelectorAll(".word-name").forEach(h=>{h.addEventListener("click",this.openModalWord.bind(this))}),this.isButtonDisabled=!1,this.saveButton.nativeElement.style.display="inline-block",this.cdr.detectChanges()})}else o.isDenied&&console.log("cancela")})}saveWords(){f().mixin({customClass:{confirmButton:"btn btn-dark btn-confirm-process-word",cancelButton:"btn btn-secondary"},buttonsStyling:!1}).fire({title:"\xbfEst\xe1 seguro guardar las palabras actuales?",text:"El listado de palabras ser\xe1n utilizadas para los juegos did\xe1cticos del usuario.",icon:"warning",showCancelButton:!0,confirmButtonText:"Continuar",cancelButtonText:"Cancelar"}).then(o=>{if(o.isConfirmed){let s=JSON.parse(sessionStorage.getItem("words"));this._WordsService.saveWords(s).subscribe(l=>{l.status&&(f().fire({title:"\xa1\xc9xito!",text:"El listado de palabras se han guardado correctamente.",icon:"success"}),document.getElementById("container-words-id").querySelector(".content-words").innerHTML="")})}else o.isDenied&&console.log("cancela")})}getWordsDEMO(){this.spinner=!0;let t=JSON.parse(sessionStorage.getItem("words")),o=[],s="";s+='<div class="container-words" style="text-align: start;">',Object.keys(t).forEach((i,u)=>{console.log(t," words"),o=t[i];var a=t[i].definition_english.replace(/'/g,'"'),m=t[i].definition_spanish.replace(/'/g,'"');let p={name:t[i].name,definition_english:a,definition_spanish:m};console.log(p,"wordsDATA"),s+='<button class="btn btn-dark word-name" style="margin:25px" data-word='+JSON.stringify(p)+">"+t[i].name+"</button>"}),s+="</div>",this.spinner=!1,this.cdr.detectChanges(),document.getElementsByClassName("content-words")[0].innerHTML=s,document.querySelectorAll(".word-name").forEach(i=>{i.addEventListener("click",this.openModalWord.bind(this))})}openModalWord(t){const o=JSON.parse(t.currentTarget.getAttribute("data-word")),s=document.getElementById("modal-word");this.word=o.name,this.example_word=o.example_word,this.translated_word=o.translated_word,this.descrpcion_english=o.definition_english,this.descrpcion_spanish=o.definition_spanish,null!=s&&(s.style.display="block",s.querySelector(".modal-title").innerHTML=this.word+" - "+this.translated_word,s.querySelector(".container-english").innerHTML+=`\n                <p style="font-weight: 700;">En ingl\xe9s:</p>\n                ${this.descrpcion_english}\n            `,s.querySelector(".container-spanish").innerHTML+=`\n                <p style="font-weight: 700;">En Espa\xf1ol:</p>\n                ${this.descrpcion_spanish}\n            `,s.querySelector(".container-example").innerHTML+=`\n                <p style="font-weight: 700;">Ejemplo:</p>\n                ${this.example_word}\n            `),console.log(this.word)}openModel(){const t=document.getElementById("modal-word");null!=t&&(t.style.display="block")}openModelConfig(){const t=document.getElementById("modal-config-word");null!=t&&(t.style.display="block",this.getDataConfig())}CloseModelConfig(){const t=document.getElementById("modal-config-word");null!=t&&(t.style.display="none")}CloseModel(){const t=document.getElementById("modal-word");null!=t&&(t.querySelector(".container-english").textContent="",t.querySelector(".container-spanish").textContent="",t.querySelector(".container-example").textContent="",t.style.display="none")}trackByFn(t,o){return o.id||t}_fixSvgFill(t){const o=this._router.url;Array.from(t.querySelectorAll("*[fill]")).filter(s=>-1!==s.getAttribute("fill").indexOf("url(")).forEach(s=>{const l=s.getAttribute("fill");s.setAttribute("fill",`url(${o}${l.slice(l.indexOf("#"))}`)})}_prepareHomeData(){let t={corrects:0,incorrects:0},o={corrects:0,incorrects:0},s={corrects:0,incorrects:0},l={corrects:0,incorrects:0},i={corrects:0,incorrects:0},u=(new Date).toISOString();for(let a of this.data.items){this.home.pending+=a.date<u?1:0;let m=new Date(a.date);switch(a.date=m.toLocaleDateString("es-MX"),this.home.words.push(a),a.efactor<2?this.home.levels.low++:a.efactor>=2&&a.efactor<3?this.home.levels.medium++:this.home.levels.high++,a.type){case"adjective":t.corrects+=a.corrects,t.incorrects+=a.incorrects;break;case"adverb":o.corrects+=a.corrects,o.incorrects+=a.incorrects;break;case"preposition":s.corrects+=a.corrects,s.incorrects+=a.incorrects;break;case"noun":l.corrects+=a.corrects,l.incorrects+=a.incorrects;break;case"verb":i.corrects+=a.corrects,i.incorrects+=a.incorrects}}this.home.levels.low+=this.data.noPlayed,this.home.effectiveness.adjectives=(t.corrects/(t.corrects+t.incorrects)*100).toFixed(1),this.home.effectiveness.adverbs=(o.corrects/(o.corrects+o.incorrects)*100).toFixed(1),this.home.effectiveness.prepositions=(s.corrects/(s.corrects+s.incorrects)*100).toFixed(1),this.home.effectiveness.nouns=(l.corrects/(l.corrects+l.incorrects)*100).toFixed(1),this.home.effectiveness.verbs=(i.corrects/(i.corrects+i.incorrects)*100).toFixed(1),this.home.effectiveness.adjectives=isNaN(this.home.effectiveness.adjectives)?0:this.home.effectiveness.adjectives,this.home.effectiveness.adverbs=isNaN(this.home.effectiveness.adverbs)?0:this.home.effectiveness.adverbs,this.home.effectiveness.prepositions=isNaN(this.home.effectiveness.prepositions)?0:this.home.effectiveness.prepositions,this.home.effectiveness.nouns=isNaN(this.home.effectiveness.nouns)?0:this.home.effectiveness.nouns,this.home.effectiveness.verbs=isNaN(this.home.effectiveness.verbs)?0:this.home.effectiveness.verbs,this.chartBudgetDistribution={chart:{fontFamily:"inherit",foreColor:"inherit",height:"100%",type:"radar",sparkline:{enabled:!0}},colors:["#818CF8"],dataLabels:{enabled:!0,formatter:a=>`${a}%`,textAnchor:"start",style:{fontSize:"13px",fontWeight:500},background:{borderWidth:0,padding:4},offsetY:-15},markers:{strokeColors:"#818CF8",strokeWidth:4},plotOptions:{radar:{polygons:{strokeColors:"var(--fuse-border)",connectorColors:"var(--fuse-border)"}}},series:[{name:"Efectividad",data:[this.home.effectiveness.adjectives,this.home.effectiveness.adverbs,this.home.effectiveness.prepositions,this.home.effectiveness.nouns,this.home.effectiveness.verbs]}],stroke:{width:2},tooltip:{theme:"dark",y:{formatter:a=>`${a}%`}},xaxis:{labels:{show:!0,style:{fontSize:"12px",fontWeight:"500"}},categories:["Adjetivos","Adverbios","Preposiciones","Sustantivos","Verbos"]},yaxis:{max:a=>parseInt((a+10).toFixed(0),10),tickAmount:7}}}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(A),e.Y36(w.F0),e.Y36(e.sBO),e.Y36(R.Bh))},n.\u0275cmp=e.Xpm({type:n,selectors:[["words"]],viewQuery:function(t,o){if(1&t&&(e.Gf(Y,5),e.Gf(H,5),e.Gf(z,5),e.Gf(Q,5)),2&t){let s;e.iGM(s=e.CRH())&&(o.selectBooksRef=s.first),e.iGM(s=e.CRH())&&(o.processButton=s.first),e.iGM(s=e.CRH())&&(o.saveButton=s.first),e.iGM(s=e.CRH())&&(o.content=s.first)}},decls:103,vars:11,consts:[[1,"flex","flex-col","flex-auto","min-w-0"],[1,"bg-card"],[1,"flex","flex-col","w-full","max-w-screen-xl","mx-auto","px-6","sm:px-8"],[1,"flex-auto","sm:items-center","min-w-0","my-8","sm:my-12"],[1,"items-center","min-w-0"],[1,"flex","flex-col","min-w-0","ml-4"],[4,"transloco"],[1,"flex","items-center",2,"margin-bottom","10px"],[1,"ml-1.5","leading-6","text-secondary",2,"width","100%"],[1,"containe-result-config-word"],["type","button",1,"btn","btn-dark",2,"padding","10px 25px","background","#0f172a","color","white","border-radius","5px","position","relative",3,"click"],["aria-hidden","true",1,"fa","fa-cog",2,"font-size","25px"],["id","container-words-id",1,"container-words",2,"text-align","center","display","flex","justify-content","center","align-items","center","width","100%"],[1,"content-words",2,"width","100%","height","300px","border","1px solid black","margin-bottom","11px","overflow","scroll","min-height","63vh"],[1,"container-button-process-word","text-center"],["type","button",1,"btn","btn-dark",2,"padding","10px 25px","background","#0f172a","color","white","border-radius","5px",3,"disabled","click"],["processButton",""],["type","button",1,"btn","btn-dark",2,"padding","10px 25px","background","#0f172a","color","white","border-radius","5px","margin-left","23px","display","none",3,"click"],["saveButton",""],["id","modal-word","tabindex","-1","role","dialog","data-backdrop","static","data-keyboard","false",1,"modal"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-lg"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLongTitle",1,"modal-title","text-uppercase"],["type","button","data-dismiss","modal","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"container-descripcion","text-justify"],[1,"container-english","mb-4"],[1,"container-spanish","mb-4"],[1,"container-example"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary",3,"click"],["id","modal-config-word","tabindex","-1","role","dialog","data-backdrop","static","data-keyboard","false",1,"modal"],[1,"modal-header","headerRegister"],["id","titleModal",1,"modal-title"],[3,"formGroup","ngSubmit"],[1,"form-row"],[1,"form-group","col-md-6","selectEstado"],["for","listBook"],["id","listBook","formControlName","selectBooks",1,"form-control"],["selectBooksRef",""],["selected",""],["value","Todos","data-id","Todos"],["value","Algorithms & Datastructures","data-id","/CSBooks_PDFs.html"],["value","Software Architecture","data-id","books_pdfs/CSSoftware_Architecture.html"],["value","Compiler","data-id","books_pdfs/CSCompiler.html"],["value","Open Source","data-id","books_pdfs/CSSoftware_Architecture.html"],["value","Linux","data-id","books_pdfs/CSLinux.html"],["value","Android","data-id","books_pdfs/CSAndroid.html"],["value","Java","data-id","books_pdfs/CSJava.html"],["value","iOS","data-id","books_pdfs/CSiOS.html"],["value","C Programming","data-id","books_pdfs/CSC_Programming.html"],["value","Javascript","data-id","books_pdfs/CSJavascript.html"],["value","Math","data-id","books_pdfs/CSDataScienceML.html"],["value","Data Science / Machine Learning","data-id","books_pdfs/CSSoftware_Architecture.html"],[4,"ngIf"],[1,"form-group","col-md-6"],["for","numBooks"],["type","number","id","numBooks","formControlName","numBooks","min","0","max","100",1,"form-control"],["for","numPages"],["type","number","id","numPages","formControlName","numPages","min","0","max","100",1,"form-control"],["type","submit",1,"btn","btn-dark"],[1,"text-2xl","md:text-5xl","font-semibold","tracking-tight","leading-7","md:leading-snug","truncate"],["class","text-danger",4,"ngIf"],[1,"text-danger"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"div",3),e.TgZ(4,"div",4),e.TgZ(5,"div",5),e.YNc(6,$,3,0,"ng-container",6),e.TgZ(7,"div",7),e.TgZ(8,"div",8),e._uU(9," El proceso de extracci\xf3n se realizar\xe1 de manera automatizada a partir de una cantidad de libros en formato PDF. "),e.qZA(),e._UZ(10,"div",9),e.TgZ(11,"button",10),e.NdJ("click",function(){return o.openModelConfig()}),e._UZ(12,"i",11),e.qZA(),e.qZA(),e.TgZ(13,"div",12),e._UZ(14,"div",13),e.qZA(),e.TgZ(15,"div",14),e.TgZ(16,"button",15,16),e.NdJ("click",function(){return o.getWords()}),e._uU(18," Procesar "),e.qZA(),e.TgZ(19,"button",17,18),e.NdJ("click",function(){return o.saveWords()}),e._uU(21," Guardar "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",19),e.TgZ(23,"div",20),e.TgZ(24,"div",21),e.TgZ(25,"div",22),e.TgZ(26,"h5",23),e._uU(27),e.qZA(),e.TgZ(28,"button",24),e.NdJ("click",function(){return o.CloseModel()}),e.TgZ(29,"span",25),e._uU(30,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(31,"div",26),e.TgZ(32,"div",27),e.TgZ(33,"div",28),e._uU(34),e.qZA(),e.TgZ(35,"div",29),e._uU(36),e.qZA(),e.TgZ(37,"div",30),e._uU(38),e.qZA(),e.qZA(),e.qZA(),e.TgZ(39,"div",31),e.TgZ(40,"button",32),e.NdJ("click",function(){return o.CloseModel()}),e._uU(41," Cerrar "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(42,"div",33),e.TgZ(43,"div",20),e.TgZ(44,"div",21),e.TgZ(45,"div",34),e.TgZ(46,"h5",35),e._uU(47,"Configuraci\xf3n"),e.qZA(),e.TgZ(48,"button",24),e.NdJ("click",function(){return o.CloseModelConfig()}),e.TgZ(49,"span",25),e._uU(50,"\xd7"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(51,"div",26),e.TgZ(52,"form",36),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(53,"div",37),e.TgZ(54,"div",38),e.TgZ(55,"label",39),e._uU(56,"Categor\xedas de libros"),e.qZA(),e.TgZ(57,"select",40,41),e.TgZ(59,"option",42),e._uU(60,"Selecciona una opci\xf3n"),e.qZA(),e.TgZ(61,"option",43),e._uU(62," Todos "),e.qZA(),e.TgZ(63,"option",44),e._uU(64," Algorithms & Datastructures "),e.qZA(),e.TgZ(65,"option",45),e._uU(66,"Software Architecture"),e.qZA(),e.TgZ(67,"option",46),e._uU(68,"Compiler"),e.qZA(),e.TgZ(69,"option",47),e._uU(70,"Open Source"),e.qZA(),e.TgZ(71,"option",48),e._uU(72,"Linux"),e.qZA(),e.TgZ(73,"option",49),e._uU(74,"Android"),e.qZA(),e.TgZ(75,"option",50),e._uU(76,"Java"),e.qZA(),e.TgZ(77,"option",51),e._uU(78,"iOS"),e.qZA(),e.TgZ(79,"option",52),e._uU(80,"C Programming"),e.qZA(),e.TgZ(81,"option",53),e._uU(82,"Javascript"),e.qZA(),e.TgZ(83,"option",54),e._uU(84,"Math"),e.qZA(),e.TgZ(85,"option",55),e._uU(86," Data Science / Machine Learning "),e.qZA(),e.qZA(),e.YNc(87,X,2,1,"div",56),e.qZA(),e.TgZ(88,"div",57),e.TgZ(89,"label",58),e._uU(90,"N\xfamero de libros"),e.qZA(),e._UZ(91,"input",59),e.YNc(92,oe,4,3,"div",56),e.qZA(),e.TgZ(93,"div",57),e.TgZ(94,"label",60),e._uU(95,"N\xfamero de p\xe1ginas"),e.qZA(),e._UZ(96,"input",61),e.YNc(97,re,4,3,"div",56),e.qZA(),e.qZA(),e.TgZ(98,"div",31),e.TgZ(99,"button",62),e._uU(100),e.qZA(),e.TgZ(101,"button",32),e.NdJ("click",function(){return o.CloseModelConfig()}),e._uU(102," Cerrar "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(16),e.Q6J("disabled",o.isButtonDisabled),e.xp6(11),e.AsE(" ",o.word," - ",o.translated_word," "),e.xp6(7),e.hij(" ",o.descrpcion_english," "),e.xp6(2),e.hij(" ",o.descrpcion_spanish," "),e.xp6(2),e.hij(" ",o.example_word," "),e.xp6(14),e.Q6J("formGroup",o.myForm),e.xp6(35),e.Q6J("ngIf",o.myForm.get("selectBooks").errors&&o.myForm.get("selectBooks").touched),e.xp6(5),e.Q6J("ngIf",o.myForm.get("numBooks").errors&&o.myForm.get("numBooks").touched),e.xp6(5),e.Q6J("ngIf",o.myForm.get("numPages").errors&&o.myForm.get("numPages").touched),e.xp6(3),e.hij(" ",o.titulo_modal_btn," "))},directives:[y.KI,d._Y,d.JL,d.sg,d.EJ,d.JJ,d.u,d.YN,d.Kr,G.O5,d.wV,d.qQ,d.Fd,d.Fj],styles:['a.boxclose{display:block;float:right;margin-top:-30px;margin-right:-30px;cursor:pointer;color:#fff;border:1px solid #AEAEAE;border-radius:30px;background:#605F61;font-size:31px;font-weight:bold;line-height:0px;padding:11px 3px}.boxclose:before{content:"\\d7"}.close-button{position:absolute;top:5px;right:5px;font-size:12px;cursor:pointer}.close-button:hover{color:red}.btn-confirm-process-word{margin-right:17px}.container-words{flex-wrap:wrap}.content-words{text-align:center;width:100%}.container-spinner{display:flex;justify-content:center;align-items:center;height:60vh}\n'],encapsulation:2,changeDetection:0}),n})(),resolve:{data:(()=>{class n{constructor(t){this._homeService=t}resolve(t,o){return this._homeService.getData()}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(A))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()}}];var le=r(7988);let ce=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[w.Bz.forChild(de),T.ot,C.vV,k.t,B.Ps,S.Tx,W.Cv,q.si,E.SJ,N.JX,F.p0,I.Nh,M.X,y.y4,U.m,le.T]]}),n})()}}]);