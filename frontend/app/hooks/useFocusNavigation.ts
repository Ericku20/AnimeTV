/**
 * Hook para navegación tipo Smart TV con flechas y Enter
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

export interface FocusableItem {
  id: string;
  element: HTMLElement;
  row: number;
  col: number;
}

interface UseFocusNavigationProps {
  items?: FocusableItem[];
  gridCols?: number;
  onSelect?: (id: string) => void;
  enabled?: boolean;
}

export function useFocusNavigation({
  items = [],
  gridCols = 4,
  onSelect,
  enabled = true,
}: UseFocusNavigationProps) {
  const focusedIndexRef = useRef(0);
  const focusedItemRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((): FocusableItem[] => {
    if (items.length > 0) return items;

    const elements = document.querySelectorAll('[data-focusable="true"]');
    return Array.from(elements).map((el, idx) => ({
      id: el.id || `focusable-${idx}`,
      element: el as HTMLElement,
      row: Math.floor(idx / gridCols),
      col: idx % gridCols,
    }));
  }, [items, gridCols]);

  const applyFocus = useCallback((item: FocusableItem) => {
    if (focusedItemRef.current) {
      focusedItemRef.current.classList.remove('focus-ring');
      focusedItemRef.current.style.transform = '';
    }

    item.element.classList.add('focus-ring');
    item.element.style.transform = 'scale(1.05)';
    item.element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    focusedItemRef.current = item.element;
  }, []);

  const moveFocus = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const currentItem = focusable[focusedIndexRef.current];
      let nextIndex = focusedIndexRef.current;

      switch (direction) {
        case 'down': {
          const itemsBelow = focusable.filter(
            (item) => item.row > currentItem.row
          );
          if (itemsBelow.length > 0) {
            const closestCol = itemsBelow.reduce((prev, curr) =>
              Math.abs(curr.col - currentItem.col) <
              Math.abs(prev.col - currentItem.col)
                ? curr
                : prev
            );
            nextIndex = focusable.indexOf(closestCol);
          }
          break;
        }
        case 'up': {
          const itemsAbove = focusable.filter(
            (item) => item.row < currentItem.row
          );
          if (itemsAbove.length > 0) {
            const closestCol = itemsAbove.reduce((prev, curr) =>
              Math.abs(curr.col - currentItem.col) <
              Math.abs(prev.col - currentItem.col)
                ? curr
                : prev
            );
            nextIndex = focusable.indexOf(closestCol);
          }
          break;
        }
        case 'right': {
          const itemsRight = focusable.filter(
            (item) =>
              item.row === currentItem.row && item.col > currentItem.col
          );
          if (itemsRight.length > 0) {
            nextIndex = focusable.indexOf(itemsRight[0]);
          } else if (focusable[focusedIndexRef.current + 1]) {
            nextIndex = focusedIndexRef.current + 1;
          }
          break;
        }
        case 'left': {
          const itemsLeft = focusable.filter(
            (item) =>
              item.row === currentItem.row && item.col < currentItem.col
          );
          if (itemsLeft.length > 0) {
            nextIndex = focusable.indexOf(itemsLeft[itemsLeft.length - 1]);
          } else if (focusedIndexRef.current > 0) {
            nextIndex = focusedIndexRef.current - 1;
          }
          break;
        }
      }

      focusedIndexRef.current = nextIndex;
      applyFocus(focusable[nextIndex]);
    },
    [getFocusableElements, applyFocus]
  );

  const selectCurrent = useCallback(() => {
    const focusable = getFocusableElements();
    const currentItem = focusable[focusedIndexRef.current];

    if (currentItem) {
      if (onSelect) {
        onSelect(currentItem.id);
      } else {
        // Simular click
        currentItem.element.click();
      }
    }
  }, [getFocusableElements, onSelect]);

  useEffect(() => {
    if (!enabled) return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    // Inicializar enfoque en el primer elemento
    focusedIndexRef.current = 0;
    applyFocus(focusable[0]);

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          moveFocus('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocus('up');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus('right');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus('left');
          break;
        case 'Enter':
          e.preventDefault();
          selectCurrent();
          break;
        case 'Escape':
        case 'Backspace':
          // Permitir que se propague para back navigation
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, getFocusableElements, applyFocus, moveFocus, selectCurrent]);

  return {
    focusedIndex: focusedIndexRef.current,
    focusedItem: focusedItemRef.current,
    moveFocus,
    selectCurrent,
  };
}
