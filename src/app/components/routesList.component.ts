import { Component, Inject } from "@angular/core";
import { RoutesService } from "./routesService.service";
import { Routee } from "./routee.interface";
import { AsyncPipe, NgFor } from "@angular/common";
import { interval, Observable, take, toArray } from "rxjs";


@Component({
    selector: 'routes-list',
    imports: [NgFor],
    providers: [RoutesService],
    templateUrl: './routesList.template.html',
    styleUrl: './routesList.styles.scss'
})
export class RoutesList {
    title = 'routes-list';

    routes: Routee[] = [];
    pageNumbs: number[] = [];

    constructor(public routesApi: RoutesService) {
        this.setRoutes();
    }


    private setRoutes() {
        this.routes = this.routesApi.getItems().filter((v, id) => id < 10);
        var totalPages = this.routesApi.getItems().length / 10;
        for (let q = 1; q <= totalPages; q++) {
            this.pageNumbs[q - 1] = q;
        }
    }





}