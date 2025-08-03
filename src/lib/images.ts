// Import all images as static imports for Next.js Image optimization
import gymWeightsArea from '../../public/images/gym-weights-area.jpg'
import gymCardioZone from '../../public/images/gym-cardio-zone.jpg'
import gymTrainingFloor from '../../public/images/gym-training-floor.jpg'
import gymEquipmentRack from '../../public/images/gym-equipment-rack.jpg'
import gymFunctionalArea from '../../public/images/gym-functional-area.jpg'
import gymStrengthZone from '../../public/images/gym-strength-zone.jpg'
import logo from '../../public/images/logo.jpg'

export const images = {
  logo,
  gallery: [
    { src: gymWeightsArea, alt: 'Gym weights area', gridSpan: 'md:col-span-2', height: 'h-64 md:h-80' },
    { src: gymCardioZone, alt: 'Gym cardio zone', gridSpan: 'md:col-span-1', height: 'h-48 md:h-64' },
    { src: gymTrainingFloor, alt: 'Gym training floor', gridSpan: 'md:col-span-1', height: 'h-56 md:h-72' },
    { src: gymEquipmentRack, alt: 'Gym equipment rack', gridSpan: 'md:col-span-1', height: 'h-52 md:h-60' },
    { src: gymFunctionalArea, alt: 'Gym functional area', gridSpan: 'md:col-span-2', height: 'h-48 md:h-64' },
    { src: gymStrengthZone, alt: 'Gym strength zone', gridSpan: 'md:col-span-1', height: 'h-60 md:h-76' },
  ]
}