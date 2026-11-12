import * as THREE from 'three'

/** Kit colour, kept in one place so all three figures read as one team. */
export interface Kit {
  shirt: THREE.ColorRepresentation
  shirtShade: THREE.ColorRepresentation
  trim: THREE.ColorRepresentation
  trouser: THREE.ColorRepresentation
  helmet: THREE.ColorRepresentation
  helmetStripe: THREE.ColorRepresentation
  pad: THREE.ColorRepresentation
  padStrap: THREE.ColorRepresentation
  glove: THREE.ColorRepresentation
  skin: THREE.ColorRepresentation
  bat: THREE.ColorRepresentation
  batHandle: THREE.ColorRepresentation
  shoe: THREE.ColorRepresentation
}

export const HOME_KIT: Kit = {
  shirt: '#ece8da',
  shirtShade: '#d6d1c0',
  trim: '#153a2c',
  trouser: '#e6e2d4',
  helmet: '#12342a',
  helmetStripe: '#c6ff3d',
  pad: '#efece0',
  padStrap: '#153a2c',
  glove: '#e9e5d8',
  skin: '#b98a63',
  bat: '#c9a06a',
  batHandle: '#1a1f1d',
  shoe: '#e8e4d6',
}

/** Slightly darker kit for the fielding side, so the batsman reads first. */
export const AWAY_KIT: Kit = {
  ...HOME_KIT,
  shirt: '#dcd8c9',
  shirtShade: '#c3bfae',
  trim: '#274a3a',
  trouser: '#d8d4c4',
}
