const { VITE_YOURLS_API_URL, VITE_YOURLS_SECRET } = import.meta.env;

const BASE_URL = VITE_YOURLS_API_URL;
const SECRET = VITE_YOURLS_SECRET;

const serializeParams = params => {
	const urlParams = new URLSearchParams();

	for ( const key in params ) {
		if ( Array.isArray( params[ key ]) ) {
			params[ key ].forEach( value => {
				urlParams.append( `${key}[]`, value );
			});
		} else {
			urlParams.append( key, params[ key ] );
		}
	}

	return urlParams;
};

export const makeRequest = async ( method = 'POST', data ) => {
	const options = {
		format: 'json',
		signature: SECRET,
	};

	const params = { ...options, ...data };

	try {
		let url = BASE_URL;
		let fetchOptions = {
			method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};

		if ( method === 'GET' ) {
			url += `?${ serializeParams( params ).toString() }`;
		} else {
			fetchOptions.body = serializeParams( params );
		}

		const response = await fetch( url, fetchOptions );
		const data = await response.json();

		if ( ! response.ok ) {
			throw new Error( data.message || 'Something went wrong' );
		}

		return data;
	} catch ( error ) {
		throw new Error( error.message );
	}
};
