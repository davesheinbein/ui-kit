import type { Meta, StoryObj } from '@storybook/react';
import {
	BannerFactory,
	Banner,
	Ban,
	BannerPresets,
} from '../../components/Banner';
import { Wrapper } from '../../components/Wrappers';

// Simple action logger for Storybook 9
const action = (label: string) => () =>
	console.log(`${label} clicked`);

const meta: Meta<typeof BannerFactory> = {
	title: 'Components/Banner',
	component: BannerFactory,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `# Banner System

A comprehensive banner system with multiple variants and a DRY factory pattern.

## Features
- **Base Component**: Banner - foundational styling and behavior
- **Factory Pattern**: BannerFactory - create any banner type with configuration
- **Ultra-DRY**: Ban - shorthand static methods for quick creation
- **Presets**: BannerPresets - common banner patterns

## Banner Types
- **Feedback**: Game completion, user feedback
- **Notifications**: System alerts, achievements, burns, taunts
- **Toasts**: Success, error, warning, info messages
- **Status Bar**: VS game status with player/opponent data
- **Global**: App-wide notifications

## Usage Examples
\`\`\`tsx
// Factory pattern
<BannerFactory kind="success-toast" message="Saved!" />

// Ultra-short syntax
{Ban.toast("Saved!", "success")}

// Presets
{BannerPresets.achievement("Level up!")}

// Base component
<Banner variant="toast" type="success">Success!</Banner>
\`\`\``,
			},
		},
		layout: 'padded',
	},
	argTypes: {
		'kind': {
			control: 'select',
			options: [
				'feedback',
				'notification',
				'toast',
				'status',
				'global',
				'burn-notification',
				'achievement-notification',
				'system-notification',
				'taunt-notification',
				'success-toast',
				'error-toast',
				'warning-toast',
				'info-toast',
				'vs-status',
			],
			description: 'Banner kind/configuration to use',
		},
		'message': {
			control: 'text',
			description: 'Message to display in the banner',
		},
		'type': {
			control: 'select',
			options: [
				'burn',
				'achievement',
				'system',
				'taunt',
				'success',
				'error',
				'info',
				'warning',
			],
			description:
				'Banner type (affects colors and styling)',
		},
		'icon': {
			control: 'text',
			description: 'Custom icon (emoji or text)',
		},
		'duration': {
			control: {
				type: 'range',
				min: 1000,
				max: 10000,
				step: 500,
			},
			description: 'Auto hide duration (ms)',
		},
		'onClose': {
			action: 'close clicked',
			description: 'Callback when banner is closed',
		},
		// Player props for status banners
		'player.username': {
			control: 'text',
			description: 'Player username',
		},
		'player.groupsSolved': {
			control: { type: 'number', min: 0, max: 10 },
			description: 'Number of groups solved by player',
		},
		'player.mistakes': {
			control: { type: 'number', min: 0, max: 10 },
			description: 'Number of mistakes made by player',
		},
		'opponent.username': {
			control: 'text',
			description: 'Opponent username',
		},
		'opponent.groupsSolved': {
			control: { type: 'number', min: 0, max: 10 },
			description: 'Number of groups solved by opponent',
		},
		'opponent.mistakes': {
			control: { type: 'number', min: 0, max: 10 },
			description: 'Number of mistakes made by opponent',
		},
		'timer': {
			control: 'text',
			description: 'Timer display (e.g., "02:45")',
		},
	},
};

export default meta;
type Story = StoryObj<typeof BannerFactory>;

// ============================================================================
// BASIC BANNER TYPES
// ============================================================================

export const Playground: Story = {
	name: '🎮 Playground',
	args: {
		kind: 'success-toast',
		message: 'This is a customizable banner!',
		onClose: action('close clicked'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use the controls below to experiment with different banner configurations.',
			},
		},
	},
};

export const FeedbackBanner: Story = {
	name: '📝 Feedback Banner',
	args: {
		kind: 'feedback',
		message:
			'Congratulations! You completed the game with a perfect score! 🎉',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Feedback banners are used for game completion messages and user feedback. They are centered and non-dismissible by default.',
			},
		},
	},
};

export const NotificationBanner: Story = {
	name: '🔔 Notification Banner',
	args: {
		kind: 'notification',
		message: 'System maintenance will begin in 15 minutes.',
		onClose: action('notification closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Basic notification banners for system alerts and general notifications.',
			},
		},
	},
};

