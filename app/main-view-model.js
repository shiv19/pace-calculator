import { ObservableArray, fromObject } from '@nativescript/core'

const getResultsTemplate = (useKm = true) => ([
  {
    distanceInMeters: 200,
    type: '200m',
    result: '0:00:00',
  },
  {
    distanceInMeters: 400,
    type: '400m',
    result: '0:00:00',
  },
  {
    distanceInMeters: 800,
    type: '800m',
    result: '0:00:00',
  },
  {
    distanceInMeters: 1000,
    type: '1k',
    result: '0:00:00',
  },
  {
    distanceInMeters: 1609,
    type: 'Mile',
    result: '0:00:00',
  },
  {
    distanceInMeters: 5 * 1000,
    type: '5k',
    result: '0:00:00',
  },
  {
    distanceInMeters: 10 * 1000,
    type: '10k',
    result: '0:00:00',
  },
  {
    distanceInMeters: 15 * 1000,
    type: '15k',
    result: '0:00:00',
  },
  {
    distanceInMeters: 21.09 * 1000,
    type: 'Half Marathon',
    result: '0:00:00',
  },
  {
    distanceInMeters: 42.19 * 1000,
    type: 'Marathon',
    result: '0:00:00',
  },
  {
    type: 'Your Distance',
    result: useKm ? '1 km' : '1 mi',
  }
].map((item, index) => ({
  id: index + 1,
  ...item,
})));

function popView(view) {
  view.scaleX = 0.98;
  view.scaleY = 0.98;
  setTimeout(() => {
    view.scaleX = 1;
    view.scaleY = 1;
  }, 100);
}

export function createViewModel() {
  const viewModel = fromObject({
    useKm: true,
    pace: '',
    duration: '',
    focusId: null,
    results: new ObservableArray(getResultsTemplate()),
    setUseKm(args) {
      this.useKm = true
      popView(args.object)
    },
    setUseMi(args) {
      this.useKm = false
      popView(args.object)
    },
    setFocusId(id) {
      this.focusId = this.focusId === id ? null : id;
    },
    clearPace() {
      this.pace = ''
    },
    clearDuration() {
      this.duration = ''
    },
  })

  viewModel.on('propertyChange', (args) => {
    if (!['useKm', 'pace', 'duration'].includes(args.propertyName)) return;

    if (!viewModel.pace || `${viewModel.pace}`.trim() === '') {
      // reset results
      viewModel.set('results', getResultsTemplate(viewModel.useKm))

      return;
    };

    const pace = viewModel.pace
    const results = getResultsTemplate(viewModel.useKm)

    // split pace by : or .
    const paceParts = pace.split(/[:.]/).reverse();
    if (paceParts.length > 3) {
      paceParts.length = 3
    }
    const [seconds, minutes, hours] = paceParts.map((part) => parseInt(part, 10) || 0)
    const paceInSeconds = seconds + (minutes ? (minutes * 60) : 0) + (hours ? (hours * 60 * 60) : 0)

    const timePerMeter = paceInSeconds / (viewModel.useKm ? 1000 : 1609)

    results.forEach((type) => {

      if (type.distanceInMeters) {
        const timeInSeconds = type.distanceInMeters * timePerMeter

        const h = Math.floor(timeInSeconds / 3600);
        const m = Math.floor((timeInSeconds % 3600) / 60);
        const s = Math.floor(timeInSeconds % 60);

        type.result = [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
      } else {
        const duration = viewModel.duration
        const durationParts = duration.split(/[:.]/).reverse();
        if (durationParts.length > 3) {
          durationParts.length = 3
        }
        const [seconds, minutes, hours] = durationParts.map((part) => parseInt(part, 10) || 0)
        const durationInSeconds = seconds + (minutes ? (minutes * 60) : 0) + (hours ? (hours * 60 * 60) : 0)

        if (durationInSeconds) {
          const distanceInMeters = durationInSeconds / timePerMeter

          type.result = `${(distanceInMeters / (viewModel.useKm ? 1000 : 1609)).toFixed(2)} ${viewModel.useKm ? 'km' : 'mi'}`
        }
      }
    })

    viewModel.set('results', results)
  })

  return viewModel
}

