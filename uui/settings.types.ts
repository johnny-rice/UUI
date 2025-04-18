interface DefaultSizes {
    alert: string;
    badge: string;
    button: string;
    checkbox: string;
    countIndicator: string;
    flexRow: string;
    filtersPanel: string;
    linkButton: string;
    numericInput: string;
    radioInput: string;
    richTextView: string;
    switch: string;
    tabButton: string;
    tag: string;
    text: string;
    textArea: string;
    textInput: string;
    rangeDatePicker: string;
    datePicker: string;
    labeledInput: string;
    statusIndicator: string;
    paginator: string,
    rating: string,
}

interface Sizes {
    [size: string | number]: string | number;
}

interface TextSize {
    fontSize?: string | number;
    fontWeight?: string | number;
    lineHeight?: string | number;
    size?: string | number;
}

interface UppercaseTextSize {
    uppercase: string;
}

interface AlertSizes {
    action: Sizes;
}

interface NotificationCardSizes {
    action: string;
}

interface TagSizes {
    countIndicator: Sizes;
}

interface PickerInputSizes {
    toggler: PickerInputTogglerSizes;
    body: PickerInputBodySizes;
}

interface PickerInputTogglerDefaultSizes {
    size: string;
    tag: string;
}

interface PickerInputTogglerSizes {
    defaults: PickerInputTogglerDefaultSizes;
    tag: Sizes;
}

interface PickerInputBodySizes {
    dropdown: PickerInputBodyDropdownSizes;
    mobile: PickerInputBodyMobileSizes;
    modal: PickerInputBodyModalSizes;
}

interface PickerInputBodyDropdownSizes {
    height: number;
    width: number;
    padding: string;
    row: PickerInputBodyRowSizes;
    footer: PickerBodyDropdownFooterSizes;
}

interface PickerInputBodyItemSizes {
    default: string;
    avatar: PickerItemAvatarSizes;
    verticalPadding: Sizes;
}

interface PickerInputBodyCellSizes {
    item: PickerInputBodyItemSizes;
    isBoldSelectionIcon: IsBoldSizes;
    text: Sizes;
    icon: Sizes;
    padding: string;
}

interface PickerInputBodyRowSizes {
    default: string;
    cell: PickerInputBodyCellSizes;
}

interface PickerBodyDropdownFooterSizes {
    switch: Sizes;
    linkButton: Sizes;
}

interface PickerInputBodyMobileSizes {
    header: PickerBodyMobileHeaderSizes;
    footer: PickerBodyMobileFooterSizes;
    row: string;
    searchInput: string;
}

interface PickerBodyMobileHeaderSizes {
    titleSize: string;
}

interface PickerBodyMobileFooterSizes {
    linkButton: string;
}

interface PickerInputBodyModalSizes {
    row: string;
    padding: string;
}

interface PickerItemAvatarSizes {
    rest: Sizes;
    multiline: Sizes;
}

interface IsBoldSizes {
    [size: string | number]: boolean;
}

interface RowAddonsSizes {
    defaults: RowAddonsDefaults;
    checkbox: Sizes;
    icon: Sizes;
    indentUnit: Sizes;
    indentWidth: Sizes;
}

interface RowAddonsDefaults {
    icon: string,
    indentUnit: number,
    indentWidth: number,
}

interface TextSizes {
    [size: string | number]: TextSize;
}

interface LabeledInputSizes {
    fillIcon: string[];
}

interface BadgeSizes {
    countIndicator: Sizes;
}

interface DataTableHeaderCellSizes {
    defaults: DataTableHeaderCellDefaults;
    checkbox: Sizes;
    columnCaption: TextSize & UppercaseTextSize;
    iconSize: Sizes;
    truncate?: string[];
}

interface DataTableHeaderGroupCellDefaults {
    size: string;
    padding: string;
    paddingEdge: string;
}

interface DataTableHeaderGroupCellSizes {
    defaults: DataTableHeaderGroupCellDefaults;
    columnCaption: TextSize & UppercaseTextSize;
    iconSize: Sizes;
    truncate?: string[];
}

interface DataTableHeaderCellDefaults {
    size: string;
    resizeMarker: string;
    padding: string;
    paddingEdge: string;
}

interface DataTableCellSizes {
    defaults: DataTableCellDefaults;
    text: Sizes;
}

interface DataTableCellDefaults {
    size: string;
    padding: string;
    paddingEdge: string;
}

interface DataTableColumnsConfigurationModal {
    columnRow: string;
    countIndicator: string;
    subgroupIcon: string;
    search: string;
    width: number;
}

interface FiltersPanelPickerBodySizes {
    default: string;
}

interface FiltersPanelPickerSizes {
    body: FiltersPanelPickerBodySizes;
}

interface FiltersPanelSizes {
    pickerInput: FiltersPanelPickerSizes;
}

interface DataTableHeaderRowSizes {
    default: string;
    cell: DataTableHeaderCellSizes;
    groupCell: DataTableHeaderGroupCellSizes;
}

interface DataTableHeaderSizes {
    row: DataTableHeaderRowSizes;
}

interface DataTableRowSizes {
    default: string;
    cell: DataTableCellSizes;
}

interface DataTableBodySizes {
    row: DataTableRowSizes;
}

interface DataTableSizes {
    columnsConfigurationModal: DataTableColumnsConfigurationModal;
    header: DataTableHeaderSizes;
    body: DataTableBodySizes;
}

interface TabButtonSizes {
    countIndicator: Sizes;
}

interface ModalWindowDefaultSizes {
    width: number;
}

interface ModalWindowSizes {
    defaults: ModalWindowDefaultSizes;
}

interface ModalSizes {
    window: ModalWindowSizes;
}

interface SizesSettings {
    defaults: DefaultSizes;
    alert: AlertSizes;
    notificationCard: NotificationCardSizes;
    tag: TagSizes;
    pickerInput: PickerInputSizes;
    rowAddons: RowAddonsSizes;
    text: TextSizes;
    filtersPanel: FiltersPanelSizes;
    labeledInput: LabeledInputSizes;
    badge: BadgeSizes;
    dataTable: DataTableSizes;
    modal: ModalSizes;
    tabButton: TabButtonSizes;
}

export interface Settings {
    /**
     * setting sizes for complex and compound components to support 'Size theming'
     */
    sizes: SizesSettings;
}
