import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { DropdownPanel } from './interfaces/dropdown-panel';

@Component({
  selector: "my-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements DropdownPanel {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();
}
