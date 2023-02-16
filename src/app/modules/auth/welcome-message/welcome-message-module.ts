import { NgModule } from "@angular/core";
import { WelcomeMessageComponent } from "./welcome-message.component";

@NgModule({
    declarations: [
        WelcomeMessageComponent
    ],
    exports: [
        WelcomeMessageComponent
    ]
})
export class WelcomeMessageModule
{
}