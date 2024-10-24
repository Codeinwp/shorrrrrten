import { useState } from 'react';

import {
	Card,
	Pagination,
	Spinner,
	Table
} from 'flowbite-react';

import classNames from 'classnames';

import EditModal from './EditModal';

import DeleteModal from './DeleteModal';

const List = ({
	isLoading,
	isError,
	currentPage,
	setCurrentPage,
	listURLs,
	isGod,
	data
}) => {
	const [ isEditing, setIsEditing ] = useState( false );
	const [ isDeleting, setDeleting ] = useState( false );
	const [ search, setSearch ] = useState( '' );

	return (
		<>
			<Card
				className={ classNames(
					'relative',
					{
						'opacity-20': isLoading,
					}
				) }
			>
				<div className="flex flex-col space-y-1.5 p-6">
					<h5 className="mb-1 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">URL List</h5>
					<p className="text-sm font-normal text-gray-500 dark:text-gray-400">Manage your shortened URLs</p>
				</div>

				<div className="relative w-full">
					<input
						type="text"
						value={ search }
						onChange={ ( event ) => setSearch( event.target.value ) }
						onKeyDown={ ( event ) => {
							if ( 'Enter' === event.key ) {
								listURLs( search );
							}
						} }
						placeholder="Enter shortcode..."
						className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-600 focus:border-gray-300 focus:outline-none"
					/>

					{ search && (
						<button
							type="button"
							onClick={ () => {
								setSearch( '' );
								listURLs();
							} }
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 6L6 18" />
								<path d="M6 6l12 12" />
							</svg>
						</button>
					)}
				</div>

				{ 0 !== data?.result?.length && (
					<Table>
						<Table.Head>
							<Table.HeadCell>Long URL</Table.HeadCell>
							<Table.HeadCell>Shortcode</Table.HeadCell>
							<Table.HeadCell>Visits</Table.HeadCell>
							{ isGod && (
								<>
									<Table.HeadCell>
										<span className="sr-only">Edit</span>
									</Table.HeadCell>
									<Table.HeadCell>
										<span className="sr-only">Delete</span>
									</Table.HeadCell>
								</>
							) }
						</Table.Head>

						<Table.Body className="divide-y">
							{ data?.result?.map( ( item ) => (
								<Table.Row
									key={ item?.keyword }
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell className="min-w-72 max-w-72 truncate font-medium text-gray-900 dark:text-white">
										{ item?.url }
									</Table.Cell>

									<Table.Cell>{ item?.keyword }</Table.Cell>

									<Table.Cell>{ item?.clicks }</Table.Cell>

									{ isGod && (
										<>
											<Table.Cell
												className="max-w-20"
											>
												<button
													className="relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-md border-transparent bg-transparent px-3 py-2 text-center align-bottom leading-[normal] text-cyan-600 transition duration-200 ease-in-out focus:outline-none focus:outline-offset-0 focus:ring-1"
													onClick={ () => setIsEditing( item ) }
												>
                                            Edit
												</button>
											</Table.Cell>

											<Table.Cell
												className="max-w-20"
											>
												<button
													className="relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-md border-transparent bg-transparent px-3 py-2 text-center align-bottom leading-[normal] text-red-600 transition duration-200 ease-in-out focus:outline-none focus:outline-offset-0 focus:ring-1"
													onClick={ () => setDeleting( item?.keyword ) }
												>
                                            Delete
												</button>
											</Table.Cell>
										</>
									) }
								</Table.Row>
							) ) }
						</Table.Body>
					</Table>
				) }

				{ ( data?.result && ( data?.total > data?.perpage) ) && (
					<div className="flex overflow-x-auto sm:justify-center">
						<Pagination
							layout="navigation"
							currentPage={ currentPage + 1 }
							totalPages={ data?.total / data?.perpage }
							onPageChange={ ( page ) => setCurrentPage( page - 1 ) }
							showIcons
						/>
					</div>
				) }

				{ 0 === data?.result?.length && (
					<div className="flex items-center justify-center p-4">
						<p className="text-sm text-gray-500 dark:text-gray-400">No URLs found.</p>
					</div>
				) }

				{ isLoading && (
					<div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
						<Spinner size="lg" />
					</div>
				) }

				{ isError && (
					<div className="flex items-center justify-center p-4">
						<p className="text-sm text-red-500 dark:text-red-400">An error occurred. Please try again.</p>
					</div>
				) }
			</Card>

			{ isEditing && (
				<EditModal
					isEditing={ isEditing }
					setIsEditing={ setIsEditing }
					listURLs={ listURLs }
				/>
			) }

			{ isDeleting && (
				<DeleteModal
					isDeleting={ isDeleting }
					setDeleting={ setDeleting }
					setCurrentPage={ setCurrentPage }
					listURLs={ listURLs }
				/>
			) }
		</>
	);
};

export default List;
