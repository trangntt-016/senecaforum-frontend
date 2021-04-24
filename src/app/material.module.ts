import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MenubarModule} from 'primeng/menubar';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";



@NgModule({
    imports:[
        MatIconModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatChipsModule,
        FlexLayoutModule,
        MenubarModule,
        FormsModule,
        AutoCompleteModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        DropdownModule,
        CascadeSelectModule,
        CalendarModule,
        ChipsModule,
        InputMaskModule,
        InputNumberModule

        
    ],
    exports:[
        MatIconModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatChipsModule,
        FlexLayoutModule,
        MenubarModule,
        FormsModule,
        AutoCompleteModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        DropdownModule,
        CascadeSelectModule
    ]
})
export class MaterialModule{}