import { SheetRegister, SheetDefinition} from "react-native-actions-sheet";
import { ExampleSheet } from "./ExampleSheets";

declare module "react-native-actions-sheet" {
    interface Sheets {
        'example-sheet': SheetDefinition;
    }
}
export const Sheets = () => {
    return <SheetRegister sheets={{
        'example-sheet': ExampleSheet
    }} />
}