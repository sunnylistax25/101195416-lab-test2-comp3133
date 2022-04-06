import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Mission } from '../models/mission'
@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  missions$: any
  missions: Mission[] = [] 

  private BASE_URL = 'https://api.spacexdata.com/v3/launches'

  constructor(private httpClient: HttpClient) { }
   
  fetchRawData(): Observable<Object> {
    return this.httpClient.get(this.BASE_URL)
  }

  fetchData() {
    this.missions$ = this.fetchRawData()
    return this.getMissionsData()
  }

  getMissionsData(): Mission[] {
    this.missions$.forEach((element: any) => {
      element.forEach((eachData: any) => {
        const { flight_number, mission_name, launch_year, details, links } = eachData
        const mission_patch_small: string = links.mission_patch_small
        const mission: Mission = { flight_number, mission_name, launch_year, details, mission_patch_small}
        this.missions.push(mission)
      })
    });
    return this.missions
  }
  
  findMission(id: number): any {
    const allMissions = this.fetchData()
    return allMissions.find(mission => mission.flight_number == id)

  }

}

