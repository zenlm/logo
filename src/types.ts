export interface LogoSettings {
  color: {
    viewBox: string;
    width: number;
    height: number;
  };
  mono: {
    strokeWidth: number;
  };
}

export type LogoVariant = 'color' | 'mono' | 'white' | 'animated';
export type LogoFormat = 'svg' | 'dataUrl' | 'base64';

export interface LogoOptions {
  variant?: LogoVariant;
  format?: LogoFormat;
  size?: number;
}
