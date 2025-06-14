import { Component } from "@angular/core";
import { RoutesService } from "./routesService.service";
import { Routee } from "./routee.interface";
import { NgClass, NgFor, NgIf } from "@angular/common";


@Component({
    selector: 'routes-list',
    imports: [NgFor, NgIf, NgClass],
    providers: [RoutesService],
    templateUrl: './routesList.template.html',
    styleUrl: './routesList.styles.scss'
})
export class RoutesList {
    title = 'routes-list';

    activePage: number = 1;

    routes: Routee[] = [];
    pageNumbs: number[] = [];
    range: number[] = [0, 9];

    byAddress: { sortType: string } = { sortType: "" };
    byGateway: { sortType: string } = { sortType: "" };
    byInterface: { sortType: string } = { sortType: "" };


    constructor(public routesApi: RoutesService) {
        this.setRoutes();
        this.setPages();
    }

    private setPages() {
        var totalPages = this.routes.length / 10;
        for (let q = 1; q < totalPages; q++) {
            this.pageNumbs[q - 1] = q;
        }
    }

    private setRoutes() {
        this.routes = this.routesApi.getItems();
    }

    resetPage() {
        this.range[0] = 0;
        this.range[1] = 9;
    }


    changePage(pageNumb: number) {
        this.range[0] = pageNumb == 1 ? pageNumb - 1 : pageNumb * 10;
        this.range[1] = this.range[0] + 9;
    }


    prepareAddress(a: string, b: string) {
        let aIdx = a.indexOf("/");
        let bIdx = b.indexOf("/");
        let firstIp = a.slice(0, aIdx).split(".");
        let secondIp = b.slice(0, bIdx).split(".");
        let first = +firstIp[3] + (+firstIp[2] * 256) + (+firstIp[1] * 256 * 256) + (+firstIp[0] * 256 * 256 * 256);
        let second = +secondIp[3] + (+secondIp[2] * 256) + (+secondIp[1] * 256 * 256) + (+secondIp[0] * 256 * 256 * 256);
        return [first, second];
    }

    prepareGateway(a: string, b: string) {
        let firstIp = a.split(".");
        let secondIp = b.split(".");
        let first = +firstIp[3] + (+firstIp[2] * 256) + (+firstIp[1] * 256 * 256) + (+firstIp[0] * 256 * 256 * 256);
        let second = +secondIp[3] + (+secondIp[2] * 256) + (+secondIp[1] * 256 * 256) + (+secondIp[0] * 256 * 256 * 256);
        return [first, second];
    }

    sortAddressAsc(a: Routee, b: Routee) {
        var tmp = this.prepareAddress(a.address, b.address);
        return tmp[0] - tmp[1];
    }

    sortGatewayAsc(a: Routee, b: Routee) {
        var tmp = this.prepareGateway(a.gateway, b.gateway);
        return tmp[0] - tmp[1];
    }


    sortInterface(a: Routee, b: Routee) {
        const first = a.interface.toUpperCase();
        const second = b.interface.toUpperCase();
        if (first < second) {
            return -1;
        } else if (first > second) {
            return 1
        } else {
            return 0;
        }
    }



    sortByAddress() {
        this.resetPage();
        this.byGateway.sortType = "";
        this.byInterface.sortType = "";
        if (this.byAddress.sortType == "" || this.byAddress.sortType == "desc") {
            this.byAddress.sortType = "asc";
            this.routes.sort(this.sortAddressAsc.bind(this))
        } else {
            this.byAddress.sortType = "desc";
            this.routes.sort(this.sortAddressAsc.bind(this));
            this.routes.reverse();

        }
    }

    sortByGateway() {
        this.resetPage();
        this.byAddress.sortType = "";
        this.byInterface.sortType = "";
        if (this.byGateway.sortType == "" || this.byGateway.sortType == "desc") {
            this.byGateway.sortType = "asc";
            this.routes.sort(this.sortGatewayAsc.bind(this));
        } else {
            this.byGateway.sortType = "desc";
            this.routes.sort(this.sortGatewayAsc.bind(this));
            this.routes.reverse();


        }
    }

    sortByInterface() {
        this.resetPage();
        this.byAddress.sortType = "";
        this.byGateway.sortType = "";
        if (this.byInterface.sortType == "" || this.byInterface.sortType == "desc") {
            this.byInterface.sortType = "asc";
            this.routes.sort(this.sortInterface.bind(this));
        } else {
            this.byInterface.sortType = "desc";
            this.routes.sort(this.sortInterface.bind(this));
            this.routes.reverse();
        }
    }





}