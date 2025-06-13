import { Injectable, InjectionToken } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { Routee } from "./routee.interface";

const interfaceTypes = [
    "Подключение Ethernet", "Гостевая сеть", "Домашная сеть", "Подключение Ethernet"
]


@Injectable()
export class RoutesService {

    constructor() {
        this.retrieveRoutes();
    }

    items: Routee[] = [];

    private retrieveRoutes() {
        for (let q = 0; q < 100; q++) {
            this.items.push({
                uuid: uuidv4(),
                address: this.getAddressGatewayMask(),
                mask: this.getAddressGatewayMask(),
                gateway: this.getAddressGatewayMask(),
                interface: interfaceTypes[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
            })
        }
    }


    private getAddressGatewayMask() {
        var ipAddressGatewayMask = (Math.floor(Math.random() * 255) + 1) +
            "." + (Math.floor(Math.random() * 255))
            + "." + (Math.floor(Math.random() * 255))
            + "." + (Math.floor(Math.random() * 255));
        return ipAddressGatewayMask;
    }

    public getItems() {
        return this.items;
    }
}