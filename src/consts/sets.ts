import { HeroCode } from './heroes';
import { MapCode } from './maps';

export interface SetContent {
  heroes: HeroCode[]
  maps: MapCode[]
}

export enum SetCode {
  VolumeOne = 'VOL1',
  VolumeTwo = 'VOL2',
  VolumeThree = 'VOL3',
  RobinBigfoot = 'RBBF',
  BruceLee = 'LEE',
  JurassicParkRaptors = 'JPRPT',
  JurassicParkTRex = 'JPREX',
  Buffy = 'BUFFY',
  CobbleAndFog = 'CBFG',
  LittleRedBeowulf = 'LRBW',
  HoudiniGenie = 'HDGN',
  MarvelDeadpool = 'DPOOL',
  MarvelRedemptionRow = 'MVLRR',
  MarvelHellKitchen = 'MVLHK',
  MarvelTeenSpirit = 'MVLTS',
  MarvelForKingAndCountry = 'MVLKC',
  MarvelBrainsAndBrawn = 'MVLBB',
  TalesToAmaze = 'TALES',
  SunsOrigin = 'SUNS',
  SlingsAndArrows = 'SLNG',
  WitcherRealmsFall = 'WTCHRF',
  WitcherSteelSilver = 'WTCHSS',
  AliLee = 'ALILEE',
  ShredderKrang = 'SRDKRNG',
  TMNT = 'TMNT',
}

export const setNames: Record<SetCode, string> = {
  [SetCode.VolumeOne]: 'Battle of Legends, Volume One',
  [SetCode.VolumeTwo]: 'Battle of Legends, Volume Two',
  [SetCode.VolumeThree]: 'Battle of Legends, Volume Three',
  [SetCode.RobinBigfoot]: 'Robin Hood vs Bigfoot',
  [SetCode.BruceLee]: 'Bruce Lee',
  [SetCode.JurassicParkRaptors]: 'Jurassic Park: Ingen vs Raptors',
  [SetCode.JurassicParkTRex]: 'Jurassic Park: Sattler vs T-Rex',
  [SetCode.Buffy]: 'Buffy the Vampire Slayer',
  [SetCode.CobbleAndFog]: 'Cobble & Fog',
  [SetCode.LittleRedBeowulf]: 'Little Red Riding Hood vs Beowulf',
  [SetCode.MarvelDeadpool]: 'Deadpool',
  [SetCode.HoudiniGenie]: 'Houdini vs The Genie',
  [SetCode.MarvelRedemptionRow]: 'Redemption Row',
  [SetCode.MarvelHellKitchen]: 'Hell Kitchen',
  [SetCode.MarvelTeenSpirit]: 'Teen Spirit',
  [SetCode.MarvelForKingAndCountry]: 'For King and Country',
  [SetCode.MarvelBrainsAndBrawn]: 'Brains and Brawn',
  [SetCode.TalesToAmaze]: 'Adventures: Tales to Amaze',
  [SetCode.SunsOrigin]: "Sun's Origin",
  [SetCode.SlingsAndArrows]: 'Slings and Arrows',
  [SetCode.WitcherRealmsFall]: 'The Witcher: Realms Fall',
  [SetCode.WitcherSteelSilver]: 'The Witcher: Steel & Silver',
  [SetCode.AliLee]: 'Muhammad Ali vs Bruce Lee',
  [SetCode.ShredderKrang]: 'TMNT: Shredder vs Krang',
  [SetCode.TMNT]: 'Adventures: Teenage Mutant Ninja Turtles',
}

export const setImages: Record<SetCode, string> = {
  [SetCode.VolumeOne]: '/sets/volume-one.png',
  [SetCode.VolumeTwo]: '/sets/volume-two.png',
  [SetCode.VolumeThree]: '/sets/volume-three.png',
  [SetCode.RobinBigfoot]: '/sets/robin-bigfoot.png',
  [SetCode.BruceLee]: '/sets/bruce-lee.png',
  [SetCode.JurassicParkRaptors]: '/sets/jp-raptors.png',
  [SetCode.JurassicParkTRex]: '/sets/jp-trex.png',
  [SetCode.Buffy]: '/sets/buffy.png',
  [SetCode.CobbleAndFog]: '/sets/cobble-fog.png',
  [SetCode.LittleRedBeowulf]: '/sets/little-red-beowulf.png',
  [SetCode.HoudiniGenie]: '/sets/houdini-genie.png',
  [SetCode.MarvelDeadpool]: '/sets/deadpool.png',
  [SetCode.MarvelRedemptionRow]: '/sets/redemption-row.png',
  [SetCode.MarvelHellKitchen]: '/sets/hell-kitchen.png',
  [SetCode.MarvelTeenSpirit]: '/sets/teen-spirit.png',
  [SetCode.MarvelForKingAndCountry]: '/sets/for-king-country.png',
  [SetCode.MarvelBrainsAndBrawn]: '/sets/brains-brawn.png',
  [SetCode.TalesToAmaze]: '/sets/tales-to-amaze.png',
  [SetCode.SunsOrigin]: '/sets/suns-origin.png',
  [SetCode.SlingsAndArrows]: '/sets/slings-arrows.png',
  [SetCode.WitcherRealmsFall]: '/sets/witcher-realms-fall.png',
  [SetCode.WitcherSteelSilver]: '/sets/witcher-steel-silver.png',
  [SetCode.AliLee]: '/sets/ali_lee.webp',
  [SetCode.ShredderKrang]: '/sets/shredder_krang.webp',
  [SetCode.TMNT]: '/sets/tmnt.webp',
}

