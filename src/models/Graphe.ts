export interface Sales {
  labels: Array<string>;
  datasets: [
    {
      label: 'Sales htmlFor 2020 (M)';
      data: Array<number>;
      borderColor: ['rgba(0,0,0,1)'];
      backgroundColor: [
        '#55dde0',
        '#33658A',
        '#2F4858',
        '#F6AE2D',
        '#F26419',
        '#14BDEB',
        '#949D6A',
      ];
      borderWidth: 4;
    },
  ];
}

export interface Nbpassage {
  labels: Array<string>;
  datasets: [
    {
      label: 'Nombre de passage de carte par heure de la journée';
      data: Array<number>;
      borderColor: ['rgba(255,206,86,0.2)'];
      backgroundColor: [
        '#55dde0',
        '#33658A',
        '#2F4858',
        '#F6AE2D',
        '#F26419',
        '#14BDEB',
        '#949D6A',
      ];
      borderWidth: 1;
    },
  ];
}

export interface Pourcfidelite {
  labels: Array<string>;
  datasets: [
    {
      label: 'pourcentage de fidelité';
      data: Array<number>;
      borderColor: ['rgba(255,206,86,0.2)'];
      backgroundColor: [
        '#55dde0',
        '#33658A',
        '#2F4858',
        '#F6AE2D',
        '#F26419',
        '#14BDEB',
        '#949D6A',
      ];
      borderWidth: 1;
    },
  ];
}
