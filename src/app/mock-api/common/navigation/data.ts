/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/inicio'
    },
    {
        id   : 'practicar',
        title: 'Practicar',
        type : 'basic',
        icon : 'heroicons_outline:play',
        link : '/practicar'
    },
    /*{
        id   : 'flashcards',
        title: 'Practicar',
        type : 'basic',
        icon : 'heroicons_outline:play',
        link : '/practicar/flashcards'
    },*/
/*     {
        id   : 'estadisticas',
        title: 'Estadisticas',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/estadisticas'
    }, */
    {
        id   : 'configuracion',
        title: 'Configuración',
        type : 'basic',
        icon : 'heroicons_outline:adjustments',
        link : '/configuracion'
    },
    {
        id   : 'salir',
        title: 'Salir',
        type : 'basic',
        icon : 'heroicons_outline:logout',
        link : '/cerrar-sesion'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/inicio'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/inicio'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/inicio'
    }
];
