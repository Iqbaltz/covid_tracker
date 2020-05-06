import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

const fetchData = async (country) => {
	let changeableUrl = url;

	if (country) {
		changeableUrl = `${url}/countries/${country}`;
	}

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (err) {
		return err;
	}
};

const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate
		}));

		return modifiedData;
	} catch (err) {
		return err;
	}
};

const fetchCountries = async () => {
	try {
		const { data: { countries } } = await axios.get(`${url}/countries`);

		return countries.map((country) => country.name);
	} catch (err) {
		return err;
	}
};

const fetchAllCountriesData = async () => {
	try {
		const { data: { countries } } = await axios.get(`${url}/countries`);

		const filteredContries = countries
			.map((country) => country.name)
			.filter((country) => country.toLowerCase() !== 'gambia');

		const allData = await Promise.all(
			filteredContries.map((country) => axios.get(`https://covid19.mathdro.id/api/countries/${country}`))
		);

		return allData.map((data, i) => ({ ...data.data, name: filteredContries[i] }));
	} catch (err) {
		return err;
	}
};
// sorting
// (a, b) => b.confirmed.value - a.confirmed.value)

export { fetchData, fetchDailyData, fetchCountries, fetchAllCountriesData };
