import Slider from '@/components/Slider';
import Card from '@/components/Card/Card';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      options: ['rtl', 'ltr'],
      control: { type: 'inline-radio' },
    },
    padding: {
      control: {
        type: 'range',
        min: 0,
        max: 30,
        step: 1,
      },
    },
    gap: {
      control: {
        type: 'range',
        min: 0,
        max: 30,
        step: 1,
      },
    },
    maxDots: {
      control: {
        type: 'range',
        min: 3,
        max: 15,
        step: 2,
      },
    },
  },
};

const BaseTemplate = (args, { argTypes }) => {
  return {
    components: {
      Slider,
      Card,
    },
    props: Object.keys(argTypes),
    data() {
      return {
        containerStyles: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      };
    },
    methods: {
      getUniqueKey: props => JSON.stringify(props),
    },
    template: `
      <slider v-bind="$props" style="margin: 32px 0;" :style="{ direction: $props.direction ?? 'rtl'}" :key="this.getUniqueKey($props)">
      <template v-slot:default="{ slideData }">
        <card style="height: 200px;">
          <div :style="containerStyles">
            {{ slideData.key }}
          </div>
        </card>
      </template>
      </slider>
    `,
  };
};

export const Default = BaseTemplate.bind({});
Default.args = {
  infinite: false,
  direction: 'rtl',
  padding: 24,
  gap: 8,
  firstSlideIndex: 0,
  slidesData: [{ key: 'שלום' }, { key: 'מהסליידר' }, { key: 'של' }, { key: 'רייזאפ!' }, { key: '🌻' }],
};

export const Infinite = BaseTemplate.bind({});
Infinite.args = {
  infinite: true,
  direction: 'ltr',
  padding: 32,
  gap: 16,
  firstSlideIndex: 0,
  slidesData: [{ key: 'Round and round' }, { key: 'she goes' }, { key: 'where she stops' }, { key: 'nobody knows' }],
};

export const ManySlides = BaseTemplate.bind({});
ManySlides.args = {
  infinite: false,
  direction: 'ltr',
  padding: 32,
  gap: 16,
  firstSlideIndex: 0,
  maxDots: 5,
  slidesData: Array.from({ length: 30 }, (_, i) => { return { key: `Slide ${i + 1}` }; }),
};

export const OneSlide = BaseTemplate.bind({});
OneSlide.args = {
  infinite: false,
  direction: 'rtl',
  firstSlideIndex: 0,
  padding: 24,
  minDots: 1,
  slidesData: Array.from({ length: 1 }, (_, i) => { return { key: `Slide ${i + 1}` }; }),
};
