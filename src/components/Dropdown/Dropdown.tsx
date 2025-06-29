import React, {
	useRef,
	useId,
	useEffect,
	useCallback,
	forwardRef,
	ReactNode,
} from 'react';
import classNames from 'classnames';
import { Wrapper } from '../Wrappers';
import styles from './dropdown.module.scss';
import Loading from '../Loading/Loading';
import { Input } from '../Inputs/Input';
import { Checkbox } from '../Checkbox/Checkbox';

export interface DropdownOption {
	label: string;
	value: string;
	numericValue?: number;
	className?: string;
}

export interface DropdownProps {
	data?: DropdownOption[]; // New: options as data prop
	children?: ReactNode; // New: options as children
	value?: string | string[];
	defaultValue?: string | string[];
	onChange: (value: string | string[]) => void;
	onSearch?: (search: string) => void;
	label?: string | React.ReactNode;
	helpText?: string | React.ReactNode;
	error?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	loading?: boolean;
	name?: string;
	id?: string;
	variant?:
		| 'dropdown'
		| 'multiselect'
		| 'searchable'
		| 'custom';
	size?: 'small' | 'medium' | 'large';
	searchable?: boolean;
	clearable?: boolean;
	filter?: boolean;
	placeholder?: string;
	searchPlaceholder?: string;
	loadingMessage?: string;
	componentId?: string;
	[key: string]: any;
}

export const Dropdown = forwardRef<
	HTMLDivElement,
	DropdownProps
