import { gsap } from 'gsap/all'

export const setProgressBarColor = gsap.quickSetter(document.body, '--progress-color')
export const setCursorColor = gsap.quickSetter(document.body, '--cursor-color')
export const setCursorColorHover = gsap.quickSetter(document.body, '--cursor-color-hover')
