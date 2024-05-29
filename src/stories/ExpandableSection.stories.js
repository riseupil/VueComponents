import ExpandableSection from '@/components/ExpandableSection';

export default {
  title: 'Components/ExpandableSection',
  component: ExpandableSection,
};

const Template = (args, { argTypes }) => {
  return {
    components: { ExpandableSection },
    props: Object.keys(argTypes),
    template: `<expandable-section v-bind="$props">${args.content}</expandable-section>`,
  };
};
export const Default = Template.bind({});
Default.args = {
  headerText: 'פירוט הוצאות',
  content: `<template v-slot:content>
            <div style="font-size: 32px;">🌻🌻🌻</div>
            <div>תוכן של הסקשן</div>
        </template>
`,
};

export const WithCustomHeader = Template.bind({});
WithCustomHeader.args = {
  content: `<template v-slot:header>
            <div style="font-weight: bold; font-size: 20px; color: #5d7afd;">
                <div>כותרת מותאמת אישית</div>
            </div>
        </template>
        <template v-slot:content>
            <div style="font-size: 32px;">🌻🌻🌻</div>
            <div>תוכן של הסקשן</div>
        </template>
`,
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  headerText: 'פירוט הוצאות',
  content: `<template v-slot:icon>:-)</template>
        <template v-slot:content>
            <div style="font-size: 32px;">🌻🌻🌻</div>
            <div>תוכן של הסקשן</div>
        </template>
`,
};
