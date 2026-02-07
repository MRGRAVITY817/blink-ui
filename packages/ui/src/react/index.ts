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

// Re-export imperative toast() API
export { toast } from '../components/toast/toast-region.js';

type EventName<T> = string & { __event_type?: T };
