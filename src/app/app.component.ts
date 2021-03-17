import { Component } from '@angular/core';

interface TotalMarsCoordinate {
  xAxis: number,
  yAxis: number,
}

interface InitialRobotCoordinates {
  xAxis: number,
  yAxis: number,
  orientation: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'coding-challenge';

  totalMarsCoordinateInputField: TotalMarsCoordinate = {
    xAxis: 0,
    yAxis: 0
  };
  
  totalMarsCoordinate: TotalMarsCoordinate = {
    xAxis: 0,
    yAxis: 0
  };

  initialRobotCoordinates: InitialRobotCoordinates = {
    xAxis: 0,
    yAxis: 0,
    orientation: ''
  };

  instructions: string = '';
  robotLeft: string = '0';
  robotBottom: string = '0';
  robotLost: boolean = false;
  lostXCoordinate: any = '';
  lostYCoordinate: any = '';

  inputOrientationForRight: any = {
    E: "S",
    S: "W",
    W: "N",
    N: "E"
  }
  inputOrientationForLeft: any = {
    E: "N",
    N: "W",
    W: "S",
    S: "E"
  }

  readMarsData(): void {
    this.totalMarsCoordinate.xAxis = Number(this.totalMarsCoordinateInputField.xAxis) - 1;
    this.totalMarsCoordinate.yAxis = Number(this.totalMarsCoordinateInputField.yAxis) - 1;
  }

  readInitialCordinates(): void {
    this.initialRobotCoordinates.xAxis = Number(this.initialRobotCoordinates.xAxis);
    this.initialRobotCoordinates.yAxis = Number(this.initialRobotCoordinates.yAxis);
    this.robotBottom = `calc(${(500 / this.totalMarsCoordinate.yAxis) * this.initialRobotCoordinates.yAxis}px ${this.initialRobotCoordinates.yAxis > 0 ? '- 100px' : ''})`;
    this.robotLeft= `calc(${(100 / this.totalMarsCoordinate.xAxis) * this.initialRobotCoordinates.xAxis}% ${this.initialRobotCoordinates.xAxis > 0 ? '- 100px' : ''})`;

  }
  
  moveRobot() {
    this.robotLost = false;
    for (const [index, item] of this.instructions.toUpperCase().split('').entries()) {
        setTimeout(() => {
          if (!this.robotLost) {
            this.runInstructionItem(item, this.initialRobotCoordinates.orientation.toUpperCase());
            this.robotBottom = `calc(${(500 / this.totalMarsCoordinate.yAxis) * this.initialRobotCoordinates.yAxis}px ${this.initialRobotCoordinates.yAxis > 0 ? '- 100px' : ''})`;
            this.robotLeft= `calc(${(100 / this.totalMarsCoordinate.xAxis) * this.initialRobotCoordinates.xAxis}% ${this.initialRobotCoordinates.xAxis > 0 ? '- 100px' : ''})`;
          }
        }, index * 1000);
    }
  }

  runInstructionItem(item: string, orientation: string) {
    switch(item) {
      case "R":
        this.initialRobotCoordinates.orientation = this.inputOrientationForRight[orientation];
        break;
      
      case "L":
        this.initialRobotCoordinates.orientation = this.inputOrientationForLeft[orientation];
        break;

      case "F":
        this.moveForward(orientation);
    }
  }

  moveForward(orientation: string) {
    switch(orientation) {
      case "E": 
        if (this.initialRobotCoordinates.xAxis + 1 > this.totalMarsCoordinate.xAxis && this.initialRobotCoordinates.xAxis !== this.lostXCoordinate) {
          this.robotLost = true;
          this.lostXCoordinate = this.initialRobotCoordinates.xAxis;
        } 
        if (this.initialRobotCoordinates.xAxis !== this.lostXCoordinate && this.initialRobotCoordinates.xAxis + 1 <= this.totalMarsCoordinate.xAxis) {
            this.initialRobotCoordinates.xAxis = this.initialRobotCoordinates.xAxis + 1;
            this.robotLost = false;
        }
        break;

      case "N":
        if (this.initialRobotCoordinates.yAxis + 1 >  this.totalMarsCoordinate.yAxis && this.initialRobotCoordinates.yAxis !== this.lostYCoordinate) {
          this.robotLost = true;
          this.lostYCoordinate = this.initialRobotCoordinates.yAxis;
        }
        if (this.initialRobotCoordinates.yAxis !== this.lostYCoordinate && this.initialRobotCoordinates.yAxis + 1 <= this.totalMarsCoordinate.yAxis) {
            this.initialRobotCoordinates.yAxis = this.initialRobotCoordinates.yAxis + 1;
            this.robotLost = false;
        }
        break;
      
      case "W":
        if (this.initialRobotCoordinates.xAxis < 0 && this.initialRobotCoordinates.xAxis !== this.lostXCoordinate) {
          this.robotLost = true;
          this.lostXCoordinate = this.initialRobotCoordinates.xAxis;
        }
        if (this.initialRobotCoordinates.xAxis !== this.lostXCoordinate && this.initialRobotCoordinates.xAxis - 1 >= 0 ) {
            this.initialRobotCoordinates.xAxis = this.initialRobotCoordinates.xAxis - 1;
            this.robotLost = false;
        }
        break;

      case "S":
        if (this.initialRobotCoordinates.yAxis < 0 && this.initialRobotCoordinates.yAxis !== this.lostYCoordinate) {
          this.robotLost = true;
          this.lostYCoordinate = this.initialRobotCoordinates.yAxis;
        }   
        if (this.initialRobotCoordinates.yAxis !== this.lostYCoordinate && this.initialRobotCoordinates.yAxis - 1 >= 0) {
            this.initialRobotCoordinates.yAxis = this.initialRobotCoordinates.yAxis - 1;
            this.robotLost = false;
        }
        break;
    }
  }

}
