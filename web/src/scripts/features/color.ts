import { gsap } from 'gsap/all'
import { app } from 'scripts/app'

export const setProgressBarColor = gsap.quickSetter(document.body, '--progress-color')
export const setCursorColor = gsap.quickSetter(document.body, '--cursor-color')
export const setCursorColorHover = gsap.quickSetter(document.body, '--cursor-color-hover')
export const setHeaderColor = gsap.quickSetter(document.body, '--header-color')

export const getColorAttribute = ({ dataset }: HTMLElement) => dataset.color

export const setColors = ([progress, cursor, cursorHover]: string[]) => {
  setProgressBarColor(progress)
  setCursorColor(cursor)
  setCursorColorHover(cursorHover)
}

export const saveColors = ([cursor, cursorHover]: string[]) => {
  app.globals.cursorColor = cursor
  app.globals.cursorColorHover = cursorHover
}
