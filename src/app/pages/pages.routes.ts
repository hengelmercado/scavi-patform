import { RouterModule, Route } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { FormInstrumentComponent } from './instrument/form-instrument.component';


const pagesRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'instrument', component: InstrumentComponent},
            {path: 'instrument/create', component: FormInstrumentComponent},
            {path: 'instrument/update/:id', component: FormInstrumentComponent}
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );