import { Injectable } from '@angular/core';
import {Product} from './models/product';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly coreBackendBaseURL = environment.coreBackendBaseURL;
  usersList: any[];
  loggedInUser: User;
  products: Product[] = [
    {
      name: 'Electronics',
      icon: {
        name: 'Electric Plug',
        unified: '1F50C',
        keywords: ['charger', 'power'],
        sheet: [27, 40],
        shortName: 'electric_plug',
        shortNames: ['electric_plug'],
        id: 'electric_plug',
        native: '🔌',
        skinVariations: [],
        emoticons: [],
        hidden: [],
        text: '',
        set: 'twitter',
        colons: ':electric_plug:',
      },
      description: 'Electronic items',
      items: [
        {
          name: 'Lenovo Laptop',
          icon: {
            name: 'Personal Computer',
            unified: '1F4BB',
            keywords: ['technology', 'laptop', 'screen', 'display', 'monitor'],
            sheet: [26, 18],
            shortName: 'computer',
            shortNames: ['computer'],
            id: 'computer',
            native: '💻',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':computer:',
          },
          color: 'rgba(24, 191, 255, 1)',
        },
        {
          name: 'HP DeskJet Printer',
          icon: {
            name: 'Printer',
            unified: '1F5A8-FE0F',
            keywords: ['paper', 'ink'],
            sheet: [30, 8],
            shortName: 'printer',
            shortNames: ['printer'],
            id: 'printer',
            native: '🖨️',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':printer:',
          },
          color: 'rgba(51, 138, 23, 1)',
        },
        {
          name: 'Kingston HDD',
          icon: {
            name: 'Minidisc',
            unified: '1F4BD',
            keywords: ['technology', 'record', 'data', 'disk', '90s'],
            sheet: [26, 20],
            shortName: 'minidisc',
            shortNames: ['minidisc'],
            id: 'minidisc',
            native: '💽',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':minidisc:',
          },
          color: 'rgba(64, 131, 172, 1)',
        },
        {
          name: 'Canon 80D DSLR',
          icon: {
            name: 'Camera with Flash',
            unified: '1F4F8',
            sheet: [27, 21],
            shortName: 'camera_with_flash',
            shortNames: ['camera_with_flash'],
            id: 'camera_with_flash',
            native: '📸',
            skinVariations: [],
            keywords: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':camera_with_flash:',
          },
          color: 'rgba(255, 214, 140, 1)',
        },
        {
          name: 'LTD G1 Mixer',
          icon: {
            name: 'Control Knobs',
            unified: '1F39B-FE0F',
            keywords: ['dial'],
            sheet: [7, 53],
            shortName: 'control_knobs',
            shortNames: ['control_knobs'],
            id: 'control_knobs',
            native: '🎛️',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':control_knobs:',
          },
          color: 'rgba(218, 2, 64, 1)',
        },
        {
          name: 'JBL Headphones',
          icon: {
            name: 'Headphone',
            unified: '1F3A7',
            keywords: ['music', 'score', 'gadgets'],
            sheet: [8, 5],
            shortName: 'headphones',
            shortNames: ['headphones'],
            id: 'headphones',
            native: '🎧',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':headphones:',
          },
          color: 'rgba(97, 199, 108, 1)',
        },
        {
          name: 'Speaker',
          icon: {
            name: 'Speaker with One Sound Wave',
            unified: '1F509',
            keywords: ['volume', 'speaker', 'broadcast'],
            sheet: [27, 37],
            shortName: 'sound',
            shortNames: ['sound'],
            id: 'sound',
            native: '🔉',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':sound:',
          },
          color: 'rgba(64, 131, 172, 1)',
        },
      ],
      id: '0',
    },
    {
      name: 'Real Estate',
      icon: {
        name: 'Classical Building',
        unified: '1F3DB-FE0F',
        keywords: ['art', 'culture', 'history'],
        sheet: [10, 36],
        shortName: 'classical_building',
        shortNames: ['classical_building'],
        id: 'classical_building',
        native: '🏛️',
        skinVariations: [],
        emoticons: [],
        hidden: [],
        text: '',
        set: 'twitter',
        colons: ':classical_building:',
      },
      description: 'Real estate items',
      items: [
        {
          name: 'Avanti Heights',
          icon: {
            name: 'Bank',
            unified: '1F3E6',
            keywords: [
              'building',
              'money',
              'sales',
              'cash',
              'business',
              'enterprise',
            ],
            sheet: [10, 47],
            shortName: 'bank',
            shortNames: ['bank'],
            id: 'bank',
            native: '🏦',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':bank:',
          },
          color: 'rgba(232, 149, 0, 1)',
        },
        {
          name: 'The Mirage',
          icon: {
            name: 'Office Building',
            unified: '1F3E2',
            keywords: ['building', 'bureau', 'work'],
            sheet: [10, 43],
            shortName: 'office',
            shortNames: ['office'],
            id: 'office',
            native: '🏢',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':office:',
          },
          color: 'rgba(142, 150, 255, 1)',
        },
        {
          name: 'Yashwin Complex',
          icon: {
            name: 'Hotel',
            unified: '1F3E8',
            keywords: ['building', 'accomodation', 'checkin'],
            sheet: [10, 49],
            shortName: 'hotel',
            shortNames: ['hotel'],
            id: 'hotel',
            native: '🏨',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':hotel:',
          },
          color: 'rgba(214, 0, 184, 1)',
        },
      ],
      id: '1',
    },
    {
      name: 'Food',
      icon: {
        name: 'Hamburger',
        unified: '1F354',
        keywords: [
          'meat',
          'fast food',
          'beef',
          'cheeseburger',
          'mcdonalds',
          'burger king',
        ],
        sheet: [6, 38],
        shortName: 'hamburger',
        shortNames: ['hamburger'],
        id: 'hamburger',
        native: '🍔',
        skinVariations: [],
        emoticons: [],
        hidden: [],
        text: '',
        set: 'twitter',
        colons: ':hamburger:',
      },
      description: 'Food Items',
      items: [
        {
          name: 'Pizza',
          icon: {
            name: 'Slice of Pizza',
            unified: '1F355',
            keywords: ['food', 'party'],
            sheet: [6, 39],
            shortName: 'pizza',
            shortNames: ['pizza'],
            id: 'pizza',
            native: '🍕',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':pizza:',
          },
          color: 'rgba(255, 120, 68, 1)',
        },
        {
          name: 'Burger',
          icon: {
            name: 'Hamburger',
            unified: '1F354',
            keywords: [
              'meat',
              'fast food',
              'beef',
              'cheeseburger',
              'mcdonalds',
              'burger king',
            ],
            sheet: [6, 38],
            shortName: 'hamburger',
            shortNames: ['hamburger'],
            id: 'hamburger',
            native: '🍔',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':hamburger:',
          },
          color: 'rgba(232, 149, 0, 1)',
        },
        {
          name: 'Apples',
          icon: {
            name: 'Green Apple',
            unified: '1F34F',
            keywords: ['fruit', 'nature'],
            sheet: [6, 33],
            shortName: 'green_apple',
            shortNames: ['green_apple'],
            id: 'green_apple',
            native: '🍏',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':green_apple:',
          },
          color: 'rgba(97, 199, 108, 1)',
        },
        {
          name: 'Cake',
          icon: {
            name: 'Birthday Cake',
            unified: '1F382',
            keywords: ['food', 'dessert', 'cake'],
            sheet: [7, 26],
            shortName: 'birthday',
            shortNames: ['birthday'],
            id: 'birthday',
            native: '🎂',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':birthday:',
          },
          color: 'rgba(255, 140, 173, 1)',
        },
        {
          name: 'Sushi',
          icon: {
            name: 'Sushi',
            unified: '1F363',
            keywords: ['food', 'fish', 'japanese', 'rice'],
            sheet: [6, 53],
            shortName: 'sushi',
            shortNames: ['sushi'],
            id: 'sushi',
            native: '🍣',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':sushi:',
          },
          color: 'rgba(255, 0, 73, 1)',
        },
        {
          name: 'Shephard Pie',
          icon: {
            name: 'Flatbread',
            unified: '1FAD3',
            sheet: [53, 12],
            shortName: 'flatbread',
            shortNames: ['flatbread'],
            id: 'flatbread',
            native: '🫓',
            skinVariations: [],
            keywords: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':flatbread:',
          },
          color: 'rgba(253, 178, 43, 1)',
        },
        {
          name: 'Ramen',
          icon: {
            name: 'Green Salad',
            unified: '1F957',
            keywords: ['food', 'healthy', 'lettuce'],
            sheet: [41, 46],
            shortName: 'green_salad',
            shortNames: ['green_salad'],
            id: 'green_salad',
            native: '🥗',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':green_salad:',
          },
          color: 'rgba(97, 199, 108, 1)',
        },
        {
          name: 'Bread',
          icon: {
            name: 'Bread',
            unified: '1F35E',
            keywords: ['food', 'wheat', 'breakfast', 'toast'],
            sheet: [6, 48],
            shortName: 'bread',
            shortNames: ['bread'],
            id: 'bread',
            native: '🍞',
            skinVariations: [],
            emoticons: [],
            hidden: [],
            text: '',
            set: 'twitter',
            colons: ':bread:',
          },
          color: 'rgba(255, 158, 121, 1)',
        },
      ],
      id: '2',
    },
    {
      name: 'Sports',
      icon: {
        name: 'Stadium',
        unified: '1F3DF-FE0F',
        keywords: ['photo', 'place', 'sports', 'concert', 'venue'],
        sheet: [10, 40],
        shortName: 'stadium',
        shortNames: ['stadium'],
        id: 'stadium',
        native: '🏟️',
        skinVariations: [],
        emoticons: [],
        hidden: [],
        text: '',
        set: 'twitter',
        colons: ':stadium:',
      },
      description: 'Sports items',
      items: [],
      id: '3',
    },
    {
      name: 'National Sector',
      icon: {
        name: 'India Flag',
        unified: '1F1EE-1F1F3',
        sheet: [2, 25],
        shortName: 'flag-in',
        shortNames: ['flag-in'],
        id: 'flag-in',
        native: '🇮🇳',
        skinVariations: [],
        keywords: [],
        emoticons: [],
        hidden: [],
        text: '',
        set: 'twitter',
        colons: ':flag-in:',
      },
      description: 'National sector items',
      items: [],
      id: '4',
    },
  ];
  headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8 '});

  /*ERROR HANDLER STARTS HERE*/
  handleError(error: HttpErrorResponse) {
    const errorMessage = {errorCode: 0, errorMessage: ''};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage.errorMessage = error.error.message;
    } else {
      // Server-side errors
      errorMessage.errorCode = error.status;
      errorMessage.errorMessage = error.message;
    }
    return throwError(errorMessage);
  }

  /*ERROR HANDLER ENDS HERE*/
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): void {
    if (localStorage.getItem('usersList')) {
      this.usersList = JSON.parse(localStorage.getItem('usersList'));
    } else {
      this.usersList = [];
      localStorage.setItem('usersList', JSON.stringify([]));
      console.log('no users');
    }
  }

  emailValidator(userEmail): boolean {
    const emailMatcher = userEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    return emailMatcher ? true : false;
  }

  checkUser(userEmail: any): boolean {
    if (userEmail !== '' && (this.usersList.length === 0 ||
      !this.usersList.some(a => a.userEmail === userEmail))) {
      return true;
    } else {
      return false;
    }
  }

  checkCredential(userEmail: any, password: any): boolean {
    if (userEmail !== '' && password !== '' && (this.usersList.length === 0 ||
      !this.usersList.some(a => a.userEmail === userEmail && a.password === password))) {
      return true;
    } else {
      return false;
    }
  }

  setLoggedInUser(): void {
    this.loggedInUser = this.usersList.find(a => a.loggedIn === true);
  }

  getProducts(userId: any): Observable<any> {
    return this.httpClient.post<any>(this.coreBackendBaseURL + '/groupBy/'
      + userId , {}, {headers: this.headers}).pipe(catchError(this.handleError));
  }
}
