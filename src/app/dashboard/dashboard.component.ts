import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {DataService} from '../data.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',  '../shared/components/form-controls/form-controls.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChildren('itemsContainerRef') itemsContainerRef: QueryList<ElementRef>;
  products: Product[] = [];
  selectedproduct: string;
  popupToggle = false;
  popupType: string;
  onHover = false;
  searchString = '';
  constructor(
    private renderer: Renderer2,
    private ref: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getAllUsers();
    this.dataService.setLoggedInUser();
    if (sessionStorage.getItem('productData')) {
      this.products = JSON.parse(sessionStorage.getItem('productData'));
    } else {
      this.products = this.dataService.products.slice(0);
    }
  }

  closeModal(): void {
    console.log('looging');
  }

  toggleproductPopup(value?, type?, id?): void {
    console.log('toggling');
    this.popupToggle = !this.popupToggle;
    if (type) {
      this.popupType = type;
    }
    if (id) {
      this.selectedproduct = id;
    }
    if (value) {
      if (this.popupType === 'product') {
        value.id = this.products.length === 0 ? '0' : '' + this.products.length;
        this.products.push(value);
        sessionStorage.setItem('productData', JSON.stringify(this.products));
      } else {
        this.products
          .filter((product) => {
            return product.id === this.selectedproduct;
          })[0]
          .items.push(value);
        sessionStorage.setItem('productData', JSON.stringify(this.products));
        console.log(JSON.stringify(this.products));
      }
    }
  }
  setItemDisplay(product, index): void {
    this.renderer.setStyle(
      this.itemsContainerRef.get(index).nativeElement,
      'display',
      'grid'
    );
    this.ref.detectChanges();
    // tslint:disable-next-line:one-variable-per-declaration
    let cardCount,
      totalSpace,
      space,
      val,
      // tslint:disable-next-line:prefer-const
      cardWidth = 80,
      usedCardCount;
    cardCount = Math.floor(
      this.itemsContainerRef.get(index).nativeElement.offsetWidth / cardWidth
    );
    totalSpace =
      this.itemsContainerRef.get(index).nativeElement.offsetWidth -
      cardCount * cardWidth;
    space = 50;
    val = '';
    for (let j = 1; j <= cardCount + 1; j++) {
      val += 'auto ';
    }
    val = val.substring(0, val.length - 1);

    this.renderer.setStyle(
      this.itemsContainerRef.get(index).nativeElement,
      'grid-template-columns',
      val
    );
    this.renderer.setStyle(
      this.itemsContainerRef.get(index).nativeElement,
      'grid-column-gap',
      '' + space + 'px'
    );
    this.renderer.setStyle(
      this.itemsContainerRef.get(index).nativeElement,
      'grid-row-gap',
      '' + 20 + 'px'
    );

    usedCardCount = cardCount;
    if (product.items.length + 1 < usedCardCount) {
      this.renderer.setStyle(
        this.itemsContainerRef.get(index).nativeElement,
        'display',
        'flex'
      );
    } else {
      this.renderer.setStyle(
        this.itemsContainerRef.get(index).nativeElement,
        'display',
        'grid'
      );
    }
  }
  scrollToView(product): void {
    const targetEle = document.getElementById(product);
    const pos = targetEle.style.position;
    const top = targetEle.style.top;
    targetEle.style.position = 'relative';
    targetEle.style.top = '-20px';
    targetEle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetEle.style.top = top;
    targetEle.style.position = pos;
  }

  logOut(): void {
    this.dataService.usersList.find(a => a.userEmail === this.dataService.loggedInUser.userEmail).loggedIn = false;
    localStorage.setItem('usersList', JSON.stringify(this.dataService.usersList));
    localStorage.setItem('loggedInUser', null);
    window.location.href = 'http://localhost:4200/login';
  }
}
