import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from './material-imports';


export const SHARED_IMPORTS = [
  NgIf,
  NgFor,
  ReactiveFormsModule,
  ...MATERIAL_IMPORTS
];
