import { SharedValue } from "react-native-reanimated";

export type Slide = {
  id: number;
  isLast: boolean;
  title: string;
  description: string;
  image: any;
  backgroundColor: string;
  imageSize: string;
};

export type OnboardingFooterProps = {
  progress: SharedValue<number>;
  data: Slide[];
  isLastSlide: boolean;
  onNext: () => void;
  onRegister: () => void;
  onPressPagination: (index: number) => void;
};