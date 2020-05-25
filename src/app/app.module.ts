import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';


import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';



// COMPONENTS
import {AppComponent} from './app.component';
import { HomeComponent } from './home/home.component';
import { AddjobComponent } from './addjob/addjob.component';
import { ClientjobComponent } from './clientjob/clientjob.component';
import { EditjobComponent } from './editjob/editjob.component';
import { EditnextjobComponent } from './editnextjob/editnextjob.component';
import { ClosedjobsComponent } from './closedjobs/closedjobs.component';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ClientsService } from './services/clients.service';
import { JobsService } from './services/jobs.service';
import { NextjobService } from './services/nextjob.service';




// ROUTING
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'addjob', component: AddjobComponent},
    {path: 'clientjob/:id', component: ClientjobComponent},
    {path: 'editjob/:id', component: EditjobComponent},
    {path: 'editnextjob', component: EditnextjobComponent},
    {path: 'closedjobs', component: ClosedjobsComponent},
    {path: 'clientlist', component: ClientlistComponent},
    {path: 'addclient', component: AddClientComponent},
    {path: 'clientinfo/:id', component: ClientInfoComponent},
    {path: 'editclient/:id', component: EditClientComponent},
    {path: '**', component: HomeComponent},
];


// MODULES
@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        // ROUTING
        RouterModule.forRoot(
            appRoutes,
            //  { enableTracing: true } // <-- debugging purposes only
        )
    ],  // end imports
   declarations: [AppComponent, HomeComponent, AddjobComponent, ClientjobComponent, EditjobComponent, EditnextjobComponent, ClosedjobsComponent, ClientlistComponent, AddClientComponent, ClientInfoComponent, EditClientComponent],
    bootstrap: [AppComponent],
    providers: [ClientsService, JobsService, NextjobService],
    entryComponents: []
})
export class AppModule {

}

