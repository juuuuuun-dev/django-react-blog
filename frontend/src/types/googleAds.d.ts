
export type GoogleAdsProps = {
  client: string | undefined;
  slot: string | undefined;
  format: "rectangle" | "vertical" | "horizonal" | "auto";
  responsive?: boolean;
  classStr?: string;
  style?: object;
}
