import { Component, OnInit } from '@angular/core';
import { DATASET } from './dataset';
import { POSITIONS } from './list';
import { AgmCoreModule } from '@agm/core'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  public lat: number = 48.4726136;
  public lng: number = 1.01271829999996;
  public distances = [];
  public startPositionLat: number;
  public startPositionLng: number;
  public arrivalPositionLat: number;
  public arrivalPositionLng: number;
  public selectedValue: any = "";
  public zoom: number = 8;
  public selectedKm: number;
  public data = DATASET;
  public positions = POSITIONS;

  calculateAllDistances(startPointLat, startPointLng, arrivalPointLat, arrivalPointLng) {
    this.distances= [];
    startPointLat = this.selectedValue.lat;
    startPointLng = this.selectedValue.lng;
    let results = [];

    for (let arrival of this.data) {
      arrivalPointLat = arrival.lat;
      arrivalPointLng = arrival.lng;
      let arrivalCoord = [];
      arrivalCoord.push(arrivalPointLat, arrivalPointLng);
      let distance = [];
      distance.push(arrival.name, this.getDistanceFromLatLonInKm(startPointLat, startPointLng,
        arrivalCoord[0], arrivalCoord[1]).toFixed(2));
      this.distances.push(distance);
    }

    this.distanceIntoNumber();
    this.distances.sort(this.sortBySecondColumn)
    this.distances = this.getCalculatedDistances(this.distances, this.selectedKm);
    this.selectedKm = null;
  }

  getCalculatedDistances(distances, max: number) {
    let result = [];
    for (let distance of distances) {
      if (distance[1] < max) {
        result.push(distance);
      }
    }
    return result;
  }

  sortBySecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] < b[1]) ? -1 : 1;
    }
  }

  distanceIntoNumber() {
    let toto;
    for (let distance of this.distances) {
      distance[1] = parseFloat(distance[1]);
    }
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  constructor() {

  }

  ngOnInit() {
  }
}
