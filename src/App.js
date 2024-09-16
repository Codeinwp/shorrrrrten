import {
	useEffect,
	useState
} from 'react';

import GenerateURL from './components/GenerateURL';
import List from './components/List';
import { makeRequest } from './utils';

const App = () => {
	const [ data, setData ] = useState( [] );
	const [ currentPage, setCurrentPage ] = useState( 0 );
	const [ isLoading, setLoading ] = useState( true );
	const [ isError, setIsError ] = useState( false );

	const listURLs = async () => {
		setLoading( true );

		try {
			const perPage = 10;

			const response = await makeRequest( 'GET', {
				action: 'list',
				perpage: perPage,
				offset: currentPage * perPage,
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
				data={ data }
			/>
		</div>
	);
};

export default App;
