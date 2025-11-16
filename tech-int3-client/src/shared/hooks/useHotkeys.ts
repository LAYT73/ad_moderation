import { useHotkeys as useHotkeysHook } from 'react-hotkeys-hook';

interface UseItemPageHotkeysProps {
  onApprove: () => void;
  onReject: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  disabled?: boolean;
}

/**
 * Хук для горячих клавиш на странице детального просмотра объявления
 */
export function useItemPageHotkeys({ onApprove, onReject, onNext, onPrev, disabled = false }: UseItemPageHotkeysProps) {
  // A - одобрить
  useHotkeysHook(
    'a',
    (e) => {
      e.preventDefault();
      if (!disabled) onApprove();
    },
    { enabled: !disabled },
    [onApprove, disabled],
  );

  // D - отклонить
  useHotkeysHook(
    'd',
    (e) => {
      e.preventDefault();
      if (!disabled) onReject();
    },
    { enabled: !disabled },
    [onReject, disabled],
  );

  // → - следующее объявление
  useHotkeysHook(
    'right',
    (e) => {
      e.preventDefault();
      if (!disabled && onNext) onNext();
    },
    { enabled: !disabled && !!onNext },
    [onNext, disabled],
  );

  // ← - предыдущее объявление
  useHotkeysHook(
    'left',
    (e) => {
      e.preventDefault();
      if (!disabled && onPrev) onPrev();
    },
    { enabled: !disabled && !!onPrev },
    [onPrev, disabled],
  );
}

/**
 * Хук для горячих клавиш на странице списка объявлений
 */
export function useListPageHotkeys() {
  // / - фокус на поиск
  useHotkeysHook(
    ['/', 'slash', 'shift+7'],
    (e) => {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
    [],
  );
}
