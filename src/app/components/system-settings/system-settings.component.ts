import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericApiResponse } from '@common/models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent implements OnInit {
	@ViewChild('principleImageInput') principleImageInput: ElementRef<HTMLInputElement>;
	@ViewChild('introductionImageInput') introductionImageInput: ElementRef<HTMLInputElement>;
	@ViewChild('logoInput') logoInput: ElementRef<HTMLInputElement>;

	menu: string[] = ['Website Configurations'];
	selectedMenu: string;
	theForm: FormGroup;
	disableSaveBtn = false;

	constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private fb: UntypedFormBuilder) {
		this.theForm = this.fb.group({
			_id: [''],
			logo: [''],
			academyName: ['', Validators.required],
			address: ['', Validators.required],
			email: ['', Validators.required],
			mobileNo: ['', Validators.required],
			principleImage: [''],
			principleMessage: ['', Validators.required],
		
			introduction: ['', Validators.required],
			introductionImage: ['']
		});

		this.selectedMenu = this.menu[0];
	}

	ngOnInit(): void {
		this.getSystemSettings();
	}

	getSystemSettings(): void {
		this.apiService.get('system_settings').subscribe({
			next: (resp: GenericApiResponse) => {
				this.theForm.patchValue(resp.data['systemSettings']);
				this.cdr.detectChanges();
			}
		});
	}

	onMenuSelect(menuItem: string): void {
		this.selectedMenu = menuItem;
	}

	onUploadFile(type: 'introduction' | 'principle' | 'logo'): void
	{
		if (type === 'principle') {
			this.principleImageInput.nativeElement.value = '';
			this.principleImageInput.nativeElement.click();
		}
		else if (type === 'introduction') {
			this.introductionImageInput.nativeElement.value = '';
			this.introductionImageInput.nativeElement.click();
		}
		else {
			this.logoInput.nativeElement.value = '';
			this.logoInput.nativeElement.click();
		}
	}

	onFileChange(): void {
		this.theForm.markAsDirty();
	}

	makeFormData(): FormData {
		const formData = new FormData();
		for (let key in this.theForm.value) {
			if (['principleImage', 'introductionImage', 'logo'].includes(key)) continue;

			formData.append(key, this.theForm.get(key)?.value);
		}

		if (this.principleImageInput.nativeElement.files?.item(0)) {
			formData.append('principleImage', this.principleImageInput.nativeElement.files[0]);
		}

		if (this.introductionImageInput.nativeElement.files?.item(0)) {
			formData.append('introductionImage', this.introductionImageInput.nativeElement.files[0]);
		}

		if (this.logoInput.nativeElement.files?.item(0)) {
			formData.append('logo', this.logoInput.nativeElement.files[0]);
		}

		return formData;
	}

	saveSettings(): void {
		this.disableSaveBtn = true;
		const id = this.theForm.controls['_id'].value;
		delete this.theForm.value['_id'];

		const payload = this.makeFormData();

		if (id) {
			this.apiService.update('system_settings', payload).subscribe({
				complete: () => this.onApiResponse(),
				error: () => this.disableSaveBtn = false
			});
		}
		else 
		{
			this.apiService.post('system_settings', payload).subscribe({
				complete: () => this.onApiResponse(),
				error: () => this.disableSaveBtn = false
			});
		}
	}

	onApiResponse(): void {
		this.disableSaveBtn = false;
		this.getSystemSettings();
		this.cdr.detectChanges();

		this.logoInput.nativeElement.value = '';
		this.principleImageInput.nativeElement.value = '';
		this.introductionImageInput.nativeElement.value = '';
	}
}