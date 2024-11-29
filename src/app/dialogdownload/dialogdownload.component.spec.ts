import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdownloadComponent } from './dialogdownload.component';

describe('DialogdownloadComponent', () => {
  let component: DialogdownloadComponent;
  let fixture: ComponentFixture<DialogdownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogdownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
