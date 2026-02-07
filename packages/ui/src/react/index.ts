import React from 'react';
import { createComponent } from '@lit/react';

import { BlButton } from '../components/button/button.js';
import { BlCard } from '../components/card/card.js';
import { BlInput } from '../components/input/input.js';
import { BlBadge } from '../components/badge/badge.js';
import { BlAlert } from '../components/alert/alert.js';
import { BlSeparator } from '../components/separator/separator.js';
import { BlLabel } from '../components/label/label.js';
import { BlAvatar } from '../components/avatar/avatar.js';
import { BlSpinner } from '../components/spinner/spinner.js';
import { BlSkeleton } from '../components/skeleton/skeleton.js';
import { BlIcon } from '../components/icon/icon.js';
import { BlToggle } from '../components/toggle/toggle.js';
import { BlCheckbox } from '../components/checkbox/checkbox.js';
import { BlSwitch } from '../components/switch/switch.js';
import { BlRadio } from '../components/radio/radio.js';
import { BlRadioGroup } from '../components/radio-group/radio-group.js';
import { BlVisuallyHidden } from '../primitives/visually-hidden/visually-hidden.js';
import { BlPortal } from '../primitives/portal/portal.js';

// v0.4 Interaction Primitives
import { BlTooltip } from '../components/tooltip/tooltip.js';
import { BlPopover } from '../components/popover/popover.js';
import { BlAccordion } from '../components/accordion/accordion.js';
import { BlAccordionItem } from '../components/accordion/accordion-item.js';
import { BlToggleGroup } from '../components/toggle-group/toggle-group.js';
import { BlTabs } from '../components/tabs/tabs.js';
import { BlTab } from '../components/tabs/tab.js';
import { BlTabPanel } from '../components/tabs/tab-panel.js';
import { BlSelect } from '../components/select/select.js';
import { BlOption } from '../components/select/option.js';
import { BlOptionGroup } from '../components/select/option-group.js';
import { BlMenu } from '../components/menu/menu.js';
import { BlMenuItem } from '../components/menu/menu-item.js';
import { BlMenuSeparator } from '../components/menu/menu-separator.js';
import { BlMenuGroup } from '../components/menu/menu-group.js';
import { BlMenuGroupLabel } from '../components/menu/menu-group-label.js';
import { BlContextMenu } from '../components/context-menu/context-menu.js';
import { BlDialog } from '../components/dialog/dialog.js';
import { BlToast } from '../components/toast/toast.js';
import { BlToastRegion } from '../components/toast/toast-region.js';

export const Button = createComponent({
  tagName: 'bl-button',
  elementClass: BlButton,
  react: React,
});

export const Card = createComponent({
  tagName: 'bl-card',
  elementClass: BlCard,
  react: React,
});

export const Input = createComponent({
  tagName: 'bl-input',
  elementClass: BlInput,
  react: React,
  events: {
    onBlInput: 'bl-input' as EventName<CustomEvent<{ value: string }>>,
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const Badge = createComponent({
  tagName: 'bl-badge',
  elementClass: BlBadge,
  react: React,
});

export const Alert = createComponent({
  tagName: 'bl-alert',
  elementClass: BlAlert,
  react: React,
  events: {
    onBlDismiss: 'bl-dismiss' as EventName<CustomEvent>,
  },
});

export const Separator = createComponent({
  tagName: 'bl-separator',
  elementClass: BlSeparator,
  react: React,
});

export const Label = createComponent({
  tagName: 'bl-label',
  elementClass: BlLabel,
  react: React,
});

export const Avatar = createComponent({
  tagName: 'bl-avatar',
  elementClass: BlAvatar,
  react: React,
});

export const Spinner = createComponent({
  tagName: 'bl-spinner',
  elementClass: BlSpinner,
  react: React,
});

export const Skeleton = createComponent({
  tagName: 'bl-skeleton',
  elementClass: BlSkeleton,
  react: React,
});

export const Icon = createComponent({
  tagName: 'bl-icon',
  elementClass: BlIcon,
  react: React,
});

export const Toggle = createComponent({
  tagName: 'bl-toggle',
  elementClass: BlToggle,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ pressed: boolean }>>,
  },
});

export const Checkbox = createComponent({
  tagName: 'bl-checkbox',
  elementClass: BlCheckbox,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ checked: boolean }>>,
  },
});

