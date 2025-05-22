"use client"

import { useRef, useEffect } from 'react'

/**
 * A custom hook to create a safe IntersectionObserver that properly handles
 * component unmounting to prevent "Failed to execute 'unobserve'" errors.
 *
 * @param callback The function to call when intersection changes
 * @param options IntersectionObserver options
 * @returns An object with observe and unobserve methods, and the observer instance
 */
export function useSafeIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    // Store the observer in a ref
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Store observed elements in a Set to track them
    const observedElementsRef = useRef<Set<Element>>(new Set())

    // Create the observer
    useEffect(() => {
        const observer = new IntersectionObserver(callback, options)
        observerRef.current = observer

        // When component unmounts, safely disconnect the observer
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
                observedElementsRef.current.clear()
            }
        }
    }, [callback, options])

    // Methods to safely observe and unobserve elements
    const safeObserver = {
        observe: (element: Element | null | undefined) => {
            if (!element || !observerRef.current) return

            observerRef.current.observe(element)
            observedElementsRef.current.add(element)
        },

        unobserve: (element: Element | null | undefined) => {
            if (!element || !observerRef.current) return

            // Only attempt to unobserve if we previously observed this element
            if (observedElementsRef.current.has(element)) {
                observerRef.current.unobserve(element)
                observedElementsRef.current.delete(element)
            }
        },

        disconnect: () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observedElementsRef.current.clear()
            }
        },

        // Expose the observer for advanced use cases
        get observer() {
            return observerRef.current
        }
    }

    return safeObserver
}

/**
 * A wrapper for react-intersection-observer's useInView hook that
 * prevents "Failed to execute 'unobserve'" errors.
 *
 * This can be used as a direct replacement for the useInView hook
 * from react-intersection-observer.
 */
export function useSafeInView(options?: {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
    triggerOnce?: boolean;
    skip?: boolean;
    initialInView?: boolean;
    onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
}) {
    // Create refs for the element and inView state
    const elementRef = useRef<Element | null>(null)
    const inViewRef = useRef<boolean>(options?.initialInView || false)
    const entryRef = useRef<IntersectionObserverEntry | null>(null)

    // Create the observer
    const observer = useSafeIntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (!entry) return

            const isInView = entry.isIntersecting

            // Update our refs
            inViewRef.current = isInView
            entryRef.current = entry

            // Call onChange if provided
            if (options?.onChange) {
                options.onChange(isInView, entry)
            }

            // If triggerOnce is true and element is in view, unobserve it
            if (options?.triggerOnce && isInView && elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        },
        {
            threshold: options?.threshold,
            rootMargin: options?.rootMargin,
            root: options?.root,
        }
    )

    // The ref callback that gets attached to the observed element
    const ref = (element: Element | null) => {
        // Skip if element is the same or if skip option is true
        if (elementRef.current === element || options?.skip) {
            return
        }

        // Unobserve previous element if exists
        if (elementRef.current) {
            observer.unobserve(elementRef.current)
        }

        // Update ref and observe new element if exists
        elementRef.current = element
        if (element) {
            observer.observe(element)
        }
    }

    return {
        ref,
        inView: inViewRef.current,
        entry: entryRef.current,
    }
}

export default useSafeInView