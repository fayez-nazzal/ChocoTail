export const getScrollPercent = () => {
  const doc = document.documentElement
  const body = document.body
  const scrollTop = "scrollTop"
  const scrollHeight = "scrollHeight"
  return (
    ((doc[scrollTop] || body[scrollTop]) /
      ((doc[scrollHeight] || body[scrollHeight]) - doc.clientHeight)) *
    100
  )
}