export const Switch = createComponent({
  tagName: 'bl-switch',
  elementClass: BlSwitch,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ checked: boolean }>>,
  },
});

export const Radio = createComponent({
  tagName: 'bl-radio',
  elementClass: BlRadio,
  react: React,
});

export const RadioGroup = createComponent({
  tagName: 'bl-radio-group',
  elementClass: BlRadioGroup,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const VisuallyHidden = createComponent({
  tagName: 'bl-visually-hidden',
  elementClass: BlVisuallyHidden,
  react: React,
});

export const Portal = createComponent({
  tagName: 'bl-portal',
  elementClass: BlPortal,
  react: React,
});

// v0.4 Interaction Primitives

export const Tooltip = createComponent({
  tagName: 'bl-tooltip',
  elementClass: BlTooltip,
  react: React,
  events: {
    onBlTooltipShow: 'bl-tooltip-show' as EventName<CustomEvent>,
    onBlTooltipHide: 'bl-tooltip-hide' as EventName<CustomEvent>,
  },
});

export const Popover = createComponent({
  tagName: 'bl-popover',
  elementClass: BlPopover,
  react: React,
  events: {
    onBlPopoverShow: 'bl-popover-show' as EventName<CustomEvent>,
    onBlPopoverHide: 'bl-popover-hide' as EventName<CustomEvent>,
  },
});

export const Accordion = createComponent({
  tagName: 'bl-accordion',
  elementClass: BlAccordion,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string | string[] }>>,
  },
});

export const AccordionItem = createComponent({
  tagName: 'bl-accordion-item',
  elementClass: BlAccordionItem,
  react: React,
});

