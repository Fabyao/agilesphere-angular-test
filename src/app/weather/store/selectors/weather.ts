import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RootWeatherState } from '../reducers/weather';
import { Summary, TemperatureInfo, WeatherViewInfo } from '../../../model/weather';
import * as moment from 'moment';

export const selectRootWeatherState =
    createFeatureSelector<RootWeatherState>('weather');

export const defaultTemperatureTimes = ['6 AM', '12 PM', '6 PM', '12 AM'];

interface TimeComparisonResult {
    isValid: boolean;
    matchedDate: Date;
}
const matchTime = (date: string): TimeComparisonResult => {

    const momentFirstDate = moment(date, this.defaultTimeFormat);

    const comparisonResult: TimeComparisonResult = {
        isValid: false,
        matchedDate: null
    };

    for (const time of defaultTemperatureTimes) {
        const momentTime = moment(time, 'H A').format('HH:mm:ss');
        const formatedSecondDate = moment(`${momentFirstDate.format('YYYY-MM-DD')} ${momentTime}`, this.defaultTimeFormat);

        if (momentFirstDate.isSame(formatedSecondDate)) {
            comparisonResult.isValid = true;
            comparisonResult.matchedDate = momentFirstDate.toDate();
            break;
        }
    }

    return comparisonResult;
};

const toShortTime = (datetime: Date): string => {
    return moment(datetime).format('H A');
};

export const selectWeatherList = createSelector(
    selectRootWeatherState,
    (state: RootWeatherState) => {

        const citiesSummary: Summary[] = [];

        Object.keys(state.weather.entities).forEach(key => {
            const cityInfo = state.weather.entities[key];

            let dayTemp: TemperatureInfo[] = [];

            cityInfo.list.forEach(c => {
                const matchTimeResult = matchTime(c.dt_txt);

                if (matchTimeResult.isValid) {
                    dayTemp.push({ temparature: c.main.temp, dateTime: matchTimeResult.matchedDate });
                }
            });

            dayTemp = dayTemp.sort((a, b) => {
                return a.dateTime.getTime() - b.dateTime.getTime();
            });

            citiesSummary.push({
                city: cityInfo.city.name,
                temperatureInfo: dayTemp
            });

        });

        const weatherInfo: WeatherViewInfo = {
            summary: citiesSummary,
            headerInfo: defaultTemperatureTimes
        };

        if (weatherInfo.summary.length > 0) {
            weatherInfo.headerInfo = citiesSummary[0].temperatureInfo.map(t => toShortTime(t.dateTime));
        }
        weatherInfo.headerInfo.unshift('City');

        return weatherInfo;
    }
);