>(
	(
		{
			componentId,
			data,
			children,
			value: controlledValue,
			defaultValue,
			onChange,
			onSearch,
			label,
			helpText,
			error,
			className,
			disabled,
			required,
			loading,
			name,
			id,
			variant = 'dropdown',
			size = 'medium',
			searchable = false,
			clearable = false,
			filter = false,
			placeholder,
			searchPlaceholder,
			loadingMessage,
			...props
		},
		ref
	) => {
		const uniqueId = useId();
		const dropdownComponentId =
			componentId || `dropdown-${uniqueId}`;
		const containerRef = useRef<HTMLDivElement>(null);
		const inputRef = useRef<HTMLInputElement>(null);
		const menuRef = useRef<HTMLDivElement>(null);
		const [isOpen, setIsOpen] = React.useState(false);
		const [searchValue, setSearchValue] =
			React.useState('');
		const [internalValue, setInternalValue] =
			React.useState(
				defaultValue !== undefined ? defaultValue
				: variant === 'multiselect' ? []
				: ''
			);
		const [filterValue, setFilterValue] = React.useState<
			'none' | 'az' | 'za' | 'largest' | 'smallest'
		>('none');
		const isControlled = controlledValue !== undefined;
		const currentValue =
			isControlled ? controlledValue : internalValue;
		// Use data prop if present, otherwise fallback to children
		const options: DropdownOption[] = data || [];
		const hasData = !!data && data.length > 0;
		const hasChildren = !!children;
		const getFilteredOptions = useCallback(() => {
			let filtered = options;

			// Apply filter dropdown logic
			if (filter && filterValue !== 'none') {
				if (filterValue === 'az') {
					filtered = [...filtered].sort((a, b) =>
						a.label.localeCompare(b.label)
					);
				} else if (filterValue === 'za') {
					filtered = [...filtered].sort((a, b) =>
						b.label.localeCompare(a.label)
					);
				} else if (filterValue === 'largest') {
					filtered = [...filtered].sort(
						(a, b) =>
							(b.numericValue ?? 0) - (a.numericValue ?? 0)
					);
				} else if (filterValue === 'smallest') {
					filtered = [...filtered].sort(
						(a, b) =>
							(a.numericValue ?? 0) - (b.numericValue ?? 0)
					);
				}
			}

			// Apply search logic
			if (searchable && searchValue) {
				filtered = filtered.filter(
					(opt: { label: string; value: string }) =>
						opt.label
							.toLowerCase()
							.includes(searchValue.toLowerCase())
				);
			}
			// Not searching: just show all, no separation
			return { selected: [], rest: filtered };
		}, [
			options,
			searchable,
			searchValue,
			variant,
			currentValue,
			filter,
			filterValue,
		]);

		const filteredOptions = getFilteredOptions();
		const getDisplayValue = () => {
			if (
				variant === 'multiselect' &&
				Array.isArray(currentValue)
			) {
				return options
					.filter((opt: { label: string; value: string }) =>
						currentValue.includes(opt.value)
					)
					.map(
						(opt: { label: string; value: string }) =>
							opt.label
					)
					.join(', ');
			}
			const found = options.find(
				(opt: { label: string; value: string }) =>
					opt.value === currentValue
			);
			return found ? found.label : '';
		};
		const getContainerClasses = () =>
			classNames(
				styles.dropdownContainer,
				styles[`variant-${variant}`],
				styles[`size-${size}`],
				{
					[styles.open]: isOpen,
					[styles.disabled]: disabled,
					[styles.error]: !!error,
					[styles.loading]: loading,
					[styles.multiple]: variant === 'multiselect',
					[styles.searchable]: searchable,
				},
				className
			);
		const handleToggle = () => {
			if (disabled || loading) return;
			setIsOpen(!isOpen);
			if (!isOpen && searchable) {
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		};
		const handleSelect = (option: {
			label: string;
			value: string;
		}) => {
			if (variant === 'multiselect') {
				let newValue: string[];
				if (
					Array.isArray(currentValue) &&
					currentValue.includes(option.value)
				) {
					newValue = currentValue.filter(
						(v: string) => v !== option.value
					);
				} else {
					newValue =
						Array.isArray(currentValue) ?
							[...currentValue, option.value]
						:	[option.value];
				}
				if (!isControlled) setInternalValue(newValue);
				onChange?.(newValue);
			} else {
				if (!isControlled) setInternalValue(option.value);
				onChange?.(option.value);
				setIsOpen(false);
			}
		};
		const handleClear = () => {
			if (!isControlled)
				setInternalValue(
					variant === 'multiselect' ? [] : ''
				);
			onChange?.(variant === 'multiselect' ? [] : '');
			setSearchValue('');
		};
		const handleSearchChange = (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			setSearchValue(e.target.value);
			onSearch?.(e.target.value);
		};
		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false);
		};
		return (
			<Wrapper
				kind='component-wrapper'
				ref={containerRef}
				className={getContainerClasses()}
				data-testid='dropdown-container'
			>
				{label && (
					<label className={styles.fieldLabel} htmlFor={id}>
						{label}
						{required && (
							<span className={styles.requiredMark}>*</span>
						)}
					</label>
				)}
				<div
					className={styles.control}
					onClick={handleToggle}
					tabIndex={0}
					role='button'
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					aria-disabled={disabled}
					id={id}
					onKeyDown={handleKeyDown}
				>
					<div className={styles.valueContainer}>
						{/* Only show value or placeholder in control area, never a search input */}
						<span className={styles.singleValue}>
							{getDisplayValue() ||
								placeholder ||
								'Dropdown...'}
						</span>
					</div>
					<div className={styles.indicators}>
						{!disabled &&
							clearable &&
							getDisplayValue() && (
								<button
									type='button'
									className={styles.clearIndicator}
									onClick={(e) => {
										e.stopPropagation();
										handleClear();
									}}
									aria-label='Clear selection'
								>
									×
								</button>
							)}
						<span className={styles.dropdownIndicator}>
							<svg
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								aria-hidden='true'
							>
								<path
									d='M6 8l4 4 4-4'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
					</div>
				</div>
				{isOpen && (
					<div className={styles.menu} ref={menuRef}>
						{filter && (
							<div className={styles.filterToggle}>
								<label
									htmlFor='dropdown-filter-dropdown'
									style={{
										fontWeight: 500,
										marginRight: 8,
									}}
								>
									Filter:
								</label>
								<Dropdown
									id='dropdown-filter-dropdown'
									data={[
										{ label: 'None', value: 'none' },
										{ label: 'A to Z', value: 'az' },
										{ label: 'Z to A', value: 'za' },
										{
											label: 'Largest to Smallest',
											value: 'largest',
										},
										{
											label: 'Smallest to Largest',
											value: 'smallest',
										},
									]}
									value={filterValue}
									onChange={setFilterValue}
									className={styles.filterDropdown}
								/>
							</div>
						)}
						{variant === 'multiselect' &&
							Array.isArray(currentValue) &&
							currentValue.length > 0 && (
								<div
									className={styles.selectedChips}
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: 4,
										padding: '8px 12px 0 12px',
									}}
								>
									{currentValue.map((val: string) => {
										const opt = options.find(
											(o: { value: string }) =>
												o.value === val
										);
										if (!opt) return null;
										return (
											<span
												key={val}
												className={styles.chip}
												style={{
													background: '#f3f4f6',
													borderRadius: 12,
													padding: '2px 8px',
													marginRight: 4,
													display: 'flex',
													alignItems: 'center',
												}}
											>
												{opt.label}
												<button
													type='button'
													style={{
														marginLeft: 4,
														background: 'none',
														border: 'none',
														cursor: 'pointer',
														color: '#888',
													}}
													onClick={(e) => {
														e.stopPropagation();
														handleSelect(opt);
													}}
													aria-label={`Remove ${opt.label}`}
												>
													&times;
												</button>
											</span>
										);
									})}
								</div>
							)}
						{/* Search input always at the top, below chips if present */}
						{searchable && (
							<div style={{ padding: '8px 12px' }}>
								<Input
									kind='search'
									ref={inputRef}
									className={styles.searchInput}
									placeholder={
										searchPlaceholder || 'Search...'
									}
									value={searchValue}
									onChange={handleSearchChange}
									onKeyDown={handleKeyDown}
									style={{ width: '100%' }}
								/>
							</div>
						)}
						{loading ?
							<Loading
								message={loadingMessage || 'Loading...'}
							/>
						: searchable && searchValue ?
							<>
								{/* Selected options at top, visually separated */}
								{filteredOptions.selected.length > 0 && (
									<div
										style={{
											borderBottom: '1px solid #eee',
											margin: '4px 0',
										}}
									>
										{filteredOptions.selected.map(
											(option: {
												label: string;
												value: string;
											}) => {
												const isSelected =
													variant === 'multiselect' ?
														Array.isArray(currentValue) &&
														currentValue.includes(
															option.value
														)
													:	currentValue === option.value;
												return (
													<div
														key={option.value}
														className={classNames(
															styles.option,
															styles.selected
														)}
														role='option'
														aria-selected={isSelected}
														onClick={() =>
															handleSelect(option)
														}
													>
														{option.label}
													</div>
												);
											}
										)}
									</div>
								)}
								{/* Rest of filtered options */}
								{filteredOptions.rest.length === 0 ?
									<div className={styles.noOptionsMessage}>
										No options
									</div>
								: hasData ?
									filteredOptions.rest.map(
										(option, idx) => {
											const isSelected =
												variant === 'multiselect' ?
													Array.isArray(currentValue) &&
													currentValue.includes(
														option.value
													)
												:	currentValue === option.value;
											return (
												<div
													key={option.value}
													className={classNames(
														styles.option,
														option.className,
														{
															[styles.selected]: isSelected,
														}
													)}
													role='option'
													aria-selected={isSelected}
													onClick={() =>
														handleSelect(option)
													}
												>
													{option.label}
												</div>
											);
										}
									)
									// Render children if no data prop
								:	children}
							</>
						:	filteredOptions.rest.map(
								(
									option: { label: string; value: string },
									idx: number
								) => {
									const isSelected =
										variant === 'multiselect' ?
											Array.isArray(currentValue) &&
											currentValue.includes(option.value)
										:	currentValue === option.value;
									return (
										<div
											key={option.value}
											className={classNames(styles.option, {
												[styles.selected]: isSelected,
											})}
											role='option'
											aria-selected={isSelected}
											onClick={() => handleSelect(option)}
										>
											{option.label}
										</div>
									);
								}
							)
						}
					</div>
				)}
				{error && (
					<div className={styles.errorText}>{error}</div>
				)}
				{helpText && (
					<div className={styles.helpText}>{helpText}</div>
				)}
			</Wrapper>
		);
	}
);

Dropdown.displayName = 'Dropdown';

export const FilterToggle = (props: {
	checked: boolean;
	onChange: (checked: boolean) => void;
}) => (
	<div
		style={{
			padding: '8px 16px',
			borderBottom: '1px solid #eee',
			background: '#f9fafb',
		}}
	>
		<label
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 8,
			}}
		>
			<Checkbox
				checked={props.checked}
				onChange={(e) => props.onChange(e.target.checked)}
				style={{ marginRight: 8 }}
			/>
			<span>Enable Filter</span>
		</label>
	</div>
);
