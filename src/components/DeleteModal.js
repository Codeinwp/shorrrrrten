import { useState } from 'react';

import { HiInformationCircle } from 'react-icons/hi';

import { Alert, Button, Modal } from 'flowbite-react';

import { makeRequest } from '../utils';

const DeleteModal = ({
	isDeleting,
	setDeleting,
	setCurrentPage,
	listURLs
}) => {
	const [ isLoading, setIsLoading ] = useState( false );
	const [ notice, setNotice ] = useState( {} );

	const deleteURL = async () => {
		setIsLoading( true );

		try {
			const response = await makeRequest( 'POST', {
				action: 'delete',
				shorturl: isDeleting
			} );

			setCurrentPage( 0 );
			listURLs();
			setDeleting( false );
		}
		catch ( error ) {
			setNotice({
				type: 'failure',
				message: 'An error occurred. Please try again.'
			});
		}
	};

	return (
		<Modal
			show={ isDeleting }
			size="md"
			onClose={ () => setDeleting( false ) }
			popup
			dismissible
		>
			<Modal.Header>
				<span className="ml-4 text-sm font-medium text-gray-900 dark:text-white">Confirm Deletion</span>
			</Modal.Header>

			<Modal.Body>
				<div className="space-y-6">
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this URL? This action cannot be undone.</p>
					</div>

					<div className="flex flex-col items-end">
						<Button
							color="failure"
							isProcessing={ isLoading }
							onClick={ deleteURL }
						>
							Delete
						</Button>
					</div>

					{ 'failure' === notice?.type && (
						<div>
							<Alert
								color={ notice.type }
								icon={ HiInformationCircle }
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

export default DeleteModal;
