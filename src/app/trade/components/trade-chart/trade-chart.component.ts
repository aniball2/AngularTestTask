import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { ITradeRow } from '../../types/trade-row';
import { formatDate } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-trade-chart',
  templateUrl: './trade-chart.component.html',
  styleUrl: './trade-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeChartComponent implements OnChanges {
  @Input() data: ITradeRow[] = [];

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: '',
        data: [],
      },
    ],
    chart: {
      height: 450,
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Balance',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      this.chartOptions.xaxis!.categories = this.data.map(item =>
        formatDate(item.exitDate, 'MM-dd-YYYY HH:MM:ss', 'en'),
      );
      this.chartOptions.series![0].data = this.data.reduce<number[]>((acc, item) => {
        acc.push(item.exitPrice - item.entryPrice);
        return acc;
      }, []);
      this.cdr.detectChanges();
    }
  }
}
