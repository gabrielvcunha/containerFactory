module.exports =
{
    name: 'octoplus',
    renderer: 'region',
    maxVolume: 5000,
    nodes: [
      {name: 'ROUTER'},
      {name: 'BD'}
    ],
    connections: [
      {
        source: 'ROUTER',
        target: 'disciplinas_1',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'ROUTER',
        target: 'disciplinas_2',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'ROUTER',
        target: 'disciplinas_3',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'ROUTER',
        target: 'disciplinas_4',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'ROUTER',
        target: 'disciplinas_5',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'disciplinas_1',
        target: 'BD',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'disciplinas_2',
        target: 'BD',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'disciplinas_3',
        target: 'BD',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'disciplinas_4',
        target: 'BD',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      },
      {
        source: 'disciplinas_5',
        target: 'BD',
        metrics: { normal: 20, warning: 0, danger: 0 },
        metadata: { streaming: true }
      }
    ]
};