import { Component, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { last } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent {
  constructor(
    private ElementRef: ElementRef,
    private SharedService: SharedService
  ) {}
  months = [
    { name: 'January', num: 31 },
    { name: 'February', num: 28 },
    { name: 'March', num: 31 },
    { name: 'April', num: 31 },
    { name: 'May', num: 31 },
    { name: 'June', num: 30 },
    { name: 'July', num: 31 },
    { name: 'August', num: 31 },
    { name: 'September', num: 30 },
    { name: 'October', num: 31 },
    { name: 'November', num: 30 },
    { name: 'December', num: 31 },
  ];
  x: any;
  data = [12, 29, 3, 5, 2, 3, 12, 29, 3, 5, 2, 3];
  datasets: any[] = [];
  halls: any;
  hallName: any;
  date: any;
  ngOnInit(): void {
    this.SharedService.currentAllHalls.subscribe((data: any) => {
      this.halls = data;

      this.defaultData();
    });
  }
  defaultData() {
    this.ElementRef.nativeElement.querySelector('#date').value =
      'الاسبوع الاخير';
    this.ElementRef.nativeElement.querySelector('#name').value = 'جميع القاعات';
    this.name();
    this.getDate();
    this.lastWeek();
  }
  handelChart() {
    const ctx = this.ElementRef.nativeElement.querySelector('#chart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.x,
        datasets: this.datasets,
      },
    });
  }

  openFilter() {
    const filter = this.ElementRef.nativeElement.querySelector('#filter');
    let open = filter.classList.replace('close', 'open');
    if (!open) {
      filter.classList.replace('open', 'close');
    }
  }
  name() {
    const name = this.ElementRef.nativeElement.querySelector('#name');
    this.hallName = name.value;
    this.getDate();
  }
  getDate() {
    const date = this.ElementRef.nativeElement.querySelector('#date');
    this.date = date.value;
    if (this.date == 'اليوم') {
      this.x = [];
      let now = new Date();
      let date = new Date();

      for (let i = 0; i < 24; i++) {
        date.setDate(date.getHours() - i);

        if (now.getHours() == date.getDate()) {
          this.x.push(`الان`);
        } else {
          this.x.push(`${-i}`);
        }
      }
      this.x.reverse();
      this.lastDay();
    } else if (this.date == 'الاسبوع الاخير') {
      this.x = [];
      for (let i = 1; i <= 7; i++) {
        if (i == 7) {
          this.x.push('today');
        } else {
          this.x.push(`${i}`);
        }
      }
      this.lastWeek();
    } else if (this.date == 'الشهر الاخير') {
      this.x = [];
      for (let i = 1; i <= new Date().getDate(); i++) {
        if (i == new Date().getDate()) {
          this.x.push(`اليوم`);
        } else {
          this.x.push(`${i}`);
        }
        this.handelChart();
      }
      this.lastMonth();
    } else if (this.date == 'السنه الاخيره') {
      this.x = [];

      let month = new Date().getUTCMonth() + 1;

      let x = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      for (let i = 0; i < 12; i++) {
        month--;
        if (month < 0) {
          month = 11;
        }

        this.x.push(x[month]);
      }
      this.x.reverse();
      this.lastYear();
    }
  }

  lastDay() {
    this.datasets = [];
    let data = [];
    let datasets = [];

    if (this.hallName == 'جميع القاعات') {
      for (let i = 0; i < this.halls?.length; i++) {
        const element = this.halls[i];
        data = [];
        for (let x = 0; x < 24; x++) {
          let num = [];
          for (let z = 0; z < element?.reservations.length; z++) {
            const reservation = element?.reservations[z];
            let today = new Date();
            let date = new Date();
            date.setDate(date.getHours() - x);

            if (new Date(reservation.createdAt).getDate() == today.getDate()) {
              if (
                new Date(reservation.createdAt).getHours() == date.getDate()
              ) {
                num.push(reservation);
              }
            }
          }
          data.push(`${num.length}`);
        }
        data.reverse();
        datasets.push({
          label: `${element.hallName}`,
          data: data,
          borderWidth: 1,
        });
      }
      this.datasets = datasets;

      this.handelChart();
    } else {
      let element = this.halls?.filter(
        (element: any) => element._id == this.hallName
      )[0];
      data = [];
      for (let x = 0; x < 24; x++) {
        let num = [];
        for (let z = 0; z < element?.reservations.length; z++) {
          const reservation = element?.reservations[z];
          let today = new Date();
          let date = new Date();
          date.setDate(date.getHours() - x);

          if (new Date(reservation.createdAt).getDate() == today.getDate()) {
            if (new Date(reservation.createdAt).getHours() == date.getDate()) {
              num.push(reservation);
            }
          }
        }
        data.push(`${num.length}`);
      }
      data.reverse();
      datasets.push({
        label: `${element.hallName}`,
        data: data,
        borderWidth: 1,
      });

      this.datasets = datasets;

      this.handelChart();
    }
  }

  lastWeek() {
    this.datasets = [];
    let data = [];
    let datasets = [];

    if (this.hallName == 'جميع القاعات') {
      for (let i = 0; i < this.halls?.length; i++) {
        const element = this.halls[i];
        data = [];
        for (let x = 0; x < 7; x++) {
          let num = [];
          for (let z = 0; z < element?.reservations.length; z++) {
            const reservation = element?.reservations[z];
            let date = new Date();
            date.setDate(date.getDate() - x);
            if (new Date(reservation.createdAt).getDate() == date.getDate()) {
              num.push(reservation);
            }
          }

          data.push(`${num.length}`);
        }
        data.reverse();
        datasets.push({
          label: `${element.hallName}`,
          data: data,
          borderWidth: 1,
        });
      }
      this.datasets = datasets;

      this.handelChart();
    } else {
      let element = this.halls?.filter(
        (element: any) => element._id == this.hallName
      )[0];

      this.datasets = [];
      let data = [];
      let datasets = [];

      for (let x = 0; x < 7; x++) {
        let num = [];
        for (let z = 0; z < element?.reservations.length; z++) {
          const reservation = element?.reservations[z];
          let date = new Date();
          date.setDate(date.getDate() - x);
          if (new Date(reservation.createdAt).getDate() == date.getDate()) {
            num.push(reservation);
          }
        }

        data.push(`${num.length}`);
      }
      data.reverse();

      datasets.push({
        label: `${element.hallName}`,
        data: data,
        borderWidth: 1,
      });
      this.datasets = datasets;

      this.handelChart();
    }
  }

  lastMonth() {
    this.datasets = [];
    let data = [];
    let datasets = [];

    if (this.hallName == 'جميع القاعات') {
      for (let i = 0; i < this.halls?.length; i++) {
        const element = this.halls[i];
        data = [];
        for (let x = 0; x < new Date().getDate(); x++) {
          let num = [];
          for (let z = 0; z < element?.reservations.length; z++) {
            const reservation = element?.reservations[z];
            let date = new Date();
            date.setDate(date.getDate() - x);
            if (new Date(reservation.createdAt).getDate() == date.getDate()) {
              num.push(reservation);
            }
          }

          data.push(`${num.length}`);
        }
        data.reverse();
        datasets.push({
          label: `${element.hallName}`,
          data: data,
          borderWidth: 1,
        });
      }
      this.datasets = datasets;

      this.handelChart();
    } else {
      let element = this.halls?.filter(
        (element: any) => element._id == this.hallName
      )[0];

      this.datasets = [];
      let data = [];
      let datasets = [];

      for (let x = 0; x < new Date().getDate(); x++) {
        let num = [];
        for (let z = 0; z < element?.reservations.length; z++) {
          const reservation = element?.reservations[z];
          let date = new Date();
          date.setDate(date.getDate() - x);
          if (new Date(reservation.createdAt).getDate() == date.getDate()) {
            num.push(reservation);
          }
        }

        data.push(`${num.length}`);
      }
      data.reverse();

      datasets.push({
        label: `${element.hallName}`,
        data: data,
        borderWidth: 1,
      });
      this.datasets = datasets;

      this.handelChart();
    }
  }

  lastYear() {
    this.datasets = [];
    let data = [];
    let datasets = [];

    if (this.hallName == 'جميع القاعات') {
      for (let i = 0; i < this.halls?.length; i++) {
        const element = this.halls[i];
        data = [];
        for (let x = 0; x < new Date().getDate(); x++) {
          let num = [];
          for (let z = 0; z < element?.reservations.length; z++) {
            const reservation = element?.reservations[z];
            let date = new Date();
            date.setDate(date.getDate() - x);
            if (new Date(reservation.createdAt).getDate() == date.getDate()) {
              num.push(reservation);
            }
          }

          data.push(`${num.length}`);
        }
        data.reverse();
        datasets.push({
          label: `${element.hallName}`,
          data: data,
          borderWidth: 1,
        });
      }
      this.datasets = datasets;

      this.handelChart();
    } else {
      let element = this.halls?.filter(
        (element: any) => element._id == this.hallName
      )[0];

      this.datasets = [];
      let data = [];
      let datasets = [];

      for (let x = 0; x < new Date().getDate(); x++) {
        let num = [];
        for (let z = 0; z < element?.reservations.length; z++) {
          const reservation = element?.reservations[z];
          let date = new Date();
          date.setDate(date.getDate() - x);
          if (new Date(reservation.createdAt).getDate() == date.getDate()) {
            num.push(reservation);
          }
        }

        data.push(`${num.length}`);
      }
      data.reverse();

      datasets.push({
        label: `${element.hallName}`,
        data: data,
        borderWidth: 1,
      });
      this.datasets = datasets;

      this.handelChart();
    }
  }
}
