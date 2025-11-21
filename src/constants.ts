import { ChecklistItem } from './types';

export const INITIAL_ITEMS: ChecklistItem[] = [
  {
    id: '1',
    text: 'Poišči svoje volišče',
    description: 'Veš, kje moraš oddati glas? Preveri na vabilu ali e-Upravi.',
    isCompleted: false,
    impact:10,
    link: 'https://www.dvk-rs.si/volisca/',
    linkText: 'Iskalnik volišč'
  },
  {
    id: 'new_1',
    text: 'Preveri veljavnost dokumenta',
    description: 'Brez veljavne osebne izkaznice ali potnega lista ne moreš glasovati. Pripravi si ga danes.',
    isCompleted: false,
    impact: 5
  },
  {
    id: '3',
    text: 'Spomni družino',
    description: 'Starši, babica in dedek, partner, polnoletni otroci. Prepričaj se, da bodo tudi oni oddali glas.',
    isCompleted: false,
    impact: 20
  },
  {
    id: '4',
    text: 'Kontaktiraj 3 prijatelje',
    description: 'Pošlji SMS ali pokliči 3 ljudi, ki se sicer bolj redko udeležujejo volitev in referendumov.',
    isCompleted: false,
    impact: 25
  },
  // {
  //   id: '5',
  //   text: 'Objavi na družbenih omrežjih',
  //   description: 'Svojo podporo zakonu objavi na socialnih omrežjih. Zgled šteje!',
  //   isCompleted: false,
  //   impact: 15
  // },
  {
    id: '7',
    text: 'Dodaj si digitalno priponko',
    description: 'Na družbenih omrežjih si lahko k profilni sliki dodaš priponko podpore.',
    isCompleted: false,
    impact: 15,
    link: 'https://vodici.djnd.si/referendum/dostojna-smrt/priponka-podpore/',
    linkText: 'Priponka podpore'
  },
  {
    id: '6',
    text: 'Ponudi prevoz',
    description: 'Poznaš koga starejšega ali brez avta, ki bo imel v nedeljo težave z oddajo glasu? Ponudi jim prevoz do volišča.',
    isCompleted: false,
    impact: 25
  }
];