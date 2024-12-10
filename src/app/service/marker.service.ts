import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { JeuxService } from './jeux.service';
import { PopUpService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(
    private jeuxService: JeuxService,
    private popupService: PopUpService
  ) { }

  makeMarkers(map: L.Map): void {
    this.jeuxService.get_jeux().subscribe((res: any) => {
      for (const c of res) {
        const [latitude, longitude] = c.point_geo.split(',').map((coord: string) => parseFloat(coord.trim()));
        if (!isNaN(latitude) && !isNaN(longitude)) {
          const marker = L.marker([latitude, longitude]);
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          marker.bindPopup(`
            <b>${c.nom}</b><br>
            ${c.description}<br>
            <b>Nombre de place:</b> ${c.quantite}<br>
            <a href="${googleMapsLink}" target="_blank">Voir sur Google Maps</a>
          `);
          marker.addTo(map);
        }
      }
    });
  }
}
