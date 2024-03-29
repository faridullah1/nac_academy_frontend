import { Component } from '@angular/core';
import { TableConfig } from '@shared/generic-page/models';

@Component({
  selector: 'app-user-queries',
  templateUrl: './user-queries.component.html',
  styleUrls: ['./user-queries.component.scss']
})
export class UserQueriesComponent {
	userQueryTableconfig: TableConfig;

	constructor() {
		this.userQueryTableconfig = {
			title: 'User Queries',
			slug: 'queries',

			showAdd: false,
			showSearch: true,

			searchColumn: 'name',

			rowActions: [
				{name: 'delete', title: 'Delete', action: 'OnDelete' }
			],

			columns: [
				{ name: 'name', title: 'Full Name' },
				{ name: 'email', title: 'Email' },
				{ name: 'phone', title: 'Phone' },
				{ name: 'comments', title: 'Comments' },
			]
		}
	}
}
