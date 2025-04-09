import { type HeroCode, type MapCode } from '../consts'

export interface BaseDraftStep {
  type: 'pick' | 'ban' | 'map' | 'position' | 'choice' | 'final'
  team: 'A' | 'B'
}

export interface PickStep extends BaseDraftStep {
  type: 'pick'
  value: HeroCode | null
}

export interface BanStep extends BaseDraftStep {
  type: 'ban'
  value: HeroCode | null
}

export interface MapStep extends BaseDraftStep {
  type: 'map'
  value: MapCode | null
}

export interface PositionStep extends BaseDraftStep {
  type: 'position'
  value: 1 | 2 | null
}

export interface ChoiceStep extends BaseDraftStep {
  type: 'choice'
  value: 'map' | 'position' | null
}

export interface FinalStep extends BaseDraftStep {
  type: 'final'
  value: null
}

export type DraftStep = PickStep | BanStep | MapStep | PositionStep | ChoiceStep | FinalStep
