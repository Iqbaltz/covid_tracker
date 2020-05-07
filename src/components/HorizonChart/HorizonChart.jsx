import React, { useState, useEffect } from 'react';
import { fetchAllCountriesData } from '../../api';
import { HorizontalBar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import styles from './HorizonChart.module.css';

const HorizonChart = () => {
	const [ allCountriesData, setAllCountriesData ] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setAllCountriesData(await fetchAllCountriesData());
		};

		fetchAPI();
	}, []);

	const mostInfected =
		allCountriesData.length && allCountriesData.sort((a, b) => b.confirmed.value - a.confirmed.value).slice(0, 10);
	const mostRecovered =
		allCountriesData.length && allCountriesData.sort((a, b) => b.recovered.value - a.recovered.value).slice(0, 10);
	const mostDeaths =
		allCountriesData.length && allCountriesData.sort((a, b) => b.deaths.value - a.deaths.value).slice(0, 10);

	const horizonBarChart = allCountriesData.length ? (
		<div>
			<Typography variant="h4" component="h4" color="textSecondary">
				The Most Confirmed Cases of COVID19
			</Typography>
			<HorizontalBar
				data={{
					labels: mostInfected.map(({ name }) => name),
					datasets: [
						{
							label: 'Confirmed',
							backgroundColor: '#2761ff',
							data: mostInfected.map(({ confirmed }) => confirmed.value)
						},
						{
							label: 'Recovered',
							hidden: true,
							backgroundColor: '#27ff39',
							data: mostInfected.map(({ recovered }) => recovered.value)
						},
						{
							label: 'Deaths',
							hidden: true,
							backgroundColor: '#ff2727',
							data: mostInfected.map(({ deaths }) => deaths.value)
						}
					]
				}}
			/>
			<Typography variant="h4" component="h4" color="textSecondary">
				The Most Recovered Cases of COVID19
			</Typography>
			<HorizontalBar
				data={{
					labels: mostRecovered.map(({ name }) => name),
					datasets: [
						{
							label: 'Recovered',
							backgroundColor: '#27ff39',
							data: mostRecovered.map(({ recovered }) => recovered.value)
						},
						{
							label: 'Confirmed',
							hidden: true,
							backgroundColor: '#2761ff',
							data: mostRecovered.map(({ confirmed }) => confirmed.value)
						},
						{
							label: 'Deaths',
							hidden: true,
							backgroundColor: '#ff2727',
							data: mostRecovered.map(({ deaths }) => deaths.value)
						}
					]
				}}
			/>
			<Typography variant="h4" component="h4" color="textSecondary">
				The Most Deaths Cases of COVID19
			</Typography>
			<HorizontalBar
				data={{
					labels: mostDeaths.map(({ name }) => name),
					datasets: [
						{
							label: 'Deaths',
							backgroundColor: '#ff2727',
							data: mostDeaths.map(({ deaths }) => deaths.value)
						},
						{
							label: 'Confirmed',
							hidden: true,
							backgroundColor: '#2761ff',
							data: mostDeaths.map(({ confirmed }) => confirmed.value)
						},
						{
							label: 'Recovered',
							hidden: true,
							backgroundColor: '#27ff39',
							data: mostDeaths.map(({ recovered }) => recovered.value)
						}
					]
				}}
			/>
		</div>
	) : null;

	return <div className={styles.container}>{horizonBarChart}</div>;
};

export default HorizonChart;
