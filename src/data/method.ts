import type { MethodStep } from './types'

export const methodSteps: MethodStep[] = [
  {
    title: 'Vous racontez',
    text: 'Vous m\'expliquez votre projet avec vos mots, même s\'il est encore flou.',
    captures: [{ src: 'captures/methode-1', alt: 'Brief d\'une boulangerie fictive saisi dans mon outil de cadrage' }]
  },
  {
    title: 'Je pose les bonnes questions',
    text: 'Je prépare notre rendez-vous avec des questions ciblées pour lever les zones d\'ombre.',
    captures: [{ src: 'captures/methode-2', alt: 'Questions de rendez-vous générées pour la boulangerie fictive' }]
  },
  {
    title: 'On valide le cadrage',
    text: 'Note de cadrage puis cahier des charges : ce qui sera fait, ce qui ne le sera pas, et dans quel ordre.',
    captures: [
      { src: 'captures/methode-3', alt: 'Note de cadrage de la boulangerie fictive' },
      { src: 'captures/methode-4', alt: 'Cahier des charges de la boulangerie fictive' }
    ]
  },
  {
    title: 'Je développe et je mets en ligne',
    text: 'Vous suivez l\'avancement, vous testez, puis je mets en ligne sur un hébergement sécurisé.',
    captures: []
  }
]

export const followUp = 'Après la mise en ligne, je reste votre interlocuteur pour les corrections et les évolutions.'