export const ToggleGroup = createComponent({
  tagName: 'bl-toggle-group',
  elementClass: BlToggleGroup,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const Tabs = createComponent({
  tagName: 'bl-tabs',
  elementClass: BlTabs,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const Tab = createComponent({
  tagName: 'bl-tab',
  elementClass: BlTab,
  react: React,
});

export const TabPanel = createComponent({
  tagName: 'bl-tab-panel',
  elementClass: BlTabPanel,
  react: React,
});

export const Select = createComponent({
  tagName: 'bl-select',
  elementClass: BlSelect,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const Option = createComponent({
  tagName: 'bl-option',
  elementClass: BlOption,
  react: React,
});

export const OptionGroup = createComponent({
  tagName: 'bl-option-group',
  elementClass: BlOptionGroup,
  react: React,
});

export const Menu = createComponent({
  tagName: 'bl-menu',
  elementClass: BlMenu,
  react: React,
  events: {
    onBlMenuSelect: 'bl-menu-select' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const MenuItem = createComponent({
  tagName: 'bl-menu-item',
  elementClass: BlMenuItem,
  react: React,
});

export const MenuSeparator = createComponent({
  tagName: 'bl-menu-separator',
  elementClass: BlMenuSeparator,
  react: React,
});

export const MenuGroup = createComponent({
  tagName: 'bl-menu-group',
  elementClass: BlMenuGroup,
  react: React,
});

export const MenuGroupLabel = createComponent({
  tagName: 'bl-menu-group-label',
  elementClass: BlMenuGroupLabel,
  react: React,
});

export const ContextMenu = createComponent({
  tagName: 'bl-context-menu',
  elementClass: BlContextMenu,
  react: React,
});

export const Dialog = createComponent({
  tagName: 'bl-dialog',
  elementClass: BlDialog,
  react: React,
  events: {
    onBlDialogShow: 'bl-dialog-show' as EventName<CustomEvent>,
    onBlDialogHide: 'bl-dialog-hide' as EventName<CustomEvent>,
    onBlDialogRequestClose: 'bl-dialog-request-close' as EventName<CustomEvent>,
  },
});

export const Toast = createComponent({
  tagName: 'bl-toast',
  elementClass: BlToast,
  react: React,
  events: {
    onBlToastDismiss: 'bl-toast-dismiss' as EventName<CustomEvent>,
  },
});

export const ToastRegion = createComponent({
  tagName: 'bl-toast-region',
  elementClass: BlToastRegion,
  react: React,
});

// v0.5 Components
import { BlFormLayout } from '../components/form-layout/form-layout.js';
import { BlFormField } from '../components/form-layout/form-field.js';
import { BlFormDescription } from '../components/form-layout/form-description.js';
import { BlFormError } from '../components/form-layout/form-error.js';
import { BlFormFieldset } from '../components/form-layout/form-fieldset.js';
import { BlPageHeader } from '../components/page-header/page-header.js';
import { BlBreadcrumb } from '../components/page-header/breadcrumb.js';
import { BlBreadcrumbItem } from '../components/page-header/breadcrumb-item.js';
import { BlPageHeaderAvatar } from '../components/page-header/page-header-avatar.js';
import { BlSidebar } from '../components/sidebar/sidebar.js';
import { BlSidebarHeader } from '../components/sidebar/sidebar-header.js';
import { BlSidebarContent } from '../components/sidebar/sidebar-content.js';
import { BlSidebarFooter } from '../components/sidebar/sidebar-footer.js';
import { BlSidebarGroup } from '../components/sidebar/sidebar-group.js';
import { BlSidebarGroupLabel } from '../components/sidebar/sidebar-group-label.js';
import { BlSidebarMenu } from '../components/sidebar/sidebar-menu.js';
import { BlSidebarMenuItem } from '../components/sidebar/sidebar-menu-item.js';
import { BlSidebarTrigger } from '../components/sidebar/sidebar-trigger.js';
import { BlSidebarMenuSub } from '../components/sidebar/sidebar-menu-sub.js';
import { BlSidebarMenuAction } from '../components/sidebar/sidebar-menu-action.js';
import { BlSidebarMenuSkeleton } from '../components/sidebar/sidebar-menu-skeleton.js';
import { BlSidebarRail } from '../components/sidebar/sidebar-rail.js';
import { BlCombobox } from '../components/combobox/combobox.js';
import { BlComboboxItem } from '../components/combobox/combobox-item.js';
import { BlComboboxGroup } from '../components/combobox/combobox-group.js';
import { BlComboboxEmpty } from '../components/combobox/combobox-empty.js';
import { BlComboboxChips } from '../components/combobox/combobox-chips.js';
import { BlComboboxTrigger } from '../components/combobox/combobox-trigger.js';
import { BlCommand } from '../components/command/command.js';
import { BlCommandDialog } from '../components/command/command-dialog.js';
import { BlCommandInput } from '../components/command/command-input.js';
import { BlCommandList } from '../components/command/command-list.js';
import { BlCommandGroup } from '../components/command/command-group.js';
import { BlCommandItem } from '../components/command/command-item.js';
import { BlCommandEmpty } from '../components/command/command-empty.js';
import { BlCommandSeparator } from '../components/command/command-separator.js';
import { BlCommandShortcut } from '../components/command/command-shortcut.js';
import { BlCommandLoading } from '../components/command/command-loading.js';
import { BlDataTable } from '../components/data-table/data-table.js';
import { BlTableHeader } from '../components/data-table/table-header.js';
import { BlTableBody } from '../components/data-table/table-body.js';
import { BlTableRow } from '../components/data-table/table-row.js';
import { BlTableHeaderCell } from '../components/data-table/table-header-cell.js';
import { BlTableCell } from '../components/data-table/table-cell.js';
import { BlTablePagination } from '../components/data-table/table-pagination.js';
import { BlTableToolbar } from '../components/data-table/table-toolbar.js';
import { BlTableColumnVisibility } from '../components/data-table/table-column-visibility.js';
import { BlTableFacetedFilter } from '../components/data-table/table-faceted-filter.js';
import { BlDatePicker } from '../components/date-picker/date-picker.js';
import { BlDateField } from '../components/date-picker/date-field.js';
import { BlDateSegment } from '../components/date-picker/date-segment.js';
import { BlCalendar } from '../components/date-picker/calendar.js';
import { BlCalendarCell } from '../components/date-picker/calendar-cell.js';
import { BlRangeCalendar } from '../components/date-picker/range-calendar.js';
import { BlDateRangePicker } from '../components/date-picker/date-range-picker.js';
import { BlCalendarPresets } from '../components/date-picker/calendar-presets.js';
import { BlCalendarCard } from '../components/date-picker/calendar-card.js';

export const FormLayout = createComponent({
  tagName: 'bl-form-layout',
  elementClass: BlFormLayout,
  react: React,
});

export const FormField = createComponent({
  tagName: 'bl-form-field',
  elementClass: BlFormField,
  react: React,
});

export const FormDescription = createComponent({
  tagName: 'bl-form-description',
  elementClass: BlFormDescription,
  react: React,
});

export const FormError = createComponent({
  tagName: 'bl-form-error',
  elementClass: BlFormError,
  react: React,
});

export const FormFieldset = createComponent({
  tagName: 'bl-form-fieldset',
  elementClass: BlFormFieldset,
  react: React,
});

export const PageHeader = createComponent({
  tagName: 'bl-page-header',
  elementClass: BlPageHeader,
  react: React,
});

export const Breadcrumb = createComponent({
  tagName: 'bl-breadcrumb',
  elementClass: BlBreadcrumb,
  react: React,
});

export const BreadcrumbItem = createComponent({
  tagName: 'bl-breadcrumb-item',
  elementClass: BlBreadcrumbItem,
  react: React,
});

export const PageHeaderAvatar = createComponent({
  tagName: 'bl-page-header-avatar',
  elementClass: BlPageHeaderAvatar,
  react: React,
});

export const Sidebar = createComponent({
  tagName: 'bl-sidebar',
  elementClass: BlSidebar,
  react: React,
  events: {
    onBlSidebarToggle: 'bl-sidebar-toggle' as EventName<CustomEvent>,
  },
});

export const SidebarHeader = createComponent({
  tagName: 'bl-sidebar-header',
  elementClass: BlSidebarHeader,
  react: React,
});

export const SidebarContent = createComponent({
  tagName: 'bl-sidebar-content',
  elementClass: BlSidebarContent,
  react: React,
});

export const SidebarFooter = createComponent({
  tagName: 'bl-sidebar-footer',
  elementClass: BlSidebarFooter,
  react: React,
});

export const SidebarGroup = createComponent({
  tagName: 'bl-sidebar-group',
  elementClass: BlSidebarGroup,
  react: React,
});

export const SidebarGroupLabel = createComponent({
  tagName: 'bl-sidebar-group-label',
  elementClass: BlSidebarGroupLabel,
  react: React,
});

export const SidebarMenu = createComponent({
  tagName: 'bl-sidebar-menu',
  elementClass: BlSidebarMenu,
  react: React,
});

export const SidebarMenuItem = createComponent({
  tagName: 'bl-sidebar-menu-item',
  elementClass: BlSidebarMenuItem,
  react: React,
  events: {
    onBlSidebarItemClick: 'bl-sidebar-item-click' as EventName<CustomEvent>,
  },
});

export const SidebarTrigger = createComponent({
  tagName: 'bl-sidebar-trigger',
  elementClass: BlSidebarTrigger,
  react: React,
});

export const SidebarMenuSub = createComponent({
  tagName: 'bl-sidebar-menu-sub',
  elementClass: BlSidebarMenuSub,
  react: React,
  events: {
    onBlSidebarSubToggle: 'bl-sidebar-sub-toggle' as EventName<CustomEvent<{ open: boolean }>>,
  },
});

export const SidebarMenuAction = createComponent({
  tagName: 'bl-sidebar-menu-action',
  elementClass: BlSidebarMenuAction,
  react: React,
  events: {
    onBlSidebarActionClick: 'bl-sidebar-action-click' as EventName<CustomEvent>,
  },
});

export const SidebarMenuSkeleton = createComponent({
  tagName: 'bl-sidebar-menu-skeleton',
  elementClass: BlSidebarMenuSkeleton,
  react: React,
});

export const SidebarRail = createComponent({
  tagName: 'bl-sidebar-rail',
  elementClass: BlSidebarRail,
  react: React,
  events: {
    onBlSidebarToggle: 'bl-sidebar-toggle' as EventName<CustomEvent>,
  },
});

export const Combobox = createComponent({
  tagName: 'bl-combobox',
  elementClass: BlCombobox,
  react: React,
  events: {
    onBlChange: 'bl-change' as EventName<CustomEvent<{ value: string }>>,
    onBlInput: 'bl-input' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const ComboboxItem = createComponent({
  tagName: 'bl-combobox-item',
  elementClass: BlComboboxItem,
  react: React,
});

export const ComboboxGroup = createComponent({
  tagName: 'bl-combobox-group',
  elementClass: BlComboboxGroup,
  react: React,
});

export const ComboboxEmpty = createComponent({
  tagName: 'bl-combobox-empty',
  elementClass: BlComboboxEmpty,
  react: React,
});

export const ComboboxChips = createComponent({
  tagName: 'bl-combobox-chips',
  elementClass: BlComboboxChips,
  react: React,
  events: {
    onBlChipRemove: 'bl-chip-remove' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const ComboboxTrigger = createComponent({
  tagName: 'bl-combobox-trigger',
  elementClass: BlComboboxTrigger,
  react: React,
  events: {
    onBlTriggerClick: 'bl-trigger-click' as EventName<CustomEvent>,
  },
});

export const Command = createComponent({
  tagName: 'bl-command',
  elementClass: BlCommand,
  react: React,
  events: {
    onBlCommandSelect: 'bl-command-select' as EventName<CustomEvent<{ value: string }>>,
    onBlCommandInput: 'bl-command-input' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const CommandDialog = createComponent({
  tagName: 'bl-command-dialog',
  elementClass: BlCommandDialog,
  react: React,
});

export const CommandInput = createComponent({
  tagName: 'bl-command-input',
  elementClass: BlCommandInput,
  react: React,
});

export const CommandList = createComponent({
  tagName: 'bl-command-list',
  elementClass: BlCommandList,
  react: React,
});

export const CommandGroup = createComponent({
  tagName: 'bl-command-group',
  elementClass: BlCommandGroup,
  react: React,
});

export const CommandItem = createComponent({
  tagName: 'bl-command-item',
  elementClass: BlCommandItem,
  react: React,
});

export const CommandEmpty = createComponent({
  tagName: 'bl-command-empty',
  elementClass: BlCommandEmpty,
  react: React,
});

export const CommandSeparator = createComponent({
  tagName: 'bl-command-separator',
  elementClass: BlCommandSeparator,
  react: React,
});

export const CommandShortcut = createComponent({
  tagName: 'bl-command-shortcut',
  elementClass: BlCommandShortcut,
  react: React,
});

export const CommandLoading = createComponent({
  tagName: 'bl-command-loading',
  elementClass: BlCommandLoading,
  react: React,
});

export const DataTable = createComponent({
  tagName: 'bl-data-table',
  elementClass: BlDataTable,
  react: React,
  events: {
    onBlSortChange: 'bl-sort-change' as EventName<CustomEvent>,
    onBlSelectionChange: 'bl-selection-change' as EventName<CustomEvent>,
    onBlRowClick: 'bl-row-click' as EventName<CustomEvent>,
  },
});

export const TableHeader = createComponent({
  tagName: 'bl-table-header',
  elementClass: BlTableHeader,
  react: React,
});

export const TableBody = createComponent({
  tagName: 'bl-table-body',
  elementClass: BlTableBody,
  react: React,
});

export const TableRow = createComponent({
  tagName: 'bl-table-row',
  elementClass: BlTableRow,
  react: React,
});

export const TableHeaderCell = createComponent({
  tagName: 'bl-table-header-cell',
  elementClass: BlTableHeaderCell,
  react: React,
});

export const TableCell = createComponent({
  tagName: 'bl-table-cell',
  elementClass: BlTableCell,
  react: React,
});

export const TablePagination = createComponent({
  tagName: 'bl-table-pagination',
  elementClass: BlTablePagination,
  react: React,
  events: {
    onBlPageChange: 'bl-page-change' as EventName<CustomEvent<{ page: number }>>,
  },
});

export const TableToolbar = createComponent({
  tagName: 'bl-table-toolbar',
  elementClass: BlTableToolbar,
  react: React,
  events: {
    onBlToolbarSearch: 'bl-toolbar-search' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const TableColumnVisibility = createComponent({
  tagName: 'bl-table-column-visibility',
  elementClass: BlTableColumnVisibility,
  react: React,
  events: {
    onBlColumnVisibilityChange: 'bl-column-visibility-change' as EventName<CustomEvent>,
  },
});

export const TableFacetedFilter = createComponent({
  tagName: 'bl-table-faceted-filter',
  elementClass: BlTableFacetedFilter,
  react: React,
  events: {
    onBlFacetedFilterChange: 'bl-faceted-filter-change' as EventName<CustomEvent>,
  },
});

export const DatePicker = createComponent({
  tagName: 'bl-date-picker',
  elementClass: BlDatePicker,
  react: React,
  events: {
    onBlDateChange: 'bl-date-change' as EventName<CustomEvent<{ value: string }>>,
    onBlDateInput: 'bl-date-input' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const DateField = createComponent({
  tagName: 'bl-date-field',
  elementClass: BlDateField,
  react: React,
  events: {
    onBlDateInput: 'bl-date-input' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const DateSegment = createComponent({
  tagName: 'bl-date-segment',
  elementClass: BlDateSegment,
  react: React,
});

export const Calendar = createComponent({
  tagName: 'bl-calendar',
  elementClass: BlCalendar,
  react: React,
  events: {
    onBlDateChange: 'bl-date-change' as EventName<CustomEvent<{ value: string }>>,
    onBlDateRangeChange: 'bl-date-range-change' as EventName<CustomEvent<{ start: string; end: string }>>,
  },
});

export const CalendarCell = createComponent({
  tagName: 'bl-calendar-cell',
  elementClass: BlCalendarCell,
  react: React,
});

export const RangeCalendar = createComponent({
  tagName: 'bl-range-calendar',
  elementClass: BlRangeCalendar,
  react: React,
  events: {
    onBlDateRangeChange: 'bl-date-range-change' as EventName<CustomEvent<{ start: string; end: string }>>,
  },
});

export const DateRangePicker = createComponent({
  tagName: 'bl-date-range-picker',
  elementClass: BlDateRangePicker,
  react: React,
  events: {
    onBlDateRangeChange: 'bl-date-range-change' as EventName<CustomEvent<{ start: string; end: string }>>,
  },
});

export const CalendarPresets = createComponent({
  tagName: 'bl-calendar-presets',
  elementClass: BlCalendarPresets,
  react: React,
  events: {
    onBlPresetSelect: 'bl-preset-select' as EventName<CustomEvent<{ key: string; start: string; end: string }>>,
  },
});

export const CalendarCard = createComponent({
  tagName: 'bl-calendar-card',
  elementClass: BlCalendarCard,
  react: React,
  events: {
    onBlCalendarApply: 'bl-calendar-apply' as EventName<CustomEvent<{ start: string; end: string }>>,
    onBlCalendarCancel: 'bl-calendar-cancel' as EventName<CustomEvent>,
  },
});

// Re-export imperative toast() API
export { toast } from '../components/toast/toast-region.js';

type EventName<T> = string & { __event_type?: T };
