export const setCssVar = (prop, val, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

export const getCssVar = (prop, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(prop)
}
