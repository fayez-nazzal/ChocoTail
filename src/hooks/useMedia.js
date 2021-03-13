import { useState, useEffect } from "react"

const queries = {
  xs: "(max-width: 400px)",
  sm: "(min-width: 400px) and (max-width: 600px)",
  md: "(min-width: 600px) and (max-width: 1024px)",
  lg: "(min-width: 1024px) and (max-width: 1920px)",
  xlg: "(min-width: 1920px) and (max-width: 2304px)",
  xxlg: "(min-width: 2304px)",
}

const useMedia = () => {
  const [queryMatches, setQueryMatches] = useState(null)

  useEffect(() => {
    const mediaQueryLists = {}
    const keys = Object.keys(queries)

    let isAttached = false

    const handleQueryListener = () => {
      const newMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        )
        return acc
      }, {})

      setQueryMatches(newMatches)
      console.log("Matches", newMatches)
    }

    if (window && window.matchMedia) {
      const matches = {}
      keys.forEach(media => {
        if (queries[media]) {
          mediaQueryLists[media] = window.matchMedia(queries[media])

          matches[media] = mediaQueryLists[media].matches
        } else {
          matches[media] = false
        }
      })

      setQueryMatches(matches)

      isAttached = true

      keys.forEach(media => {
        mediaQueryLists[media].addListener(handleQueryListener)
      })

      return () => {
        if (isAttached) {
          keys.forEach(media => {
            if (queries[media]) {
              mediaQueryLists[media].removeListener(handleQueryListener)
            }
          })
        }
      }
    }

    return () => {}
  }, [])

  return queryMatches
}

export default useMedia
