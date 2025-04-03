// 디자인 시스템의 중앙 포인트
// 테마 관련 설정, 타입, 유틸리티 함수 등을 내보냅니다.

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeSpacing {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ThemeShadow {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeFontSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeFontWeight {
  thin: number;
  extralight: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface ThemeTransition {
  fast: string;
  normal: string;
  slow: string;
}

export interface ThemeLayout {
  containerMaxWidth: string;
  headerHeight: string;
  sidebarWidth: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadow: ThemeShadow;
  fontSize: ThemeFontSize;
  fontWeight: ThemeFontWeight;
  transition: ThemeTransition;
  layout: ThemeLayout;
}

// CSS 변수에서 현재 테마 값을 읽어오는 함수
export const getCurrentTheme = (): Theme => {
  // CSS 변수에서 값을 가져오는 헬퍼 함수
  const getCssVar = (name: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  };

  return {
    colors: {
      primary: {
        50: getCssVar('--color-primary-50'),
        100: getCssVar('--color-primary-100'),
        200: getCssVar('--color-primary-200'),
        300: getCssVar('--color-primary-300'),
        400: getCssVar('--color-primary-400'),
        500: getCssVar('--color-primary-500'),
        600: getCssVar('--color-primary-600'),
        700: getCssVar('--color-primary-700'),
        800: getCssVar('--color-primary-800'),
        900: getCssVar('--color-primary-900'),
      },
      secondary: {
        50: getCssVar('--color-secondary-50'),
        100: getCssVar('--color-secondary-100'),
        200: getCssVar('--color-secondary-200'),
        300: getCssVar('--color-secondary-300'),
        400: getCssVar('--color-secondary-400'),
        500: getCssVar('--color-secondary-500'),
        600: getCssVar('--color-secondary-600'),
        700: getCssVar('--color-secondary-700'),
        800: getCssVar('--color-secondary-800'),
        900: getCssVar('--color-secondary-900'),
      },
      gray: {
        50: getCssVar('--color-gray-50'),
        100: getCssVar('--color-gray-100'),
        200: getCssVar('--color-gray-200'),
        300: getCssVar('--color-gray-300'),
        400: getCssVar('--color-gray-400'),
        500: getCssVar('--color-gray-500'),
        600: getCssVar('--color-gray-600'),
        700: getCssVar('--color-gray-700'),
        800: getCssVar('--color-gray-800'),
        900: getCssVar('--color-gray-900'),
      },
      success: getCssVar('--color-success'),
      warning: getCssVar('--color-warning'),
      error: getCssVar('--color-error'),
      info: getCssVar('--color-info'),
    },
    spacing: {
      none: getCssVar('--spacing-none'),
      xs: getCssVar('--spacing-xs'),
      sm: getCssVar('--spacing-sm'),
      md: getCssVar('--spacing-md'),
      lg: getCssVar('--spacing-lg'),
      xl: getCssVar('--spacing-xl'),
      '2xl': getCssVar('--spacing-2xl'),
      '3xl': getCssVar('--spacing-3xl'),
    },
    borderRadius: {
      none: getCssVar('--radius-none'),
      sm: getCssVar('--radius-sm'),
      md: getCssVar('--radius-md'),
      lg: getCssVar('--radius-lg'),
      xl: getCssVar('--radius-xl'),
      '2xl': getCssVar('--radius-2xl'),
      full: getCssVar('--radius-full'),
    },
    shadow: {
      sm: getCssVar('--shadow-sm'),
      md: getCssVar('--shadow-md'),
      lg: getCssVar('--shadow-lg'),
      xl: getCssVar('--shadow-xl'),
    },
    fontSize: {
      xs: getCssVar('--font-size-xs'),
      sm: getCssVar('--font-size-sm'),
      md: getCssVar('--font-size-md'),
      lg: getCssVar('--font-size-lg'),
      xl: getCssVar('--font-size-xl'),
      '2xl': getCssVar('--font-size-2xl'),
      '3xl': getCssVar('--font-size-3xl'),
      '4xl': getCssVar('--font-size-4xl'),
    },
    fontWeight: {
      thin: parseInt(getCssVar('--font-weight-thin')),
      extralight: parseInt(getCssVar('--font-weight-extralight')),
      light: parseInt(getCssVar('--font-weight-light')),
      normal: parseInt(getCssVar('--font-weight-normal')),
      medium: parseInt(getCssVar('--font-weight-medium')),
      semibold: parseInt(getCssVar('--font-weight-semibold')),
      bold: parseInt(getCssVar('--font-weight-bold')),
      extrabold: parseInt(getCssVar('--font-weight-extrabold')),
      black: parseInt(getCssVar('--font-weight-black')),
    },
    transition: {
      fast: getCssVar('--transition-fast'),
      normal: getCssVar('--transition-normal'),
      slow: getCssVar('--transition-slow'),
    },
    layout: {
      containerMaxWidth: getCssVar('--container-max-width'),
      headerHeight: getCssVar('--header-height'),
      sidebarWidth: getCssVar('--sidebar-width'),
    },
  };
};

// 테마 상수 (타입 안전한 방식으로 컴포넌트 변형 등을 정의)
export const THEME_VARIANTS = {
  INPUT: {
    DEFAULT: 'default',
    FILLED: 'filled',
    OUTLINED: 'outlined',
  } as const,
  BUTTON: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    GHOST: 'ghost',
    LINK: 'link',
    DESTRUCTIVE: 'destructive',
  } as const,
  SIZE: {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
  } as const,
};

// 타입 유틸리티
export type InputVariant = typeof THEME_VARIANTS.INPUT[keyof typeof THEME_VARIANTS.INPUT];
export type ButtonVariant = typeof THEME_VARIANTS.BUTTON[keyof typeof THEME_VARIANTS.BUTTON];
export type SizeVariant = typeof THEME_VARIANTS.SIZE[keyof typeof THEME_VARIANTS.SIZE]; 