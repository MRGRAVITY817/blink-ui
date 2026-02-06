import React from 'react';
import { createComponent } from '@lit/react';

import { BlButton } from '../components/button/button.js';
import { BlCard } from '../components/card/card.js';
import { BlInput } from '../components/input/input.js';
import { BlBadge } from '../components/badge/badge.js';
import { BlAlert } from '../components/alert/alert.js';

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

type EventName<T> = string & { __event_type?: T };
