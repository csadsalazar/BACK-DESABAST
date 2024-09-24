import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeComponent } from './see.component';

describe('SeeComponent', () => {
  let component: SeeComponent;
  let fixture: ComponentFixture<SeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
