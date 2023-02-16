import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: StatisticsComponent
    }
];

@NgModule({
    declarations: [
        StatisticsComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class StatistcsModule
{
}
