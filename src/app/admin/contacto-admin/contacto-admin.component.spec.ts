import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoAdminComponent } from './contacto-admin.component';

describe('ContactoAdminComponent', () => {
  let component: ContactoAdminComponent;
  let fixture: ComponentFixture<ContactoAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoAdminComponent]
    });
    fixture = TestBed.createComponent(ContactoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
