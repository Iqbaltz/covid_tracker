import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) => {
	const [ fetchedCountries, setfetchedCountries ] = useState([]);

	useEffect(
		() => {
			const fetchAPI = async () => {
				setfetchedCountries(await fetchCountries());
			};
			fetchAPI();
		},
		[ setfetchedCountries ]
	);

	const countries =
		fetchedCountries.length &&
		fetchedCountries.map((country, i) => (
			<option key={i} value={country}>
				{country}
			</option>
		));

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect default="" onChange={(e) => handleCountryChange(e.target.value)}>
				<option value="">Global</option>
				{countries}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
