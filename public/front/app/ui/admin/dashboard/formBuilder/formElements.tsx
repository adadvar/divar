import { TitleFieldFormElement } from "./fields/titleField";
import { TextFieldFormElement } from "./fields/textField";
import { SubTitleFieldFormElement } from "./fields/subTitleField";
import { ParagraphFieldFormElement } from "./fields/paragraphField";
import { SeparatorFieldFormElement } from "./fields/separatorField";
import { SpacerFieldFormElement } from "./fields/spacerField";
import { NumberFieldFormElement } from "./fields/numberField";
import { TextAreaFieldFormElement } from "./fields/textAreaField";
import { DateFieldFormElement } from "./fields/dateField";
import { SelectFieldFormElement } from "./fields/selectField";
import { CheckboxFieldFormElement } from "./fields/checkboxField";
import { ImageFieldFormElement } from "./fields/imageField";

export type ElementsType =
    | "TextField"
    | "TitleField"
    | "SubTitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"
    | "NumberField"
    | "TextAreaField"
    | "DateField"
    | "SelectField"
    | "CheckboxField"
    | "ImageField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    desingerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (
        formelement: FormElementInstance,
        currentValue: string
    ) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
    ImageField: ImageFieldFormElement,
};
