import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewMapComponent } from "./view.map.component";

@NgModule({
    declarations: [
        ViewMapComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ViewMapComponent
    ]
})

export class ViewMapModule { }