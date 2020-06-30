import { RouterModule, Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { FormInstrumentComponent } from './instrument/form-instrument.component';
import { EntitiesComponent } from './entities/entities.component';
import { FormEntitiesComponent } from './entities/form-entities.component';


const pagesRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'instrument', component: InstrumentComponent},
            {path: 'instrument/create', component: FormInstrumentComponent},
            {path: 'instrument/update/:id', component: FormInstrumentComponent},
            {path: 'entities', component: EntitiesComponent},
            {path: 'entities/create', component: FormEntitiesComponent},
            {path: 'entities/update/:id', component: FormEntitiesComponent},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
