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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';



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
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatGridListModule
        
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
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSelectModule,
        MatGridListModule

    ]
})
export class MaterialModule{}