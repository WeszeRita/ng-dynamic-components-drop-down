import { Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { merge, Observable, Subscription } from 'rxjs';
import { DropdownPanel } from '../interfaces/dropdown-panel';

@Directive({
  selector: '[dropdownTriggerFor]',
})
export class DropdownTriggerForDirective implements OnDestroy {
  private isDropdownOpen = false;
  private overlayRef: OverlayRef;
  private dropdownClosingActionsSub = Subscription.EMPTY;

  @Input('dropdownTriggerFor') public dropdownPanel: DropdownPanel;

  @HostListener('click')
  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ]),
    });

    const templatePortal = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef,
    );
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(
      () => this.destroyDropdown(),
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void | unknown> {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const dropdownClosed = this.dropdownPanel.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
