/**
 * UnifiedMonetization - DRY monetization component system
 *
 * This component provides a unified interface for all monetization-related UI components
 * including pricing cards, payment forms, usage meters, billing summaries, and more.
 * It follows the same DRY pattern as other components in the system.
 */

import React, { forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { Button } from '../Button';
import styles from './Monetization.module.scss';
import {
	MonetizationKind,
	MonetizationConfiguration,
	PricingPlan,
	UsageData,
	PaymentData,
	PaymentMethod,
	formatPrice,
	calculateDiscount,
	MONETIZATION_CONFIGURATIONS,
} from './configurations';

// =============================================================================
// BASE INTERFACES
// =============================================================================

export interface BaseMonetizationProps {
	'kind': MonetizationKind;
	'className'?: string;
	'id'?: string;
	'testId'?: string;
	'data-testid'?: string;
}

export interface UnifiedMonetizationProps
	extends BaseMonetizationProps {
	// Configuration override
	config?: Partial<MonetizationConfiguration>;

	// Common props
	title?: string;
	subtitle?: string;
	description?: string;
	loading?: boolean;
	disabled?: boolean;

	// Pricing-related props
	plan?: PricingPlan;
	plans?: PricingPlan[];
	selectedPlan?: string;
	onPlanSelect?: (planId: string) => void;
	onSelect?: (plan: PricingPlan) => void;

	// Usage-related props
	usage?: UsageData;
	credits?: number;
	maxCredits?: number;
	warningThreshold?: number;
	criticalThreshold?: number;

	// Payment-related props
	paymentData?: PaymentData;
	acceptedMethods?: PaymentMethod[];
	onSubmit?: (data: any) => void;
	onPurchase?: () => void;
	onUpgrade?: () => void;
	onCancel?: () => void;
	onDismiss?: () => void;
	onApply?: (code?: string) => void;
	onEarn?: () => void;

	// Billing props
	items?: Array<{
		description: string;
		amount: number;
		quantity?: number;
	}>;
	total?: number;
	currency?: string;
	tax?: number;
	discount?: {
		type: 'percentage' | 'fixed';
		value: number;
		code?: string;
		expiresAt?: Date;
	};

	// Feature comparison props
	features?: string[];

	// Product props
	product?: {
		name: string;
		price: number;
		currency: string;
	};

	// Content props
	buttonText?: string;
	disclaimer?: string;
	benefits?: string[];
	currentPlan?: string;
	recommendedPlan?: PricingPlan;
}

// =============================================================================
// UNIFIED MONETIZATION COMPONENT
// =============================================================================

const UnifiedMonetization = forwardRef<
	HTMLDivElement,
	UnifiedMonetizationProps
>(
	(
		{
			kind,
			config,
			className,
			id,
			testId,
			'data-testid': dataTestId,
			loading = false,
			disabled = false,
			...props
		},
		ref
	) => {
		// Merge configuration
		const finalConfig = useMemo(
			() => ({
				...MONETIZATION_CONFIGURATIONS[kind],
				...config,
				kind,
			}),
			[kind, config]
		);

		// Generate CSS classes
		const classes = useMemo(() => {
			const baseClasses = [
				styles.monetizationWrapper,
				styles[kind.replace('-', '')], // Convert kebab-case to camelCase
			];

			// Theme
			if (finalConfig.styling?.theme) {
				baseClasses.push(styles[finalConfig.styling.theme]);
			}

			// Size
			if (finalConfig.size) {
				baseClasses.push(styles[finalConfig.size]);
			}

			// Color
			if (finalConfig.styling?.color) {
				baseClasses.push(styles[finalConfig.styling.color]);
			}

			// Border radius
			if (finalConfig.styling?.borderRadius) {
				baseClasses.push(
					styles[
						`borderRadius${finalConfig.styling.borderRadius.charAt(0).toUpperCase() + finalConfig.styling.borderRadius.slice(1)}`
					]
				);
			}

			// Shadow
			if (finalConfig.styling?.shadow) {
				baseClasses.push(
					styles[
						`shadow${finalConfig.styling.shadow.charAt(0).toUpperCase() + finalConfig.styling.shadow.slice(1)}`
					]
				);
			}

			// Behavior states
			if (finalConfig.behavior?.interactive) {
				baseClasses.push(styles.interactive);
			}

			if (finalConfig.behavior?.clickable) {
				baseClasses.push(styles.clickable);
			}

			if (finalConfig.behavior?.hoverable) {
				baseClasses.push(styles.hoverable);
			}

			if (finalConfig.styling?.highlight) {
				baseClasses.push(styles.highlight);
			}

			// Animation
			if (
				finalConfig.styling?.animation &&
				finalConfig.styling.animation !== 'none'
			) {
				baseClasses.push(
					styles[finalConfig.styling.animation]
				);
			}

			// State classes
			if (loading) {
				baseClasses.push(styles.loading);
			}

			if (disabled) {
				baseClasses.push(styles.disabled);
			}

			return clsx(baseClasses, className);
		}, [finalConfig, kind, loading, disabled, className]);

		// Render content based on kind
		const renderContent = () => {
			switch (kind) {
				case 'pricing-card':
					return renderPricingCard();
				case 'subscription-plan':
					return renderSubscriptionPlan();
				case 'feature-comparison':
					return renderFeatureComparison();
				case 'payment-form':
					return renderPaymentForm();
				case 'billing-summary':
					return renderBillingSummary();
				case 'upgrade-prompt':
					return renderUpgradePrompt();
				case 'usage-meter':
					return renderUsageMeter();
				case 'credit-display':
					return renderCreditDisplay();
				case 'purchase-button':
					return renderPurchaseButton();
				case 'discount-banner':
					return renderDiscountBanner();
				default:
					return (
						<div>Unknown monetization type: {kind}</div>
					);
			}
		};

		const renderPricingCard = () => {
			const { plan, onSelect } = props;
			if (!plan) return <div>No plan provided</div>;

			const discountInfo =
				plan.originalPrice ?
					calculateDiscount(plan.originalPrice, plan.price)
				:	null;

			return (
				<div className={styles.pricingCard}>
					{plan.badge && (
						<div className={styles.pricingBadge}>
							{plan.badge}
						</div>
					)}

					<div className={styles.pricingHeader}>
						<h3 className={styles.pricingTitle}>
							{plan.name}
						</h3>
						{plan.description && (
							<p className={styles.pricingSubtitle}>
								{plan.description}
							</p>
						)}
					</div>

					<div className={styles.pricingPrice}>
						<span className={styles.pricingCurrency}>
							{plan.currency}
						</span>
						<span className={styles.pricingAmount}>
							{plan.price}
						</span>
						<span className={styles.pricingPeriod}>
							/{plan.period}
						</span>
						{plan.originalPrice && (
							<span className={styles.pricingOriginalPrice}>
								{formatPrice(
									plan.originalPrice,
									plan.currency
								)}
							</span>
						)}
					</div>

					{discountInfo && (
						<div
							style={{
								color: 'var(--color-success-500)',
								fontWeight: 600,
								marginBottom: '1rem',
							}}
						>
							Save {discountInfo.percentage}%
						</div>
					)}

					<div className={styles.pricingFeatures}>
						<ul className={styles.pricingFeaturesList}>
							{plan.features.map((feature, index) => (
								<li
									key={index}
									className={styles.pricingFeature}
								>
									<span
										className={styles.pricingFeatureIcon}
									>
										✓
									</span>
									{feature}
								</li>
							))}
						</ul>
					</div>

					<Button
						kind={plan.popular ? 'primary' : 'secondary'}
						className={styles.pricingButton}
						onClick={() => onSelect?.(plan)}
						disabled={
							disabled || loading || plan.comingSoon
						}
					>
						{plan.comingSoon ?
							'Coming Soon'
						:	plan.buttonText || 'Choose Plan'}
					</Button>
				</div>
			);
		};

		const renderUsageMeter = () => {
			const {
				usage,
				warningThreshold = 80,
				criticalThreshold = 95,
				onUpgrade,
			} = props;
			if (!usage) return <div>No usage data provided</div>;

			const percentage =
				(usage.current / usage.limit) * 100;
			const isWarning = percentage >= warningThreshold;
			const isCritical = percentage >= criticalThreshold;

			return (
				<div className={styles.usageMeter}>
					<div className={styles.usageHeader}>
						<span className={styles.usageTitle}>
							{usage.unit} Usage
						</span>
						<span className={styles.usageValue}>
							{usage.current.toLocaleString()} /{' '}
							{usage.limit.toLocaleString()}
						</span>
					</div>

					<div className={styles.usageBar}>
						<div
							className={clsx(
								styles.usageProgress,
								isCritical && styles.critical,
								isWarning && !isCritical && styles.warning
							)}
							style={{
								width: `${Math.min(percentage, 100)}%`,
							}}
						/>
					</div>

					<div className={styles.usageInfo}>
						<span>{percentage.toFixed(1)}% used</span>
						{usage.resetDate && (
							<span>
								Resets{' '}
								{usage.resetDate.toLocaleDateString()}
							</span>
						)}
					</div>

					{percentage >= warningThreshold && onUpgrade && (
						<Button
							kind='primary'
							className={styles.pricingButton}
							onClick={onUpgrade}
							style={{ marginTop: '1rem' }}
						>
							Upgrade Plan
						</Button>
					)}
				</div>
			);
		};

		const renderPaymentForm = () => {
			const {
				paymentData,
				acceptedMethods = ['card'],
				onSubmit,
				onCancel,
			} = props;
			if (!paymentData)
				return <div>No payment data provided</div>;

			return (
				<div className={styles.paymentForm}>
					<div className={styles.paymentSection}>
						<h3 className={styles.paymentSectionTitle}>
							Payment Method
						</h3>
						<div className={styles.paymentMethods}>
							{acceptedMethods.map((method) => (
								<div
									key={method}
									className={styles.paymentMethod}
								>
									{method.replace('-', ' ').toUpperCase()}
								</div>
							))}
						</div>
					</div>

					<div className={styles.paymentSection}>
						<h3 className={styles.paymentSectionTitle}>
							Payment Summary
						</h3>
						<div>
							<strong>
								{formatPrice(
									paymentData.amount,
									paymentData.currency
								)}
							</strong>
							{paymentData.recurring &&
								paymentData.period && (
									<span> / {paymentData.period}</span>
								)}
						</div>
						{paymentData.description && (
							<p>{paymentData.description}</p>
						)}
					</div>

					<div className={styles.paymentActions}>
						<Button
							kind='primary'
							className={clsx(
								styles.paymentButton,
								styles.paymentButtonPrimary
							)}
							onClick={() => onSubmit?.(paymentData)}
							disabled={disabled || loading}
						>
							{loading ?
								'Processing...'
							:	'Complete Payment'}
						</Button>
						{onCancel && (
							<Button
								kind='secondary'
								className={clsx(
									styles.paymentButton,
									styles.paymentButtonSecondary
								)}
								onClick={onCancel}
								disabled={loading}
							>
								Cancel
							</Button>
						)}
					</div>
				</div>
			);
		};

		const renderBillingSummary = () => {
			const {
				items = [],
				total = 0,
				currency = 'USD',
				tax,
				discount,
			} = props;

			return (
				<div className={styles.billingSummary}>
					<h3>Billing Summary</h3>
					<div>
						{items.map((item, index) => (
							<div
								key={index}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: '0.5rem',
								}}
							>
								<span>
									{item.description}{' '}
									{item.quantity && `(${item.quantity})`}
								</span>
								<span>
									{formatPrice(
										item.amount * (item.quantity || 1),
										currency
									)}
								</span>
							</div>
						))}

						{tax && (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: '0.5rem',
								}}
							>
								<span>Tax</span>
								<span>{formatPrice(tax, currency)}</span>
							</div>
						)}

						{discount && (
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: '0.5rem',
									color: 'var(--color-success-500)',
								}}
							>
								<span>
									Discount{' '}
									{discount.code && `(${discount.code})`}
								</span>
								<span>
									-{formatPrice(discount.value, currency)}
								</span>
							</div>
						)}

						<hr style={{ margin: '1rem 0' }} />

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								fontWeight: 'bold',
								fontSize: '1.125rem',
							}}
						>
							<span>Total</span>
							<span>{formatPrice(total, currency)}</span>
						</div>
					</div>
				</div>
			);
		};

		const renderFeatureComparison = () => {
			const { plans = [], features = [] } = props;

			return (
				<div className={styles.featureComparison}>
					<table className={styles.comparisonTable}>
						<thead className={styles.comparisonHeader}>
							<tr>
								<th
									className={clsx(
										styles.comparisonHeaderCell,
										styles.comparisonFeature
									)}
								>
									Features
								</th>
								{plans.map((plan) => (
									<th
										key={plan.id}
										className={styles.comparisonHeaderCell}
									>
										{plan.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{features.map((feature, index) => (
								<tr
									key={index}
									className={styles.comparisonRow}
								>
									<td
										className={clsx(
											styles.comparisonCell,
											styles.comparisonFeature
										)}
									>
										{feature}
									</td>
									{plans.map((plan) => (
										<td
											key={plan.id}
											className={styles.comparisonCell}
										>
											{plan.features.includes(feature) ?
												<span
													className={
														styles.comparisonCheckmark
													}
												>
													✓
												</span>
											:	<span
													className={styles.comparisonCross}
												>
													✗
												</span>
											}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		};

		const renderSubscriptionPlan = () => {
			const {
				plans = [],
				selectedPlan,
				onPlanSelect,
			} = props;

			return (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(300px, 1fr))',
						gap: '1.5rem',
					}}
				>
					{plans.map((plan) => (
						<UnifiedMonetization
							key={plan.id}
							kind='pricing-card'
							plan={plan}
							onSelect={() => onPlanSelect?.(plan.id)}
							className={
								selectedPlan === plan.id ?
									styles.highlight
								:	undefined
							}
						/>
					))}
				</div>
			);
		};

		const renderUpgradePrompt = () => {
			const {
				currentPlan,
				recommendedPlan,
				benefits = [],
				onUpgrade,
				onDismiss,
			} = props;

			return (
				<div style={{ textAlign: 'center' }}>
					<h3>Upgrade Your Plan</h3>
					<p>
						You're currently on the{' '}
						<strong>{currentPlan}</strong> plan.
					</p>

					{recommendedPlan && (
						<>
							<p>
								Upgrade to{' '}
								<strong>{recommendedPlan.name}</strong> for:
							</p>
							<ul
								style={{
									textAlign: 'left',
									maxWidth: '300px',
									margin: '1rem auto',
								}}
							>
								{benefits.map((benefit, index) => (
									<li key={index}>{benefit}</li>
								))}
							</ul>

							<div
								style={{
									display: 'flex',
									gap: '1rem',
									justifyContent: 'center',
									marginTop: '1.5rem',
								}}
							>
								<Button
									kind='primary'
									className={styles.pricingButton}
									onClick={onUpgrade}
									disabled={disabled || loading}
								>
									Upgrade to {recommendedPlan.name}
								</Button>
								{onDismiss && (
									<Button
										kind='secondary'
										className={clsx(
											styles.paymentButton,
											styles.paymentButtonSecondary
										)}
										onClick={onDismiss}
									>
										Maybe Later
									</Button>
								)}
							</div>
						</>
					)}
				</div>
			);
		};

		const renderCreditDisplay = () => {
			const {
				credits = 0,
				maxCredits,
				onPurchase,
				onEarn,
			} = props;

			return (
				<div style={{ textAlign: 'center' }}>
					<div
						style={{
							fontSize: '2rem',
							fontWeight: 'bold',
							color: 'var(--accent-color)',
							marginBottom: '0.5rem',
						}}
					>
						{credits.toLocaleString()}
					</div>
					<div style={{ marginBottom: '1rem' }}>
						{maxCredits ?
							`of ${maxCredits.toLocaleString()} `
						:	''}
						Credits
					</div>

					<div
						style={{
							display: 'flex',
							gap: '0.5rem',
							justifyContent: 'center',
						}}
					>
						{onPurchase && (
							<Button
								kind='primary'
								className={styles.pricingButton}
								onClick={onPurchase}
								disabled={disabled || loading}
							>
								Buy Credits
							</Button>
						)}
						{onEarn && (
							<Button
								kind='secondary'
								className={clsx(
									styles.paymentButton,
									styles.paymentButtonSecondary
								)}
								onClick={onEarn}
							>
								Earn More
							</Button>
						)}
					</div>
				</div>
			);
		};

		const renderPurchaseButton = () => {
			const { product, onPurchase } = props;
			if (!product) return <div>No product provided</div>;

			return (
				<Button
					kind='primary'
					className={styles.pricingButton}
					onClick={onPurchase}
					disabled={disabled || loading}
					style={{ width: '100%' }}
				>
					{loading ?
						'Processing...'
					:	`Buy ${product.name} - ${formatPrice(product.price, product.currency)}`
					}
				</Button>
			);
		};

		const renderDiscountBanner = () => {
			const { discount, onApply, onDismiss } = props;
			if (!discount) return <div>No discount provided</div>;

			const discountText =
				discount.type === 'percentage' ?
					`${discount.value}% OFF`
				:	`${formatPrice(discount.value)} OFF`;

			return (
				<div
					style={{
						textAlign: 'center',
						position: 'relative',
					}}
				>
					{onDismiss && (
						<Button
							kind='ghost'
							onClick={onDismiss}
							style={{
								position: 'absolute',
								top: '0.5rem',
								right: '0.5rem',
								background: 'transparent',
								border: 'none',
								fontSize: '1.5rem',
								cursor: 'pointer',
								color: 'inherit',
							}}
						>
							×
						</Button>
					)}

					<div
						style={{
							fontSize: '1.5rem',
							fontWeight: 'bold',
							marginBottom: '0.5rem',
						}}
					>
						{discountText}
					</div>

					{discount.code && (
						<div style={{ marginBottom: '1rem' }}>
							Code: <strong>{discount.code}</strong>
						</div>
					)}

					{discount.expiresAt && (
						<div
							style={{
								fontSize: '0.875rem',
								marginBottom: '1rem',
							}}
						>
							Expires{' '}
							{discount.expiresAt.toLocaleDateString()}
						</div>
					)}

					{onApply && (
						<Button
							kind='primary'
							className={styles.pricingButton}
							onClick={() => onApply(discount.code)}
							disabled={disabled || loading}
						>
							Apply Discount
						</Button>
					)}
				</div>
			);
		};

		return (
			<div
				ref={ref}
				id={id}
				data-testid={dataTestId || testId}
				className={classes}
			>
				{renderContent()}
			</div>
		);
	}
);

UnifiedMonetization.displayName = 'UnifiedMonetization';

export default UnifiedMonetization;
export type { MonetizationKind };
