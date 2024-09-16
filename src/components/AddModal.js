import { useState } from 'react';

import { HiInformationCircle, HiClipboard } from 'react-icons/hi';

import { Alert, Button, Modal, TextInput, Tooltip } from 'flowbite-react';

import { makeRequest } from '../utils';

const AddModal = ({
	isOpen,
	setIsOpen,
	setCurrentPage,
	listURLs
}) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ notice, setNotice ] = useState( {} );
	const [ isComplete, setIsComplete ] = useState( false );

	const [ data, setData ] = useState({
		action: 'shorturl'
	});

	const onChange = ( obj ) => {
		setData({ ...data, ...obj });
	};

	const isValidURL = ( url ) => {
		return url.match( /^(http|https):\/\// );
	};

	const generateURL = async () => {
		setIsLoading( true );

		try {
			const response = await makeRequest( 'POST', data );
			setNotice({
				type: 'success',
				message: 'URL generated successfully.',
				shorturl: response?.shorturl
			});

			setIsComplete( true );
			setCurrentPage( 0 );
			listURLs();
		}
		catch ( error ) {
			setNotice({
				type: 'failure',
				message: ( error?.message && 'string' === typeof error?.message ) ? error?.message : 'An error occurred. Please try again.'
			});
		}

		setIsLoading( false );
	};

	return (
		<Modal
			show={ isOpen }
			size="md"
			onClose={ () => setIsOpen( false ) }
			popup
			dismissible
		>
			<Modal.Header />
			<Modal.Body>
				<div className="space-y-6">
					<div className="flex flex-col items-center">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Short URL</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">Enter a long URL to shorten</p>
					</div>

					<div>
						<TextInput
							placeholder="Long URL"
							value={ data?.url || '' }
							type="url"
							onChange={ ( event ) => onChange({ url: event.target.value }) }
							required
							color={ ( data.url && ! isValidURL( data.url ) ) ? 'warning' : 'dark' }
							disabled={ isLoading || isComplete }
							helperText={
								<>
									{ ( data.url && ! isValidURL( data.url ) ) && (
										<><span className="font-medium">Required</span> Please enter a valid URL</>
									) }
								</>
							}
						/>
					</div>

					<div>
						<TextInput
							placeholder="Shortcode (optional)"
							value={ data?.keyword || '' }
							disabled={ isLoading || isComplete }
							onChange={ ( event ) => onChange({ keyword: event.target.value }) }
						/>
					</div>

					<div>
						<TextInput
							placeholder="Website (optional)"
							value={ data?.website || '' }
							disabled={ isLoading || isComplete }
							onChange={ ( event ) => onChange({ website: event.target.value }) }
						/>
					</div>

					<div>
						<TextInput
							placeholder="Title (optional)"
							value={ data?.title || '' }
							disabled={ isLoading || isComplete }
							onChange={ ( event ) => onChange({ title: event.target.value }) }
						/>
					</div>

					<div className="w-full">
						<Button
							fullSized
							disabled={ isComplete || ! ( data.url && isValidURL( data.url ) ) }
							color="dark"
							isProcessing={ isLoading }
							onClick={ generateURL }
						>
							Generate URL
						</Button>
					</div>

					{ ( notice?.shorturl && 'success' === notice?.type ) && (
						<div className="grid w-full">
							<div className="relative">
								<label htmlFor="shortcode" className="sr-only">
									Short URL
								</label>

								<input
									id="shortcode"
									type="text"
									className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									value={ notice?.shorturl }
									disabled
									readOnly
								/>

								<Button
									color="light"
									size="xs"
									onClick={ () => {
										navigator.clipboard.writeText( notice?.shorturl ); 
									} }
									className="absolute end-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center"
								>
									<Tooltip content="Copy">
										<HiClipboard className="size-4" />
									</Tooltip>
								</Button>
							</div>
						</div>
					) }

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

export default AddModal;
