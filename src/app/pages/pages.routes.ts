import { RouterModule, Route } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { FormInstrumentComponent } from './instrument/form-instrument.component';
import { EntitiesComponent } from './entities/entities.component';
import { FormEntitiesComponent } from './entities/form-entities.component';
import { UserComponent } from './user/user.component';
import { LevelComponent } from './level/level.component';
import { FormLevelComponent } from './level/form-level.component';

const pagesRoutes: Route[] = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'user', component: UserComponent},
            {path: 'instrument', component: InstrumentComponent},
            {path: 'instrument/create', component: FormInstrumentComponent},
            {path: 'instrument/update/:id', component: FormInstrumentComponent},
            {path: 'entities', component: EntitiesComponent},
            {path: 'entities/create', component: FormEntitiesComponent},
            {path: 'entities/update/:id', component: FormEntitiesComponent},
            {path: 'level', component: LevelComponent},
            {path: 'level/create', component: FormLevelComponent},
            {path: 'level/update/:id', component: FormLevelComponent},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
