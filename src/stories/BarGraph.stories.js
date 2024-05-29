import BarGraph from '@/components/BarGraph/BarGraph';
import { action } from '@storybook/addon-actions';
import Colors from '../scss/riseup-js-colors.module.scss';

export default {
  title: 'Components/BarGraph',
  component: BarGraph,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args, { argTypes }) => {
  return {
    components: {
      BarGraph
    },
    props: Object.keys(argTypes),
    data() {
      return {
        dataset: [
          { value: 10 },
          { value: -302 },
          { value: -100 },
          { value: 200 },
          { value: 50 },
          { value: -50 },
          { value: 150 },
          { value: 250 },
        ],
        styles: {
          width: '12px',
          borderRadius: '10px',
        },
        hLines: [
          { value: 110, variant: 'green' },
          { value: -90, variant: 'red' },
        ]
      };
    },
    methods: {
      valueFormatter({ value }) {
        return { value, style: { backgroundColor: value >= 0 ? Colors.riseupGreen : Colors.riseupDangerRed } };
      },
      labelFormatter(value) {
        return `${value} ₪`;
      },
    },
    template: `
      <div style="display: flex; align-items: flex-start; height: 100vh; padding: 24px;">
      <bar-graph style="width: 100%" :raw-values="dataset" :value-formatter="valueFormatter"
                 :label-formatter="labelFormatter" :horizontal-lines="hLines"
                 :bar-styles="styles"/>
      </div>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {};
