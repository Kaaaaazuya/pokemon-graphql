import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (loadNextPage: () => void, options?: IntersectionObserverInit) => {
  const [lastElement, setLastElement] = useState<HTMLElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          loadNextPage()
        }
      },
      {
        root: options?.root ? options.root : undefined,
        rootMargin: options?.rootMargin ? options.rootMargin : '10px',
        threshold: options?.threshold ? options.threshold : 0,
      },
    )
  }, [loadNextPage, options])

  useEffect(() => {
    if (observer.current === null) return

    const currentElement = lastElement
    const currentOvserver = observer.current
    if (currentElement) {
      currentOvserver.observe(currentElement)
    }

    return () => {
      currentOvserver.disconnect()
    }
  }, [lastElement])

  return {
    lastElement,
    setLastElement,
  }
}
