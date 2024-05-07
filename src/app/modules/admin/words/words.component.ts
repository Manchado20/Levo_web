import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApexOptions } from 'ng-apexcharts';
import { WordsService } from './words.service';
import { ChangeDetectorRef } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { User } from 'app/core/user/user.types';

@Component({
    selector       : 'words',
    templateUrl    : './words.component.html',
    styleUrls: ['./words.component.css'], // Aquí se incluye el archivo CSS
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsComponent implements OnInit, OnDestroy
{
    myForm: FormGroup;
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    home: any = {
        pending: 0,
        effectiveness: {
            adjectives: 0,
            adverbs: 0,
            prepositions: 0,
            nouns: 0,
            verbs: 0
        },
        levels: {
            high: 0,
            medium: 0,
            low: 0
        },
        words: []
    };

    word: string = "";
    descrpcion_english: string = "";
    descrpcion_spanish: string = "";
    spinner: boolean = false;
    dtOptions: DataTables.Settings = {};
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('selectBooksRef') selectBooksRef: ElementRef;
    user:any = sessionStorage.getItem('user');
    titulo_modal_btn = "Guardar";
    /**
     * Constructor
     */
    constructor(
        private _WordsService: WordsService,
        private _router: Router,
        private cdr: ChangeDetectorRef,
        private modalService: MdbModalService     
    )
    {
        this.myForm = new FormGroup({
            selectBooks: new FormControl("", [Validators.required, Validators.max(100), Validators.min(0)]),
            numBooks: new FormControl("", [Validators.required, Validators.max(100), Validators.min(0)]),
            numPages:new FormControl("", [Validators.required, Validators.max(100), Validators.min(0)])
        });
    }

    words:any = [];
    modalRef: MdbModalRef<WordsComponent> | null = null;
    @ViewChild('modalWord', { static: false })  content: any;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.dtOptions = {
            responsive: true,
            "scrollX": true,
            language: {
                zeroRecords: "No hay datos para mostrar",
                search: "Buscar:",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                },
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                infoEmpty: "No hay registros para mostrar",
                infoFiltered: "(filtrado de _MAX_ registros)",
                decimal: "e",
                thousands: "f",
                lengthMenu: "Mostrar _MENU_ registros",
                loadingRecords: "",
                processing: "Procesando",
            }
        };

        // Get the data
        this._WordsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareHomeData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getDataConfig() {
        this._WordsService.getConfigWords(this.user).subscribe(( res: any) => {
            if(res) {
                if (res.configWords.length > 0) {
                    this.titulo_modal_btn = 'Actualizar';
                    
                    const datos = res.configWords[0]; // Si hay múltiples configWords, puedes elegir uno, o iterar sobre ellos
                    this.myForm.patchValue({
                      selectBooks: datos.categoria,
                      numBooks: datos.num_libros,
                      numPages: datos.num_paginas
                    });
 
                } else {
                    this.titulo_modal_btn = 'Guardar';
                }
            } else {
                console.log('error');
            }


        });
    }

    onSubmit() {
        console.log('submit');
        if (this.myForm.valid) {
            const selectBooksValue = this.myForm.get('selectBooks').value;
            const selectElement = this.selectBooksRef.nativeElement;
            const selectTextBook = selectElement.options[selectElement.selectedIndex].text;
            const numBooksValue = this.myForm.get('numBooks').value;
            const numPagesValue = this.myForm.get('numPages').value;

            this._WordsService.saveConfigWords(selectTextBook, numBooksValue, numPagesValue, this.user).subscribe(( res: any) => {
                if(res.status) {
                    this.CloseModelConfig();
                    let texto = '';
                    if(res.tipo_proceso == 'insert') {
                        texto = 'Los datos se han guardado correctamente.';
                    } else {
                        texto = 'Los datos se han actualizado correctamente.';

                    }

                    Swal.fire({
                        title: "¡Éxito!",
                        text: texto,
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Favor de revisar la información.",
                    });
                }
            });

        } else {
          // Si el formulario no es válido, mostrar un mensaje de error o realizar alguna acción adecuada
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Favor de revisar la información.",
          });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    getWords(): any {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-dark btn-confirm-process-word",
              cancelButton: "btn btn-secondary"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "¿Está seguro de realizar el proceso de extracción con la configuración actual?",
            text: "Puede ajustar el número de páginas, la categoría de libros desde el botón de configuración.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: `Cancelar`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              
                const container_words = document.getElementById('container-words-id');
                container_words.querySelector('.content-words').innerHTML = "";
                this.spinner = true;


                const selectBooksValue = this.myForm.get('selectBooks').value;
                const selectElement = this.selectBooksRef.nativeElement;
                const selectTextBook = selectElement.options[selectElement.selectedIndex].text;
                const numBooksValue = this.myForm.get('numBooks').value;
                const numPagesValue = this.myForm.get('numPages').value;

                this._WordsService.GetWords(selectTextBook, numBooksValue, numPagesValue).subscribe(( res: any) => {
                let words = res;
                sessionStorage.setItem("words", JSON.stringify(words))
                let data_words = [];
                    let p = '';
                    p += '<div class="container-words d-flex" "style="flex-wrap: wrap;">';
                    
                    const data = JSON.parse(sessionStorage.getItem("data"));
                    Object.keys(words).forEach((key, value)=>{ 
                        data_words =  words[key];
                        var word_definition_english = words[key].definition_english.replace(/'/g, '"');
                        var word_definition_spanish = words[key].definition_spanish.replace(/'/g, '"');
                        // Crear un objeto con los datos que deseas pasar a openModalWord
                        let wordData = {
                            name: words[key].name,
                            definition_english: word_definition_english,
                            definition_spanish: word_definition_spanish
                        };
                        p += `<div class='container-word'>
                                <span class="close-button" id="boxclose">X</span>
                                <button class="btn btn-dark word-name" style="margin:25px" data-word='${JSON.stringify(wordData)}'>${words[key].name}</button>
                            </div> 
                            `;
                    })

                    p += '</div>';
                    this.spinner = false;
                    this.cdr.detectChanges(); // Detectar los cambios y actualizar la vista
                    document.getElementsByClassName("content-words")[0].innerHTML = p; 
                    // Asignar eventos de clic a los botones después de agregarlos al DOM
                    const buttons = document.querySelectorAll('.word-name');
                    buttons.forEach(button => {
                        button.addEventListener('click', this.openModalWord.bind(this));
                    });
                }); 

            } else if (result.isDenied) {
                console.log('cancela');
            }
        });










    }

    getWordsDEMO(): any {
        this.spinner = true;
        let words = JSON.parse(sessionStorage.getItem("words"));
        let data_words = [];
        let p = '';
        p += '<div class="container-words" style="text-align: start;">';
            Object.keys(words).forEach((key, value)=>{ 
            console.log(words, ' words');
            data_words =  words[key];
            // Crear un objeto con los datos que deseas pasar a openModalWord
            var word_definition_english = words[key].definition_english.replace(/'/g, '"');
            var word_definition_spanish = words[key].definition_spanish.replace(/'/g, '"');

            let wordData = {
                name: words[key].name,
                definition_english: word_definition_english,
                definition_spanish: word_definition_spanish
            };
            console.log(wordData, 'wordsDATA');
            p += '<button class="btn btn-dark word-name" style="margin:25px" data-word='+ JSON.stringify(wordData) + '>' + words[key].name + '</button>';
        })

        p += '</div>';
        this.spinner = false;
        this.cdr.detectChanges(); // Detectar los cambios y actualizar la vista
        document.getElementsByClassName("content-words")[0].innerHTML = p; 
            // Asignar eventos de clic a los botones después de agregarlos al DOM
        const buttons = document.querySelectorAll('.word-name');
        buttons.forEach(button => {
            button.addEventListener('click', this.openModalWord.bind(this));
        });
    }

    openModalWord(event: any) {
        const wordData = JSON.parse(event.currentTarget.getAttribute('data-word'));
        const modelDiv = document.getElementById('modal-word');
        this.word = wordData.name;
        this.descrpcion_english = wordData.definition_english;
        this.descrpcion_spanish = wordData.definition_spanish;
        if (modelDiv != null) {
            modelDiv.style.display = 'block';
            modelDiv.querySelector('.modal-title').innerHTML = this.word;
            modelDiv.querySelector('.container-english').innerHTML += `
                <p style="font-weight: 700;">En inglés:</p>
                ${this.descrpcion_english}
            `;

            modelDiv.querySelector('.container-spanish').innerHTML += `
                <p style="font-weight: 700;">En Español:</p>
                ${this.descrpcion_spanish}
            `;
        }
        console.log(this.word);
    }

    openModel() {
        const modelDiv = document.getElementById('modal-word');
        if(modelDiv!= null) {
          modelDiv.style.display = 'block';
        } 
    }

    openModelConfig() {
        const modelDiv = document.getElementById('modal-config-word');
        if(modelDiv!= null) {
            modelDiv.style.display = 'block';
            this.getDataConfig();            
        } 
    }

    CloseModelConfig() {
        const modelDiv = document.getElementById('modal-config-word');
        if(modelDiv!= null) {
          modelDiv.style.display = 'none';
        } 
      }

    
      CloseModel() {
        const modelDiv = document.getElementById('modal-word');
        if(modelDiv!= null) {
          modelDiv.querySelector('.container-english').textContent = "";
          modelDiv.querySelector('.container-spanish').textContent = "";
          modelDiv.style.display = 'none';
        } 
      }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void
    {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
             .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
             .forEach((el) => {
                 const attrVal = el.getAttribute('fill');
                 el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
             });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareHomeData(): void
    {
        let adjectives = {corrects: 0, incorrects: 0};
        let adverbs = {corrects: 0, incorrects: 0};
        let prepositions = {corrects: 0, incorrects: 0};
        let nouns = {corrects: 0, incorrects: 0};
        let verbs = {corrects: 0, incorrects: 0};

        let today = new Date().toISOString();

        for(let i of this.data.items) {
            this.home.pending += i.date < today ? 1 : 0;
            let nDate = new Date(i.date);
            i.date = nDate.toLocaleDateString('es-MX');
            this.home.words.push(i)
            if(i.efactor < 2) {
                this.home.levels.low++;
            } else if (i.efactor >=2 && i.efactor < 3) {
                this.home.levels.medium++;
            } else {
                this.home.levels.high++;
            }

            switch(i.type) {
                case "adjective":
                    adjectives.corrects += i.corrects;
                    adjectives.incorrects += i.incorrects;
                    break;
                case "adverb":
                    adverbs.corrects += i.corrects;
                    adverbs.incorrects += i.incorrects;
                    break;
                case "preposition":
                    prepositions.corrects += i.corrects;
                    prepositions.incorrects += i.incorrects;
                    break;
                case "noun":
                    nouns.corrects += i.corrects;
                    nouns.incorrects += i.incorrects;
                    break;
                case "verb":
                    verbs.corrects += i.corrects;
                    verbs.incorrects += i.incorrects;
                    break;
            }

        }
        this.home.levels.low += this.data.noPlayed;


        this.home.effectiveness.adjectives = (adjectives.corrects/(adjectives.corrects+adjectives.incorrects)*100).toFixed(1);
        this.home.effectiveness.adverbs = (adverbs.corrects/(adverbs.corrects+adverbs.incorrects)*100).toFixed(1);
        this.home.effectiveness.prepositions = (prepositions.corrects/(prepositions.corrects+prepositions.incorrects)*100).toFixed(1);
        this.home.effectiveness.nouns = (nouns.corrects/(nouns.corrects+nouns.incorrects)*100).toFixed(1);
        this.home.effectiveness.verbs = (verbs.corrects/(verbs.corrects+verbs.incorrects)*100).toFixed(1);

        this.home.effectiveness.adjectives = isNaN(this.home.effectiveness.adjectives) ? 0 : this.home.effectiveness.adjectives;
        this.home.effectiveness.adverbs = isNaN(this.home.effectiveness.adverbs) ? 0 : this.home.effectiveness.adverbs;
        this.home.effectiveness.prepositions = isNaN(this.home.effectiveness.prepositions) ? 0 : this.home.effectiveness.prepositions;
        this.home.effectiveness.nouns = isNaN(this.home.effectiveness.nouns) ? 0 : this.home.effectiveness.nouns;
        this.home.effectiveness.verbs = isNaN(this.home.effectiveness.verbs) ? 0 : this.home.effectiveness.verbs;

        // Github issues
        /* this.chartGithubIssues = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'line',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors     : ['#64748B', '#94A3B8'],
            dataLabels : {
                enabled        : true,
                enabledOnSeries: [0],
                background     : {
                    borderWidth: 0
                }
            },
            grid       : {
                borderColor: 'var(--fuse-border)'
            },
            labels     : this.data.githubIssues.labels,
            legend     : {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },
            series     : this.data.githubIssues.series,
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            stroke     : {
                width: [3, 0]
            },
            tooltip    : {
                followCursor: true,
                theme       : 'dark'
            },
            xaxis      : {
                axisBorder: {
                    show: false
                },
                axisTicks : {
                    color: 'var(--fuse-border)'
                },
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                },
                tooltip   : {
                    enabled: false
                }
            },
            yaxis      : {
                labels: {
                    offsetX: -16,
                    style  : {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        }; */

        // Task distribution
        /* this.chartTaskDistribution = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'polarArea',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            labels     : this.data.taskDistribution.labels,
            legend     : {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)'
                    },
                    rings : {
                        strokeColor: 'var(--fuse-border)'
                    }
                }
            },
            series     : this.data.taskDistribution.series,
            states     : {
                hover: {
                    filter: {
                        type : 'darken',
                        value: 0.75
                    }
                }
            },
            stroke     : {
                width: 2
            },
            theme      : {
                monochrome: {
                    enabled       : true,
                    color         : '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo       : 'dark'
                }
            },
            tooltip    : {
                followCursor: true,
                theme       : 'dark'
            },
            yaxis      : {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        }; */

        // Budget distribution
        this.chartBudgetDistribution = {
            chart      : {
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'radar',
                sparkline : {
                    enabled: true
                }
            },
            colors     : ['#818CF8'],
            dataLabels : {
                enabled   : true,
                formatter : (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style     : {
                    fontSize  : '13px',
                    fontWeight: 500
                },
                background: {
                    borderWidth: 0,
                    padding    : 4
                },
                offsetY   : -15
            },
            markers    : {
                strokeColors: '#818CF8',
                strokeWidth : 4
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors   : 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)'
                    }
                }
            },
            series     : [
                {
                    name: 'Efectividad',
                    data: [
                        this.home.effectiveness.adjectives,
                        this.home.effectiveness.adverbs,
                        this.home.effectiveness.prepositions,
                        this.home.effectiveness.nouns,
                        this.home.effectiveness.verbs,
                    ]
                }
            ],
            stroke     : {
                width: 2
            },
            tooltip    : {
                theme: 'dark',
                y    : {
                    formatter: (val: number): string => `${val}%`
                }
            },
            xaxis      : {
                labels    : {
                    show : true,
                    style: {
                        fontSize  : '12px',
                        fontWeight: '500'
                    }
                },
                categories: ['Adjetivos', 'Adverbios', 'Preposiciones', 'Sustantivos', 'Verbos']
            },
            yaxis      : {
                max       : (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7
            }
        };

        // Weekly expenses
      /*   this.chartWeeklyExpenses = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'line',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#22D3EE'],
            series : this.data.weeklyExpenses.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.weeklyExpenses.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        }; */

        // Monthly expenses
       /*  this.chartMonthlyExpenses = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'line',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#4ADE80'],
            series : this.data.monthlyExpenses.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.monthlyExpenses.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        }; */

        // Yearly expenses
        /* this.chartYearlyExpenses = {
            chart  : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'line',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#FB7185'],
            series : this.data.yearlyExpenses.series,
            stroke : {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis  : {
                type      : 'category',
                categories: this.data.yearlyExpenses.labels
            },
            yaxis  : {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        }; */
    }
}
function subscribe(arg0: (res: any) => void) {
    throw new Error('Function not implemented.');
}

