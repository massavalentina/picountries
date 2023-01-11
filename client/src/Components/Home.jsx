import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	alphabeticalOrder,
	byActivity,
	byContinents,
	getAllActivities,
	getAllCountries,
	populationOrder,
	setLoading,
} from '../Redux/actions';
import Card from './Card';
import Paginated from './Paginated';
import { Link } from 'react-router-dom';
import s from './Home.module.css'

const Home = () => {
	const dispatch = useDispatch();
	const countries = useSelector((e) => e.countries); //estados "globales"
	const loading = useSelector((e) => e.loading); //estados "globales"
	const activities = useSelector((e) => e.activities); //estados "globales"
	const [currentPage, setCurrentPage] = useState(1);
	const [couPerPage, setCouPerPage] = useState(9);
	const indexlast = currentPage * couPerPage;
	const indexFirst = indexlast - couPerPage;
	const allpages = countries.slice(indexFirst, indexlast);
	const [orderName, setOrderName] = useState('');
	const [orderPopulation, setOrderPopulation] = useState('');

	const handleOrderN = (e) => {
		e.preventDefault();
		dispatch(alphabeticalOrder(e.target.value));
		setCurrentPage(1);
		setOrderName(`Ordenado ${e.target.value}`);
	};

	const handleOrderP = (e) => {
		e.preventDefault();
		dispatch(populationOrder(e.target.value));
		setCurrentPage(1);
		setOrderPopulation(`Ordenado ${e.target.value}`);
	};

	const paginated = (pageNumber) => 	{
        if (pageNumber === 1) {
            setCouPerPage(9);
            setCurrentPage(pageNumber)
        } else if (pageNumber > 25) {
            setCouPerPage(10);
            setCurrentPage(25)
        } else {
            setCouPerPage(10);
            setCurrentPage(pageNumber)
        }
    }



	const handleContinents = (e) => {
		dispatch(byContinents(e.target.value));
		setCurrentPage(1)
	};

	const handleByActivity = (e) => {
		dispatch(byActivity(e.target.value));
	};

	useEffect(() => {
		dispatch(getAllCountries());
		dispatch(getAllActivities());
		dispatch(setLoading(true));
	}, [dispatch]);

	// useEffect(() => {
    //     setCharge(true);
    //     setTimeout(() => {
    //         setCharge(false);
    //     }, 5000);
    //     dispatch(getAllCountries());
    // }, []);

    function handleClick (e) {
        window.location.reload(false);
    }

	return (
		
		
		<div className={s.mainDiv}>

			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
			<link href="https://fonts.googleapis.com/css2?family=Cairo+Play&display=swap" rel="stylesheet"/>

			<div className={s.filters}>
			
				<select className={s.itemHome} onChange={(e) => handleOrderP(e)}>
					<option value=''>Population</option>
					<option value='Asc'>higher population</option>
					<option value='Des'>lower population</option>
				</select>
				

				<select className={s.itemHome} onChange={(e) => handleOrderN(e)}>
					<option value=''>Alphabetical</option>
					<option value='Asc'>A-Z</option>
					<option value='Des'>Z-A</option>
				</select>

				<select className={s.itemHome} onChange={(e) => handleByActivity(e)}>
					<option value='Nothing'>Select activities</option>
					<option value='All'>All</option>
					{activities.map((i) => (
						<option value={i.name}>{i.name}</option>
					))}
				</select>

				<select className={s.itemHome} onChange={(e) => handleContinents(e)}>
					<option value=''>Select continents</option>
					<option value='All'>All continents</option>
					<option value='South America'>South America</option>
					<option value='North America'>North America</option>
					<option value='Europe'>Europe</option>
					<option value='Africa'>Africa</option>
					<option value='Asia'>Asia</option>
					<option value='Oceania'>Oceania</option>
					<option value='Antarctica'>Antarctica</option>
				</select>

				<button  className={s.itemHome} onClick={e =>{handleClick(e)}}>Reload countries</button>

			</div>
			
				<Paginated
								countries={countries.length}
								couPerPage={couPerPage}
								paginated={paginated}
							/>
			<div className={s.containerCards}>

				{!loading ? 
				( allpages.map((i) => 
					(
					<div className={s.container}>
						<div className={s.cards}>
							
								<Card
									key={i.id}
									name={i.name}
									flag={i.flag}
									continent={i.continent}
								/>
							<div>
								<Link className={s.button} to={'/detail/' + i.id}>MORE INFO</Link>
							</div>
						</div>
					</div>
					))
				) : (
					<div className={s.containerL}>
						<div className={s.loading}>Loading...</div>
					</div>
					)
				};

			</div>


			

    	</div>
		
	);
};

export default Home;

