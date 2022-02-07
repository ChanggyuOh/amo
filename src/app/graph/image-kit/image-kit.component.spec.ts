import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageKitComponent } from './image-kit.component';

describe('ImageKitComponent', () => {
  let component: ImageKitComponent;
  let fixture: ComponentFixture<ImageKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageKitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
