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

type EventName<T> = string & { __event_type?: T };
