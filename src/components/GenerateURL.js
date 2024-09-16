import { useState } from 'react';

import { Button } from 'flowbite-react';

import AddModal from './AddModal';

const GenerateURL = ({
	setCurrentPage,
	listURLs
}) => {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<>
			<Button
				color="dark"
				onClick={ () => setIsOpen( true ) }
			>
                Generate URL
			</Button>

			{ isOpen && (
				<AddModal
					isOpen={ isOpen }
					setIsOpen={ setIsOpen }
					setCurrentPage={ setCurrentPage }
					listURLs={ listURLs }
				/>
			) }
		</>
	);
};

export default GenerateURL;
