// Import all images as static imports for Next.js Image optimization
import wideColThree from '../../public/images/woman-studio.png'
import womanStrong from '../../public/images/woman-strong.png'
import colTwoOne from '../../public/images/bros-studio.png'
import glutePeopleOutside from '../../public/images/glutes-outside.png'
import runningPeople from '../../public/images/people-run.jpg'
import gluteAction from '../../public/images/glute-action.png'
import logo from '../../public/images/logo.jpg'

export const images = {
  logo,
  gallery: [
    // Row 1, Col 1-2: Horizontal 2x1 image
    { src: gluteAction, alt: 'Woman lifts with her feet' }, // row1col1 (spans to col2)
    
    // Row 1-2, Col 3: Vertical 1x2 image
    { src: womanStrong, alt: 'Woman strong' }, // row1col3 (spans to row2)
    
    // Row 2, Col 1: Square 1x1 image
    { src: colTwoOne, alt: 'Bros at studio' }, // row2col1
    
    // Row 2, Col 2: Square 1x1 image
    { src: glutePeopleOutside, alt: 'Gang outside' }, // row2col2
    
    // Row 3, Col 1: Square 1x1 image
    { src: runningPeople, alt: 'People running' }, // row3col1
    
    // Row 3, Col 2-3: Horizontal 2x1 image
    { src: wideColThree, alt: 'Gym strength zone' }, // row3col2 (spans to col3)
  ]
}