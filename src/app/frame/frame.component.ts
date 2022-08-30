import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrameComponent  {

  constructor() { }


}
