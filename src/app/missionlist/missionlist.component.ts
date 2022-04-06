import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';


@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {

  missions: Mission[] = []
  selectedMission?: Mission
  //rawData:any;

  constructor(private spacexService: SpacexapiService){

  }
  ngOnInit(): void {
    this.getMissions()
  }
  getMissions(): void{
    this.missions = this.spacexService.fetchData()
  }

}
