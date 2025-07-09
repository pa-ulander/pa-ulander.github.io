// Typography utilities and design system

// Typography scale based on modular scale
export const Typography = {
  scale: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

// CSS custom properties for typography
export const typographyCSS = `
  :root {
    --font-size-xs: ${Typography.scale.xs};
    --font-size-sm: ${Typography.scale.sm};
    --font-size-base: ${Typography.scale.base};
    --font-size-lg: ${Typography.scale.lg};
    --font-size-xl: ${Typography.scale.xl};
    --font-size-2xl: ${Typography.scale['2xl']};
    --font-size-3xl: ${Typography.scale['3xl']};
    --font-size-4xl: ${Typography.scale['4xl']};
    --font-size-5xl: ${Typography.scale['5xl']};
    
    --font-weight-light: ${Typography.weights.light};
    --font-weight-normal: ${Typography.weights.normal};
    --font-weight-medium: ${Typography.weights.medium};
    --font-weight-semibold: ${Typography.weights.semibold};
    --font-weight-bold: ${Typography.weights.bold};
    
    --line-height-tight: ${Typography.lineHeights.tight};
    --line-height-normal: ${Typography.lineHeights.normal};
    --line-height-relaxed: ${Typography.lineHeights.relaxed};
  }
`
