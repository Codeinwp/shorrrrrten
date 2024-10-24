import {
	useEffect,
	useState
} from 'react';

import GenerateURL from './components/GenerateURL';
import List from './components/List';
import { makeRequest } from './utils';

const { VITE_GOD_MODE } = import.meta.env;

const App = () => {
	const [ data, setData ] = useState( [] );
	const [ currentPage, setCurrentPage ] = useState( 0 );
	const [ isLoading, setLoading ] = useState( true );
	const [ isError, setIsError ] = useState( false );
	const [ isGod, setIsGod ] = useState( VITE_GOD_MODE === undefined || VITE_GOD_MODE === 'true' );

	const listURLs = async ( query = '' ) => {
		setLoading( true );

		try {
			const perPage = 10;

			const response = await makeRequest( 'GET', {
				action: 'list',
				perpage: perPage,
				offset: currentPage * perPage,
				...( query ? { query } : {} ),
			} );

			if ( 200 === response.statusCode ) {
				setData( response );
			} else {
				setIsError( true );
			}
		}
		catch ( error ) {
			setIsError( true );
		}

		setLoading( false );
	};

	useEffect(() => {
		if ( typeof VITE_GOD_MODE === 'string' && VITE_GOD_MODE !== 'true' && VITE_GOD_MODE !== 'false' ) {
			window.godMode = {
				enter( password ) {
					if ( password === VITE_GOD_MODE ) {
						setIsGod( true );
						console.log( '🎉 God Mode activated!' );
					} else {
						console.log( '❌ Your hands are too short to box with the God.' );
					}
				},
				exit() {
					setIsGod( false );
					console.log( '👋 God Mode deactivated!' );
				},
			};

			return () => {
				delete window.godMode;
			};
		}
	}, []);

	useEffect(() => {
		listURLs();
	}, [ currentPage ]);

	return (
		<div className="container mx-auto max-w-screen-lg">
			<div className="mb-4 flex items-center justify-between p-4">
				<h1 className="text-2xl font-bold">Shorrrrrten</h1>
				<GenerateURL
					setCurrentPage={ setCurrentPage }
					listURLs={ listURLs }
				/>
			</div>

			<List
				isLoading={ isLoading }
				isError={ isError }
				currentPage={ currentPage }
				setCurrentPage={ setCurrentPage }
				listURLs={ listURLs }
				isGod={ isGod }
				data={ data }
			/>
		</div>
	);
};

export default App;
