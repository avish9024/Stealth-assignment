import { Directive, ElementRef, Optional, Inject, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output('clickOutside') clickOutside = new EventEmitter<MouseEvent>();
  private subscription: Subscription;
  constructor(private element: ElementRef, @Optional() @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    setTimeout(() => {
      this.subscription = fromEvent<MouseEvent>(this.document, 'click')
        .pipe(
          filter(event => {
            const clickTarget = event.target as HTMLElement;
            return !this.isOrContainsClickTarget(this.element.nativeElement, clickTarget);
          }),
        )
        .subscribe((event) => {
          this.clickOutside.emit();
        });
    }, 0);
  }

  private isOrContainsClickTarget(element: HTMLElement, clickTarget: HTMLElement) {
    return element == clickTarget || element.contains(clickTarget);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
