/* eslint-disable import/no-extraneous-dependencies */

'use client';

import merge from 'lodash/merge';
import {
  vi as viVNAdapter,
  enUS as enUSAdapter,
} from 'date-fns/locale';

// core
import {
  enUS as enUSCore,
  viVN as viVNCore,
} from '@mui/material/locale';
// data-grid
import {
  enUS as enUSDataGrid,
  viVN as viVNDataGrid,
} from '@mui/x-data-grid';
// date-pickers
import {
  enUS as enUSDate,
  viVN as viVNDate,
} from '@mui/x-date-pickers/locales';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: merge(viVNDate, viVNDataGrid, viVNCore),
    adapterLocale: viVNAdapter,
    icon: 'flagpack:vn',
  },
  
];

export const defaultLang = allLangs[1]; // Vietnamese

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
