import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss', '../../form-controls/form-controls.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('emojiDropdown') emojiDropdown: ElementRef;
  @ViewChild('emojiRef') emojiRef: ElementRef;
  @ViewChild('colorDropdown') colorDropdown: ElementRef;
  @ViewChild('colorRef') colorRef: ElementRef;
  @ViewChild('selectedColor') selectedColor: ElementRef;

  @Input() type: string;
  @Output() value = new EventEmitter();

  selectedEmoji: any = {
    colons: ':camera_with_flash:',
    emoticons: [],
    hidden: [],
    id: 'camera_with_flash',
    keywords: [],
    name: 'Camera with Flash',
    native: '📸',
    set: 'twitter',
    sheet: [27, 21],
    shortName: 'camera_with_flash',
    shortNames: ['camera_with_flash'],
    skinVariations: [],
    text: '',
    unified: '1F4F8',
  };
  emojiDropdownToggle: boolean = false;
  colorDropdownToggle: boolean = false;
  colors: string[] = [];
  form: FormGroup;
  itemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private renderer: Renderer2
  ) {}

  @HostListener('document:click', ['$event.target'])
  clickedOutside(target): void {
    if (!this.emojiDropdown.nativeElement.contains(target)) {
      this.emojiDropdownToggle = false;
      this.emojiRef.nativeElement.blur();
    } else {
      this.emojiRef.nativeElement.focus();
    }
    if (this.type == 'item')
      if (!this.colorDropdown.nativeElement.contains(target)) {
        this.colorDropdownToggle = false;
      }
  }

  ngOnInit(): void {
    this.colors = this.sharedService.colors;
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      icon: [this.selectedEmoji, Validators.required],
      description: [null, Validators.required],
      items: [[]],
      id: [[]],
    });
    this.itemForm = this.formBuilder.group({
      name: [null, Validators.required],
      icon: [this.selectedEmoji, Validators.required],
      color: ['rgba(0, 84, 209, 1)', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.type == 'segment') this.value.emit(this.form.value);
    else this.value.emit(this.itemForm.value);
  }
  onCancel(): void {
    this.value.emit();
  }
  addEmoji(event): void {
    this.selectedEmoji = event.emoji;
    if (this.type == 'segment')
      this.form.patchValue({ icon: this.selectedEmoji });
    else this.itemForm.patchValue({ icon: this.selectedEmoji });
    this.emojiDropdownToggle = false;
  }
  onSelectColor(color: string): void {
    this.itemForm.patchValue({ color: color });
    this.renderer.setStyle(
      this.selectedColor.nativeElement,
      'background-color',
      color
    );
    this.colorDropdownToggle = false;
  }
  toggleEmojiDropdown(): void {
    this.emojiDropdownToggle = !this.emojiDropdownToggle;
  }
  toggleColorDropdown(): void {
    this.colorDropdownToggle = !this.colorDropdownToggle;
    console.log(this.colorDropdownToggle);
  }

}
