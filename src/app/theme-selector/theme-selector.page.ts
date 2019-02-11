import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.page.html',
  styleUrls: ['./theme-selector.page.scss']
})
export class ThemeSelectorPage {
  constructor(
    private theme: ThemeService,
    public dataService: DataService,
    private storage: Storage
  ) {}
  themes = {
    yankeeblue: {
      primary: '#19647E',
      secondary: '#B4B8AB',
      tertiary: '#F4F9E9',
      light: '#153243', // Background color
      medium: '#EEF0EB', // icon color
      dark: '#EEF0EB' // text color
    },
    night: {
      primary: '#8CBA80',
      secondary: '#FCFF6C',
      tertiary: '#FE5F55',
      medium: '#BCC2C7',
      dark: '#F7F7FF',
      light: '#495867'
    },
    neon: {
      primary: '#39BFBD',
      secondary: '#4CE0B3',
      tertiary: '#FF5E79',
      light: '#F4EDF2',
      medium: '#B682A5',
      dark: '#34162A'
    },
    ashgrey: {
      primary: '#19647E',
      secondary: '#B4B8AB',
      tertiary: '#F4F9E9',
      light: '#B4B8AB', // Background color
      medium: '#32332F', // icon color
      dark: '#32332F' // text color
    },
    bluesapphire: {
      primary: '#39BFBD',
      secondary: '#4CE0B3',
      tertiary: '#FF5E79',
      light: '#19647E', // Background color
      medium: '#F4F9E9',
      dark: '#F4F9E9'
    }
  };

  changeTheme(name) {
    this.theme.setTheme(this.themes[name]);
    this.dataService.setColors({
      backgroundColor: name,
      textColor: name + '-text'
    });
    this.storage.set('backgroundColor', name);
  }
}
