import {AuthConfig, OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {LoginComponent} from "./pages/login/login.component";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {AppAuthService} from "./services/app.auth.service";
import {MatTabsModule} from "@angular/material/tabs";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatChipsModule} from "@angular/material/chips";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {MatDialogModule} from "@angular/material/dialog";
import {TodoListComponent} from "./list/todo-list/todo-list.component";

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/m183/protocol/openid-connect/token',
    requireHttps: false,
    redirectUri: 'http://localhost:9090/api/',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'postman-client',
    scope: 'openid profile roles offline_access',
    responseType: 'code',
    showDebugInformation: true,
    requestAccessToken: true,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
    silentRefreshTimeout: 500,
    clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
    return sessionStorage;
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TodoListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatTableModule,
        MatSelectModule,
        MatChipsModule,
        MatRadioModule,
        MatDialogModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN'
        }),
        OAuthModule.forRoot({
            resourceServer: {
                sendAccessToken: true
            }
        })
    ],
    providers: [
        {
            provide: AuthConfig,
            useValue: authConfig
        },
        {
            provide: OAuthStorage,
            useFactory: storageFactory
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(authService: AppAuthService) {
        authService.initAuth().finally()
    }
}