export const ToastBanner: Story = {
	name: '🍞 Toast Banner',
	args: {
		kind: 'toast',
		message: 'Achievement unlocked: First Victory!',
		onClose: action('toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Toast banners appear temporarily with auto-close functionality.',
			},
		},
	},
};

export const GlobalToast: Story = {
	name: '🌍 Global Toast',
	args: {
		kind: 'global',
		message: 'Welcome to the new game mode!',
		onClose: action('global toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Global toasts appear at the top of the viewport with maximum z-index.',
			},
		},
	},
};

// ============================================================================
// NOTIFICATION TYPES (Game-specific)
// ============================================================================

export const BurnNotification: Story = {
	name: '🔥 Burn Notification',
	args: {
		kind: 'burn-notification',
		message: 'Player got burned! -50 points',
		onClose: action('burn notification closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Burn notifications use warning/error gradient colors to indicate negative events.',
			},
		},
	},
};

export const AchievementNotification: Story = {
	name: '🏆 Achievement Notification',
	args: {
		kind: 'achievement-notification',
		message: 'Achievement Unlocked: Perfect Game!',
		onClose: action('achievement closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Achievement notifications use golden gradient colors for celebrations.',
			},
		},
	},
};

export const SystemNotification: Story = {
	name: 'ℹ️ System Notification',
	args: {
		kind: 'system-notification',
		message: 'Game rules have been updated',
		onClose: action('system notification closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'System notifications use blue gradient colors for informational messages.',
			},
		},
	},
};

export const TauntNotification: Story = {
	name: '😈 Taunt Notification',
	args: {
		kind: 'taunt-notification',
		message: 'Player sent a taunt: "Too easy!"',
		onClose: action('taunt closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Taunt notifications use purple gradient colors for playful provocations.',
			},
		},
	},
};

// ============================================================================
// TOAST TYPES (Status messages)
// ============================================================================

export const SuccessToast: Story = {
	name: '✅ Success Toast',
	args: {
		kind: 'success-toast',
		message: 'Data saved successfully!',
		onClose: action('success toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Success toasts use green gradient colors for positive confirmations.',
			},
		},
	},
};

export const ErrorToast: Story = {
	name: '❌ Error Toast',
	args: {
		kind: 'error-toast',
		message: 'Failed to connect to server',
		onClose: action('error toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Error toasts use red gradient colors and stay visible longer (5s).',
			},
		},
	},
};

export const WarningToast: Story = {
	name: '⚠️ Warning Toast',
	args: {
		kind: 'warning-toast',
		message:
			'Connection unstable - some features may be limited',
		onClose: action('warning toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Warning toasts use orange gradient colors for cautionary messages.',
			},
		},
	},
};

export const InfoToast: Story = {
	name: 'ℹ️ Info Toast',
	args: {
		kind: 'info-toast',
		message: 'New update available - restart to apply',
		onClose: action('info toast closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Info toasts use blue gradient colors for informational updates.',
			},
		},
	},
};

// ============================================================================
// VS GAME STATUS BAR
// ============================================================================

export const VSStatusBar: Story = {
	name: '⚔️ VS Status Bar',
	args: {
		kind: 'vs-status',
		player: {
			username: 'Player1',
			avatarUrl:
				'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
			groupsSolved: 2,
			mistakes: 1,
			isYou: true,
		},
		opponent: {
			username: 'Player2',
			avatarUrl:
				'https://images.unsplash.com/photo-1494790108755-2616b332c6ff?w=32&h=32&fit=crop&crop=face',
			groupsSolved: 1,
			mistakes: 0,
		},
		timer: '02:45',
		totalGroups: 4,
		onEmoteClick: action('emote clicked'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'VS Status Bar shows real-time game information including player stats, timer, and opponent data.',
			},
		},
	},
};

// ============================================================================
// USAGE EXAMPLES WITH DIFFERENT PATTERNS
// ============================================================================

export const UsingBanShorthand: Story = {
	name: '⚡ Using Ban Shorthand',
	render: () => {
		return (
			<Wrapper
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				{Ban.toast('Quick success message!', 'success')}
				{Ban.toast('Quick error message!', 'error')}
				{Ban.feedback('Game completed!')}
				{Ban.notification('System alert', 'achievement')}
			</Wrapper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `Examples using the ultra-short Ban syntax:
\`\`\`tsx
{Ban.toast('Quick success message!', 'success')}
{Ban.toast('Quick error message!', 'error')}
{Ban.feedback('Game completed!')}
{Ban.notification('System alert', 'achievement')}
\`\`\``,
			},
		},
	},
};

