import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserStoreService } from "../../services/user-store.service";
import { ActivityLogService } from "../../services/activity-log.service";
import { ActivityLog } from "../../models/activity-log-request";
import { Subscription } from "rxjs";
import { Chart, registerables } from "chart.js";
import 'chartjs-adapter-date-fns'; // Import the required adapter
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  userId: number;
  activityLogs: ActivityLog[] = [];

  kcalChart: any;
  weightLossChart: any;

  subscriptions = new Subscription();

  constructor(private _userStoreService: UserStoreService,
              private _activityLogService: ActivityLogService) {
  }

  ngOnInit(): void {
    if (this._userStoreService.getIsLoggedIn()) {
      this.userId = this._userStoreService.getLoggedInUser().id;
      this.subscriptions.add(
        this._activityLogService.getAll(this.userId).subscribe(res => {
          this.activityLogs = res;
          this.isLoading = false;
          // this.processActivityLogs();
        }));
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.activityLogs.length) {
        this.processActivityLogs();
      }
    }, 100);
  }

  processActivityLogs(): void {
    let dates = this.activityLogs.map(log => new Date(log.date));
    dates.sort((a, b) => a.getDate() - b.getDate());
    const stringDates = dates.map(date => {
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      return formattedDate;
    })
    dates.map(log => log.toString());
    const kcalIntake = this.activityLogs.map(log => log.kcalIntake);
    this.drawKcalChart(stringDates, kcalIntake);

    const weightLoss = this.activityLogs.map(log => log.kcalIntake);
    this.drawWeightLossChart(stringDates, weightLoss);
  }

  drawKcalChart(dates: string[], kcalIntake: number[]): void {
    this.kcalChart = new Chart('kcalChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Kcal Intake Progress',
          data: kcalIntake,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Kcal Intake'
            }
          }
        }
      }
    });
  }


  drawWeightLossChart(dates: string[], weightLoss: number[]): void {
    this.weightLossChart = new Chart('weightLossChart', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Weight Loss',
          data: weightLoss,
          borderColor: 'green',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Weight'
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
