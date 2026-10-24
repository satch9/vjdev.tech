import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { getSeo } from '../seo'

export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title = getSeo(pathname).title
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}
