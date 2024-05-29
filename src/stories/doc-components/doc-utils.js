export async function copyToClipboard(textToCopy) {
// Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

export const camelCaseToSpacedCase = str => str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

export const stylePropsToCssClassDef = properties => Object.entries(properties)
  .map(([key, value]) => `  ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
  .join('\n');

export const typographyVarToCssClass = {
  giantDisplay: 'ri-giant-display',
  largeDisplay: 'ri-large-display',
  mediumBoldDisplay: 'ri-medium-display',
  mediumDisplay: 'ri-medium-display',
  smallDisplay: 'ri-small-display',
  largeHeadline: 'ri-large-headline',
  mediumBoldHeadline: 'ri-medium-bold-headline',
  mediumHeadline: 'ri-medium-headline',
  boldTitle: 'ri-bold-title',
  title: 'ri-title',
  largeBoldBody: 'ri-large-bold-body',
  largeBody: 'ri-large-body',
  boldBody: 'ri-bold-body',
  body: 'ri-body',
  boldLabel: 'ri-bold-label',
  label: 'ri-label',
  smallBoldBody: 'ri-small-bold-body',
  smallBody: 'ri-small-body',
};
