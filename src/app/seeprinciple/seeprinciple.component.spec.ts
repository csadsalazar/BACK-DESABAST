import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeprincipleComponent } from './seeprinciple.component';

describe('SeeprincipleComponent', () => {
  let component: SeeprincipleComponent;
  let fixture: ComponentFixture<SeeprincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeprincipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeprincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
