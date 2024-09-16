import { useState } from 'react';

import { HiInformationCircle } from 'react-icons/hi';

import { Alert, Button, Modal, TextInput } from 'flowbite-react';

import { makeRequest } from '../utils';

const EditModal = ({
	isEditing,
	setIsEditing,
	listURLs
}) => {
	const [ isLoading, setIsLoading ] = useState( {
		shorturl: false,
		keyword: false
	} );

	const [ notice, setNotice ] = useState( {} );

	const [ data, setData ] = useState({});

	const onChange = ( obj ) => {
		setData({ ...data, ...obj });
	};

	const isValidURL = ( url ) => {
		return url.match( /^(http|https):\/\// );
	};

	const updateURL = async () => {
		setIsLoading({
			url: true,
			keyword: false
		});

		try {
			const params = {
				action: 'update',
				url: data.url,
				shorturl: isEditing.keyword,
			};

			await makeRequest( 'POST', params );

			setNotice({
				type: 'success',
				message: 'URL updated successfully.'
			});

			listURLs();

			setIsEditing({
				...isEditing,
				url: data.url
			});
		}
		catch ( error ) {
			setNotice({
				type: 'failure',
				message: 'An error occurred. Please try again.'
			});
		}

		setIsLoading({
			url: false,
			keyword: false
		});
	};

	const updateShortcode = async () => {
		setIsLoading({
			url: false,
			keyword: true
		});

		try {
			const params = {
				action: 'change_keyword',
				oldshorturl: isEditing.keyword,
				newshorturl: data.keyword,
			};

			await makeRequest( 'POST', params );

			setNotice({
				type: 'success',
				message: 'Shortcode updated successfully.'
			});

			listURLs();

			setIsEditing({
				...isEditing,
				keyword: data.keyword
			});
		}
		catch ( error ) {
			setNotice({
				type: 'failure',
				message: 'An error occurred. Please try again.'
			});
		}

		setIsLoading({
			url: false,
			keyword: false
		});
	};

	return (
		<Modal
			show={ isEditing }
			size="md"
			onClose={ () => setIsEditing( false ) }
			popup
			dismissible
		>
			<Modal.Header />
			<Modal.Body>
				<div className="space-y-6">
					<div className="flex flex-col items-center">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit URL</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">Update the long URL or short code</p>
					</div>

					<div>
						<TextInput
							placeholder="Long URL"
							value={ data?.url || isEditing?.url || '' }
							type="url"
							onChange={ ( event ) => onChange({ url: event.target.value }) }
							required
							color={ ( data.url && ! isValidURL( data.url )  ) ? 'warning' : 'dark' }
							disabled={ isLoading?.url || isLoading?.shorturl }
							helperText={
								<>
									{ ( data.url && ! isValidURL( data.url ) ) && (
										<><span className="font-medium">Required</span> Please enter a valid URL</>
									) }
								</>
							}
						/>
					</div>

					<div className="w-full">
						<Button
							fullSized
							disabled={ ! ( data.url && isValidURL( data.url ) ) || ! data?.url || data?.url === isEditing?.url || isLoading?.url || isLoading?.shorturl }
							color="dark"
							isProcessing={ isLoading?.shorturl }
							onClick={ updateURL }
						>
							Update URL
						</Button>
					</div>

					<div>
						<TextInput
							placeholder="Shortcode (optional)"
							value={ data?.keyword || isEditing?.keyword || '' }
							disabled={ isLoading?.url || isLoading?.shorturl }
							onChange={ ( event ) => onChange({ keyword: event.target.value }) }
						/>
					</div>

					<div className="w-full">
						<Button
							fullSized
							disabled={ ! data?.keyword || data?.keyword === isEditing?.keyword || isLoading?.url || isLoading?.shorturl }
							color="dark"
							isProcessing={ isLoading?.keyword }
							onClick={ updateShortcode }
						>
							Update Shortcode
						</Button>
					</div>

					{ notice?.type && (
						<div>
							<Alert
								color={ notice.type }
								icon={ 'failure' === notice?.type ? HiInformationCircle : HiInformationCircle }
							>
								{ notice.message }
							</Alert>
						</div>
					) }
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default EditModal;