export const setContents: Record<SetCode, SetContent> = {
  [SetCode.VolumeOne]: {
    heroes: [HeroCode.Alice, HeroCode.Medusa, HeroCode.Sinbad, HeroCode.KingArthur],
    maps: [MapCode.Sarpedon, MapCode.Marmoreal],
  },
  [SetCode.VolumeTwo]: {
    heroes: [HeroCode.Achilles,HeroCode.Yennenga,HeroCode.BloodyMary,HeroCode.SunWukong],
    maps: [MapCode.HangingGardens],
  },
  [SetCode.VolumeThree]: {
    heroes: [HeroCode.Loki, HeroCode.Pandora,HeroCode.Chupacabra,HeroCode.Blackbeard],
    maps: [MapCode.Venice, MapCode.SantasWorkshop],
  },
  [SetCode.RobinBigfoot]: {
    heroes: [HeroCode.RobinHood, HeroCode.Bigfoot],
    maps: [MapCode.Sherwood,MapCode.Yukon],
  },
  [SetCode.BruceLee]: {
    heroes: [HeroCode.BruceLee],
    maps: [],
  },
  [SetCode.MarvelDeadpool]: {
    heroes: [HeroCode.Deadpool],
    maps: [],
  },
  [SetCode.JurassicParkRaptors]: {
    heroes: [HeroCode.Muldoon, HeroCode.Raptors],
    maps: [MapCode.RaptorPaddock],
  },
  [SetCode.JurassicParkTRex]: {
    heroes: [HeroCode.Sattler, HeroCode.TRex],
    maps: [MapCode.TrexPaddock],
  },
  [SetCode.Buffy]: {
    heroes: [HeroCode.Buffy, HeroCode.Spike, HeroCode.Willow, HeroCode.Angel],
    maps: [MapCode.Sunnydale, MapCode.TheBronze],
  },
  [SetCode.CobbleAndFog]: {
    heroes: [HeroCode.Dracula, HeroCode.JekyllHyde, HeroCode.InvisibleMan, HeroCode.Sherlock],
    maps: [MapCode.Soho, MapCode.Baskerville],
  },
  [SetCode.LittleRedBeowulf]: {
    heroes: [HeroCode.LittleRed, HeroCode.Beowulf],
    maps: [MapCode.Heorot],
  },
  [SetCode.HoudiniGenie]: {
    heroes: [HeroCode.Houdini, HeroCode.Genie],
    maps: [MapCode.KingSolomonsMine],
  },
  [SetCode.MarvelRedemptionRow]: {
    heroes: [HeroCode.LukeCage, HeroCode.Elektra, HeroCode.GhostRider, HeroCode.MoonKnight],
    maps: [MapCode.TheRaft],
  },
  [SetCode.MarvelHellKitchen]: {
    heroes: [HeroCode.Daredevil, HeroCode.Elektra, HeroCode.Bullseye],
    maps: [MapCode.HellKitchen],
  },
  [SetCode.MarvelTeenSpirit]: {
    heroes: [HeroCode.MsMarvel, HeroCode.SquirrelGirl, HeroCode.CloakDagger],
    maps: [MapCode.NavyPier],
  },
  [SetCode.MarvelForKingAndCountry]: {
    heroes: [HeroCode.WinterSoldier, HeroCode.BlackPanther, HeroCode.BlackWidow],
    maps: [MapCode.Helicarrier],
  },
  [SetCode.MarvelBrainsAndBrawn]: {
    heroes: [HeroCode.DoctorStrange, HeroCode.SheHulk, HeroCode.SpiderMan],
    maps: [MapCode.SanctumSanctorum],
  },
  [SetCode.TalesToAmaze]: {
    heroes: [HeroCode.JillTrent, HeroCode.AnnieChristmas, HeroCode.GoldenBat, HeroCode.Tesla],
    maps: [MapCode.McMinnville, MapCode.PointPleasant],
  },
  [SetCode.SunsOrigin]: {
    heroes: [HeroCode.OdaNobunaga, HeroCode.TomoeGozen],
    maps: [MapCode.AzuchiCastle],
  },
  [SetCode.SlingsAndArrows]: {
    heroes: [HeroCode.Shakespeare, HeroCode.Hamlet, HeroCode.WaywardSisters],
    maps: [MapCode.GlobeTheatre],
  },
  [SetCode.WitcherRealmsFall]: {
    heroes: [HeroCode.Eredin, HeroCode.Philippa, HeroCode.YenneferTriss],
    maps: [MapCode.KaerMorhen],
  },
  [SetCode.WitcherSteelSilver]: {
    heroes: [HeroCode.Geralt, HeroCode.Ciri, HeroCode.Leshen],
    maps: [MapCode.KaerMorhen],
  },
  [SetCode.AliLee]: {
    heroes: [HeroCode.BruceLee, HeroCode.Ali],
    maps: [],
  },
  [SetCode.ShredderKrang]: {
    heroes: [HeroCode.Shredder, HeroCode.Krang],
    maps: [],
  },
  [SetCode.TMNT]: {
    heroes: [HeroCode.Leonardo, HeroCode.Donatello, HeroCode.Michelangelo, HeroCode.Raphael],
    maps: [],
  },
}
