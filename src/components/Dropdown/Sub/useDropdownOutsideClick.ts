import { useEffect } from 'react';

export function useDropdownOutsideClick(
	ref: React.RefObject<HTMLElement>,
	onClose: () => void,
	enabled: boolean
) {
	useEffect(() => {
		if (!enabled) return;
		function handleClick(e: MouseEvent) {
			if (
				ref.current &&
				!ref.current.contains(e.target as Node)
			) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () =>
			document.removeEventListener(
				'mousedown',
				handleClick
			);
	}, [ref, onClose, enabled]);
}
