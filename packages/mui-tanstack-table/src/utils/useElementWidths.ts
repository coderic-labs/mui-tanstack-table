import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * Observes a map of named elements and returns their current offsetWidths.
 * Updates whenever any element is resized.
 */
export function useElementWidths(elements: Map<string, HTMLElement>): Record<string, number> {
    const [widths, setWidths] = useState<Record<string, number>>({});
    const frameRef = useRef<number>();

    const measure = useCallback(() => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
            const next: Record<string, number> = {};
            elements.forEach((el, id) => {
                next[id] = el.offsetWidth;
            });

            setWidths(prev => isEqual(prev, next) ? prev : next);
        });
    }, [elements]);

    useLayoutEffect(() => {
        measure();

        const observer = new ResizeObserver(() => {
            measure();
        });

        elements.forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [elements, measure]);

    return widths;
}