export const UsingPresets: Story = {
	name: '🎨 Using Presets',
	render: () => {
		return (
			<Wrapper
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				{BannerPresets.gameComplete(
					'Congratulations! Perfect score achieved!'
				)}
				{BannerPresets.achievement(
					'Level Up! You reached level 10'
				)}
				{BannerPresets.burnPlayer(
					'Ouch! You got burned by the opponent'
				)}
				{BannerPresets.success(
					'Settings saved successfully'
				)}
			</Wrapper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Examples using \`BannerPresets\` for common patterns:
\`\`\`tsx
{BannerPresets.gameComplete('Perfect score achieved!')}
{BannerPresets.achievement('Level Up!')}
{BannerPresets.burnPlayer('You got burned!')}
{BannerPresets.success('Settings saved')}
\`\`\`
				`,
			},
		},
	},
};

export const BaseBannerComponent: Story = {
	name: '🏗️ Base Banner Component',
	render: () => {
		return (
			<Wrapper
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				}}
			>
				<Banner variant='feedback' type='achievement'>
					Using the base Banner component directly
				</Banner>
				<Banner
					variant='toast'
					type='success'
					onClose={action('closed')}
				>
					<Wrapper
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<span>✅</span>
						<span>Custom content with JSX</span>
					</Wrapper>
				</Banner>
				<Banner variant='notification' type='warning'>
					<Wrapper>
						<strong>Warning:</strong> This banner has custom
						JSX content
					</Wrapper>
				</Banner>
			</Wrapper>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Examples using the base \`Banner\` component with custom JSX content:
\`\`\`tsx
<Banner variant="feedback" type="achievement">
  Using the base Banner component directly
</Banner>

<Banner variant="toast" type="success" onClose={handleClose}>
  <Wrapper kind="flex-container" alignItems: 'center', gap: '8px' }}>
    <span>✅</span>
    <span>Custom content with JSX</span>
  </Wrapper>
</Banner>
\`\`\`
				`,
			},
		},
	},
};

// ============================================================================
// INTERACTIVE EXAMPLES
// ============================================================================

export const AutoCloseDemo: Story = {
	name: '⏰ Auto-Close Demo',
	args: {
		kind: 'success-toast',
		message: 'This banner will auto-close in 3 seconds!',
		duration: 3000,
		onClose: action('auto-closed'),
	},
	parameters: {
		docs: {
			description: {
				story:
					'This banner demonstrates the auto-close functionality with a 3-second timer.',
			},
		},
	},
};

export const AllBannerTypes: Story = {
	name: '🌈 All Banner Types',
	render: () => {
		return (
			<Wrapper
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
					padding: '20px',
				}}
			>
				<h3
					style={{
						margin: 0,
						color: 'var(--text-primary)',
					}}
				>
					Feedback Banners
				</h3>
				<BannerFactory
					kind='feedback'
					message='Game completed successfully!'
				/>

				<h3
					style={{
						margin: '20px 0 0 0',
						color: 'var(--text-primary)',
					}}
				>
					Notification Types
				</h3>
				<BannerFactory
					kind='burn-notification'
					message='Player got burned!'
				/>
				<BannerFactory
					kind='achievement-notification'
					message='Achievement unlocked!'
				/>
				<BannerFactory
					kind='system-notification'
					message='System update available'
				/>
				<BannerFactory
					kind='taunt-notification'
					message='Player sent a taunt!'
				/>

				<h3
					style={{
						margin: '20px 0 0 0',
						color: 'var(--text-primary)',
					}}
				>
					Toast Messages
				</h3>
				<BannerFactory
					kind='success-toast'
					message='Operation completed successfully'
				/>
				<BannerFactory
					kind='error-toast'
					message='Something went wrong'
				/>
				<BannerFactory
					kind='warning-toast'
					message='Please check your connection'
				/>
				<BannerFactory
					kind='info-toast'
					message='New features available'
				/>
			</Wrapper>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Overview of all available banner types and their default styling.',
			},
		},
	},
};
